import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlsFile = path.join(__dirname, 'urls.txt');
const baseOutputDir = path.join(__dirname, 'replicas');
const rawUrls = fs.readFileSync(urlsFile, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);

function getCategory(url) {
    const slug = url.toLowerCase();
    if (slug.includes('xv') || slug.includes('quince') || slug.includes('luciana') || slug.includes('paulina')) return 'XV_Anos';
    if (slug.includes('aniversario') || slug.includes('boda')) return 'Bodas_Aniversarios';
    if (slug.includes('bautizo')) return 'Bautizo';
    if (slug.includes('baby-shower') || slug.includes('revelacion') || slug.includes('revelaci-n')) return 'BabyShower_Revelacion';
    if (slug.includes('cumplea-os') || slug.includes('cumpl') || slug.includes('cars') || slug.includes('spiderman') || slug.includes('cristina')) return 'Cumpleanos';
    if (slug.includes('graduacion') || slug.includes('graduaci-n')) return 'Graduacion';
    if (slug.includes('comunion') || slug.includes('comuni-n')) return 'Comunion';
    if (slug.includes('jubilacion')) return 'Jubilacion';
    if (slug.includes('luctuoso')) return 'Luctuoso';
    return 'Otros';
}

const sanitizePath = (str) => str.replace(/[^a-zA-Z0-9.\-_]/g, '_');

async function processUrl(browser, targetUrl, category, slug) {
    const outPath = path.join(baseOutputDir, category, slug);
    if (fs.existsSync(outPath)) {
        console.log(`-> La carpeta ya existe, saltando... (${outPath})`);
        return;
    }
    
    await fs.ensureDir(outPath);
    const dirs = {
        images: path.join(outPath, 'images'),
        css: path.join(outPath, 'css'),
        fonts: path.join(outPath, 'fonts'),
        svg: path.join(outPath, 'svg'),
        media: path.join(outPath, 'media')
    };
    for (const dir of Object.values(dirs)) await fs.ensureDir(dir);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const resourceMap = new Map(); // originalUrl -> localRelativePath

    page.on('response', async (response) => {
        const req = response.request();
        const reqUrl = req.url();
        const status = response.status();
        if (reqUrl.startsWith('data:') || status >= 400) return;

        try {
            const parsedReqUrl = new URL(reqUrl);
            let fileName = path.basename(parsedReqUrl.pathname);
            if (!fileName) return;
            fileName = fileName.split('?')[0];

            let resourceType = req.resourceType();
            let saveDir = null;
            let relativePrefix = '';

            if (resourceType === 'image') {
                if (fileName.endsWith('.svg')) { saveDir = dirs.svg; relativePrefix = 'svg/'; }
                else { saveDir = dirs.images; relativePrefix = 'images/'; }
            } else if (resourceType === 'stylesheet') {
                saveDir = dirs.css; relativePrefix = 'css/';
                if (!fileName.endsWith('.css')) fileName += '.css';
            } else if (resourceType === 'font') {
                saveDir = dirs.fonts; relativePrefix = 'fonts/';
            } else if (resourceType === 'media') {
                saveDir = dirs.media; relativePrefix = 'media/';
            } else if (resourceType === 'fetch' || resourceType === 'xhr') {
                if (fileName.endsWith('.svg')) { saveDir = dirs.svg; relativePrefix = 'svg/'; }
            }

            if (saveDir) {
                const buffer = await response.buffer();
                const sanitizedName = sanitizePath(fileName);
                const filePath = path.join(saveDir, sanitizedName);
                
                if (!await fs.pathExists(filePath)) {
                    await fs.writeFile(filePath, buffer);
                }
                
                // Guardar mapeo para luego reemplazar en el HTML
                resourceMap.set(reqUrl, relativePrefix + sanitizedName);
            }
        } catch (err) {}
    });

    try {
        await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });
        
        // Scroll to trigger lazy loads
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Wait a bit more for final rendering
        await new Promise(r => setTimeout(r, 2000));

        let html = await page.content();
        
        // Strip scripts to freeze the DOM
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // Replace absolute URLs with local downloaded paths
        for (const [originalUrl, localPath] of resourceMap.entries()) {
            // Reemplazar ocurrencias exactas
            html = html.split(originalUrl).join(localPath);
            // Reemplazar versiones encodeadas o truncadas
            const parsed = new URL(originalUrl);
            html = html.split(parsed.pathname).join(localPath);
        }

        const warningBanner = `
        <div style="background-color: #ffeb3b; color: #000; padding: 15px; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; right: 0; z-index: 999999; font-weight: bold; border-bottom: 2px solid #fbc02d; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            ⚠️ (AVISO DE RÉPLICA) Esta es una copia visual exacta. Los componentes interactivos (ej. RSVP) deben ser REPROGRAMADOS.
            <button onclick="this.parentElement.style.display='none'" style="margin-left: 15px; padding: 5px 10px; cursor: pointer; border: none; background: #333; color: white; border-radius: 4px;">Entendido</button>
        </div>
        `;
        html = html.replace(/<body[^>]*>/i, (match) => match + warningBanner);

        await fs.writeFile(path.join(outPath, 'index.html'), html);
        console.log(`✅ Réplica guardada con éxito en: ${outPath}`);

    } catch (e) {
        console.error(`❌ Error procesando ${targetUrl}:`, e.message);
    } finally {
        await page.close();
    }
}

async function startScraping() {
    // Procesar TODAS las URLs restantes (desde el índice 12 en adelante)
    const testBatch = rawUrls.slice(12); 
    console.log(`Iniciando extracción masiva con ${testBatch.length} URLs (del índice 12 hasta el final)...`);
    
    const browser = await puppeteer.launch({ headless: 'new' });

    for (const targetUrl of testBatch) {
        const category = getCategory(targetUrl);
        const slug = new URL(targetUrl).pathname.split('/').pop() || 'index';
        console.log(`\nProcesando [${category}]: ${targetUrl}`);
        
        // Delete old broken replicas if they exist for these tests
        const outPath = path.join(baseOutputDir, category, slug);
        if (fs.existsSync(outPath)) {
            fs.rmSync(outPath, { recursive: true, force: true });
        }
        
        await processUrl(browser, targetUrl, category, slug);
    }
    
    await browser.close();
    console.log('\nLote completado. Revisa las carpetas en "replicas".');
}

startScraping();
