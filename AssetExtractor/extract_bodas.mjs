import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseOutputDir = path.join(__dirname, 'replicas');

const rawUrls = [
    'https://lirioinvitaciones.com/boda1',
    'https://lirioinvitaciones.com/boda-nuevo-2',
    'https://lirioinvitaciones.com/boda3',
    'https://lirioinvitaciones.com/boda-1',
    'https://lirioinvitaciones.com/boda5-nuevo/page-2#page-0',
    'https://lirioinvitaciones.com/redise-o-boda-6',
    'https://lirioinvitaciones.com/redise-o-boda-8/page-2',
    'https://lirioinvitaciones.com/diseno9-boda',
    'https://lirioinvitaciones.com/dise-o-10-nuevo-boda',
    'https://lirioinvitaciones.com/karla-y-matias',
    'https://lirioinvitaciones.com/dise-o-10-boda',
    'https://lirioinvitaciones.com/diseno-moderno',
    'https://lirioinvitaciones.com/dise-o-14-boda',
    'https://lirioinvitaciones.com/dise-o-15-boda',
    'https://lirioinvitaciones.com/dise-o-16-boda-caf'
];

function getCategory() {
    return 'Bodas_Aniversarios';
}

const sanitizePath = (str) => str.replace(/[^a-zA-Z0-9.\-_]/g, '_');

async function processUrl(browser, targetUrl, category, slug) {
    const outPath = path.join(baseOutputDir, category, slug);
    if (fs.existsSync(outPath)) {
        console.log(`-> La carpeta ya existe, recreando... (${outPath})`);
        fs.rmSync(outPath, { recursive: true, force: true });
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

    const resourceMap = new Map();

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
                resourceMap.set(reqUrl, relativePrefix + sanitizedName);
            }
        } catch (err) {}
    });

    try {
        await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });
        
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

        await new Promise(r => setTimeout(r, 2000));

        let html = await page.content();
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        for (const [originalUrl, localPath] of resourceMap.entries()) {
            html = html.split(originalUrl).join(localPath);
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
    console.log(`Iniciando extracción de ${rawUrls.length} bodas...`);
    const browser = await puppeteer.launch({ headless: 'new' });

    for (const targetUrl of rawUrls) {
        const category = getCategory();
        // Limpiamos la URL para evitar problemas con #page-0 o /page-2
        let cleanUrl = targetUrl.split('#')[0];
        if (cleanUrl.endsWith('/page-2')) {
            cleanUrl = cleanUrl.replace('/page-2', '');
        }
        const slug = new URL(cleanUrl).pathname.split('/').filter(Boolean).pop() || 'index';
        console.log(`\nProcesando [${category}]: ${targetUrl} (Slug: ${slug})`);
        
        await processUrl(browser, targetUrl, category, slug);
    }
    
    await browser.close();
    console.log('\nLote de bodas completado.');
}

startScraping();
