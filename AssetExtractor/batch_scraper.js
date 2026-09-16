const fs = require('fs');
const path = require('path');
const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');

// Configuración inicial
const urlsFile = path.join(__dirname, 'urls.txt');
const baseOutputDir = path.join(__dirname, 'replicas');

// Leer y limpiar URLs
const rawUrls = fs.readFileSync(urlsFile, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);

// Función para categorizar
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

// Plugin personalizado para inyectar advertencia en el HTML
class InjectWarningPlugin {
    apply(registerAction) {
        registerAction('afterResponse', async ({ response }) => {
            if (response.request.resourceType === 'html' || response.body.toString().includes('<html')) {
                let html = response.body.toString();
                const warningBanner = `
                <div style="background-color: #ffeb3b; color: #000; padding: 15px; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; right: 0; z-index: 999999; font-weight: bold; border-bottom: 2px solid #fbc02d; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                    ⚠️ (AVISO DE RÉPLICA) Esta es una copia visual exacta. Los componentes con lógica compleja (como reproductores de música nativos o formularios de RSVP que conectan a base de datos externa) han sido capturados pero deben ser REPROGRAMADOS manualmente en SmartStudio para que funcionen de forma interactiva.
                    <button onclick="this.parentElement.style.display='none'" style="margin-left: 15px; padding: 5px 10px; cursor: pointer; border: none; background: #333; color: white; border-radius: 4px;">Entendido</button>
                </div>
                `;
                html = html.replace('<body>', '<body>' + warningBanner);
                return html;
            }
            return response.body;
        });
    }
}

async function startScraping() {
    // Tomar solo las 2 primeras URLs para la prueba (batch pequeño)
    const testBatch = rawUrls.slice(0, 2); 
    console.log(`Iniciando prueba con un lote de ${testBatch.length} URLs...`);

    for (const targetUrl of testBatch) {
        const category = getCategory(targetUrl);
        const slug = new URL(targetUrl).pathname.split('/').pop() || 'index';
        const outPath = path.join(baseOutputDir, category, slug);

        console.log(`\nProcesando [${category}]: ${targetUrl}`);

        if (fs.existsSync(outPath)) {
            console.log(`-> La carpeta ya existe, saltando... (${outPath})`);
            continue;
        }

        try {
            await scrape({
                urls: [targetUrl],
                directory: outPath,
                plugins: [
                    new PuppeteerPlugin({
                        launchOptions: { headless: 'new' },
                        scrollToBottom: { timeout: 10000, viewportN: 10 }, 
                        blockNavigation: true
                    }),
                    new InjectWarningPlugin()
                ]
            });
            console.log(`✅ Réplica guardada con éxito en: ${outPath}`);
        } catch (error) {
            console.error(`❌ Error procesando ${targetUrl}:`, error.message);
        }
    }
    
    console.log('\nLote completado. Revisa las carpetas en "replicas".');
}

startScraping();
