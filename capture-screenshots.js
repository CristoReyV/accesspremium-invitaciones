import { chromium, devices } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const URLS_FILE = 'urls.txt';
const OUTPUT_DIR = 'capturas';
const MANIFEST_FILE = path.join(OUTPUT_DIR, 'manifest.json');

// Función para hacer scroll automático hasta el final
async function autoScroll(page) {
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
}

async function main() {
  console.log('Iniciando script de captura...');

  // 1. Leer archivo urls.txt
  let urls = [];
  try {
    const urlsContent = await fs.readFile(URLS_FILE, 'utf-8');
    urls = urlsContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'));
  } catch (error) {
    console.error(`Error leyendo ${URLS_FILE}. Asegúrate de que el archivo existe.`);
    return;
  }

  if (urls.length === 0) {
    console.log('No se encontraron URLs en urls.txt');
    return;
  }

  // 2. Crear carpeta de salida si no existe
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creando el directorio de capturas:', err);
    return;
  }

  const manifest = [];
  const mobileDevice = devices['iPhone 12']; // Tiene viewport de 390x844

  // 3. Iniciar navegador (Chromium)
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...mobileDevice,
    viewport: { width: 390, height: 844 }, // Forzar viewport 390x844
  });

  const page = await context.newPage();

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // Nombres limpios: captura-001.png, captura-002.png
    const filename = `captura-${String(i + 1).padStart(3, '0')}.png`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    const date = new Date().toISOString();

    const manifestEntry = {
      url,
      filename,
      date,
      status: 'pending',
    };

    console.log(`\n[${i + 1}/${urls.length}] Procesando: ${url}`);

    try {
      // 4. Abrir URL y esperar a que cargue
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      
      console.log('  Haciendo scroll para lazy loading...');
      // 5. Scroll automático
      await autoScroll(page);

      // Pequeña pausa extra para asegurar que las imágenes lazy terminen de renderizarse tras el scroll
      await page.waitForTimeout(2000);

      console.log(`  Guardando captura en ${outputPath}...`);
      // 6 y 7. Toma captura full-page
      await page.screenshot({ path: outputPath, fullPage: true });
      
      manifestEntry.status = 'success';
      console.log('  ¡Captura exitosa!');
    } catch (error) {
      console.error(`  Error capturando ${url}:`, error.message);
      manifestEntry.status = 'error';
      manifestEntry.error = error.message;
    }

    manifest.push(manifestEntry);
  }

  await browser.close();

  // 9. Generar manifest.json
  try {
    await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`\nProceso finalizado. Manifest guardado en ${MANIFEST_FILE}`);
  } catch (error) {
    console.error('Error guardando manifest.json:', error);
  }
}

main();
