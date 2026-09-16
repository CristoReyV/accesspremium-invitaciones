const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const url = require('url');

const targetUrl = process.argv[2];

if (!targetUrl) {
    console.error('Por favor, proporciona una URL. Ejemplo: node extract.js https://ejemplo.com');
    process.exit(1);
}

// Función para limpiar nombres de archivos/carpetas
const sanitizePath = (str) => str.replace(/[^a-zA-Z0-9.\-_]/g, '_');

(async () => {
    console.log(`Iniciando extracción para: ${targetUrl}`);
    
    const parsedUrl = new URL(targetUrl);
    const domain = sanitizePath(parsedUrl.hostname);
    const outputDir = path.join(__dirname, 'output', domain);
    
    await fs.ensureDir(outputDir);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a common viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Directorios para organizar los assets
    const dirs = {
        images: path.join(outputDir, 'images'),
        css: path.join(outputDir, 'css'),
        js: path.join(outputDir, 'js'),
        fonts: path.join(outputDir, 'fonts'),
        svg: path.join(outputDir, 'svg'),
        media: path.join(outputDir, 'media'),
        json: path.join(outputDir, 'json')
    };

    for (const dir of Object.values(dirs)) {
        await fs.ensureDir(dir);
    }

    // Interceptar las respuestas de red para descargar los archivos que cargan dinámicamente
    page.on('response', async (response) => {
        const req = response.request();
        const reqUrl = req.url();
        const status = response.status();

        // Ignoramos base64 y errores
        if (reqUrl.startsWith('data:') || status >= 400) return;

        try {
            const parsedReqUrl = new URL(reqUrl);
            let fileName = path.basename(parsedReqUrl.pathname);
            if (!fileName) return;
            
            // Eliminar posibles queries en el nombre (ej. font.woff2?v=1.0)
            fileName = fileName.split('?')[0];

            let resourceType = req.resourceType();
            let saveDir = null;

            if (resourceType === 'image') {
                if (fileName.endsWith('.svg')) saveDir = dirs.svg;
                else saveDir = dirs.images;
            } else if (resourceType === 'stylesheet') {
                saveDir = dirs.css;
                if (!fileName.endsWith('.css')) fileName += '.css';
            } else if (resourceType === 'script') {
                saveDir = dirs.js;
                if (!fileName.endsWith('.js')) fileName += '.js';
            } else if (resourceType === 'font') {
                saveDir = dirs.fonts;
            } else if (resourceType === 'media') {
                saveDir = dirs.media;
            } else if (resourceType === 'fetch' || resourceType === 'xhr') {
                if (fileName.endsWith('.json')) saveDir = dirs.json;
                else if (fileName.endsWith('.svg')) saveDir = dirs.svg;
            }

            if (saveDir) {
                const buffer = await response.buffer();
                const filePath = path.join(saveDir, sanitizePath(fileName));
                
                // Evitamos sobrescribir si el archivo ya existe (en caso de nombres iguales pero de distintas carpetas)
                if (!await fs.pathExists(filePath)) {
                    await fs.writeFile(filePath, buffer);
                }
            }
        } catch (err) {
            // Algunos requests no se pueden bufferizar, los ignoramos silenciosamente
        }
    });

    console.log('Navegando a la página y esperando a que cargue...');
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Función para hacer scroll hasta abajo y detonar lazy loading
    console.log('Haciendo scroll para cargar elementos "lazy loaded"...');
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

    // Esperar un poco a que terminen de cargar animaciones y SVGs
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Extrayendo SVGs inline y estilos...');
    
    // Extraer SVGs inline
    const svgs = await page.evaluate(() => {
        const svgElements = document.querySelectorAll('svg');
        return Array.from(svgElements).map((svg) => {
            // Asegurar que tenga namespace
            if (!svg.getAttribute('xmlns')) {
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            }
            return {
                id: svg.id || null,
                classes: svg.className.baseVal || svg.className || '',
                html: svg.outerHTML
            };
        });
    });

    let inlineSvgIndex = 1;
    for (const svgInfo of svgs) {
        let name = `inline_svg_${inlineSvgIndex}`;
        if (svgInfo.id) name += `_id-${svgInfo.id}`;
        else if (svgInfo.classes) name += `_class-${svgInfo.classes.split(' ')[0]}`;
        
        name = sanitizePath(name) + '.svg';
        await fs.writeFile(path.join(dirs.svg, name), svgInfo.html);
        inlineSvgIndex++;
    }

    // Extraer estilos inline (etiquetas <style>)
    const styles = await page.evaluate(() => {
        const styleElements = document.querySelectorAll('style');
        return Array.from(styleElements).map(s => s.innerHTML).join('\n\n/* --- Nuevo bloque de <style> --- */\n\n');
    });

    if (styles.trim().length > 0) {
        await fs.writeFile(path.join(dirs.css, 'inline_styles.css'), styles);
    }

    // Guardar el HTML para que puedas ver las clases que aplican las animaciones a los elementos
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await fs.writeFile(path.join(outputDir, 'index.html'), html);

    await browser.close();
    
    console.log(`¡Extracción completada!`);
    console.log(`Los assets, incluyendo SVGs y sus animaciones CSS/estilos, se han guardado en:`);
    console.log(outputDir);
})();
