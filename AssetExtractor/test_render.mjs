import puppeteer from 'puppeteer';

(async () => {
    console.log("Iniciando Puppeteer...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.goto('https://lirioinvitaciones.com/xv-c', { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Check if it uses canvas or DOM elements
    const domInfo = await page.evaluate(() => {
        const root = document.getElementById('root');
        const canvases = document.querySelectorAll('canvas').length;
        const divs = document.querySelectorAll('div').length;
        return {
            rootInnerHtmlLength: root ? root.innerHTML.length : 0,
            canvasCount: canvases,
            divCount: divs
        };
    });
    
    console.log("DOM Info after render:", domInfo);
    await browser.close();
})();
