import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Uses installed Edge; never downloads a browser or submits guest data.
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:8082';
const output = process.argv[2] || 'test-results/ayde-scroll';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const results = [];
try {
  for (const width of [375, 390, 430, 820, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 1000, isMobile: width < 1000 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/?__invitationHost=ayde-octavio.invitaciones-access.smartbrain.lat`);
    await page.getByRole('button', { name: 'Abrir invitación' }).click();
    await page.locator('#inicio').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const expectedTitles = ['Misa', 'Recepción', 'Ceremonia de matrimonio civil', 'Programa social', 'Cena'];
    assert.deepEqual(await page.locator('main ol h3').allTextContents(), expectedTitles);
    assert.deepEqual(await page.locator('main ol time').allTextContents(), ['7:00 PM','8:00 PM','8:30 PM','9:00 PM','10:00 PM']);
    assert.equal(await page.locator('main ol li').nth(3).locator('a,p').count(), 0);
    assert.equal(await page.locator('main ol li').nth(4).locator('a,p').count(), 0);
    assert.match(await page.locator('#inicio').innerText(), /dos puedes\nresistir/);
    const roots = await page.evaluate(() => [document.documentElement,document.body,document.querySelector('#root'),document.querySelector('main')].map(e => ({tag:e.tagName,x:getComputedStyle(e).overflowX,y:getComputedStyle(e).overflowY})));
    assert(roots.every(e => e.x === 'clip' && e.y === 'visible'));
    await page.screenshot({path:path.join(output,`hero-${width}.png`)});
    const client = await context.newCDPSession(page);
    const trace = [];
    async function swipe(from, to, steps=12) {
      await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:width/2,y:from}]});
      for(let i=1;i<=steps;i++) {
        await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:width/2,y:from+(to-from)*i/steps}]});
        await page.waitForTimeout(16);
      }
      await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await page.waitForTimeout(180);
      trace.push(await page.evaluate(()=>scrollY));
    }
    if (width < 1000) {
      // Slow, fast, stop, reverse and change directions while music is active.
      await swipe(720,280,24); await swipe(740,180,5);
      const beforeUp = await page.evaluate(()=>scrollY);
      await swipe(220,700,14);
      assert(trace.at(-1) < beforeUp, 'touch scroll must reverse');
      for (let i=0;i<3;i++) { await swipe(740,250,5); await swipe(240,650,5); }
    }
    await page.getByRole('heading',{name:'Nuestro sí, acepto.'}).scrollIntoViewIfNeeded();
    await page.locator('main ol').screenshot({path:path.join(output,`program-${width}.png`)});
    // Real browser wheel input, over decoration and near floating controls.
    for (const [x,y,delta] of [[width-25,350,420],[width-65,835,500],[65,835,-450],[width/2,400,600],[width/2,400,-600]]) {
      await page.mouse.move(x,y); const before=await page.evaluate(()=>scrollY);
      await page.mouse.wheel(0,delta); await page.waitForTimeout(150);
      const after=await page.evaluate(()=>scrollY);
      assert(delta>0 ? after>before : after<before, `wheel blocked at ${x},${y}`);
    }
    const music = await page.evaluate(()=>({playing:!document.querySelector('audio').paused,ready:document.querySelector('audio').readyState}));
    await page.getByRole('button',{name:'Pausar música'}).click();
    await page.getByRole('button',{name:'Reproducir música'}).click();
    await page.mouse.wheel(0,500); await page.waitForTimeout(150);
    // Sweep all sections to load below-the-fold assets and examine bounds.
    const sections = page.locator('main section, main footer');
    for(const section of await sections.all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(80);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth), 'horizontal overflow');
    }
    await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>getComputedStyle(i).display==='none'||(i.complete&&i.naturalWidth>0)));
    const decorations = await page.locator('img[aria-hidden="true"]').evaluateAll(images=>images.map(i=>{const r=i.getBoundingClientRect(); return {file:i.src.split('/').at(-1),width:r.width,height:r.height,pointerEvents:getComputedStyle(i).pointerEvents};}));
    assert(decorations.every(d=>d.pointerEvents==='none'));
    const fixed = await page.locator('main button,main a').evaluateAll(es=>es.filter(e=>getComputedStyle(e).position==='fixed').map(e=>({label:e.getAttribute('aria-label'),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
    assert(fixed.every(e=>e.width===44&&e.height===44));
    assert.equal(await page.getByRole('link',{name:'Confirmar asistencia',exact:true}).getAttribute('href'),'https://forms.gle/yAHXHLKRF3im4t5MA');
    assert.equal(await page.locator('main ol a').count(),3);
    await page.getByRole('button',{name:'Pausar música'}).click();
    await page.screenshot({path:path.join(output,`closing-${width}.png`)});
    // Capture whole page after lazy loading; no screenshots of private panel data.
    if(width===390||width===1440) await page.screenshot({path:path.join(output,`full-${width}.png`),fullPage:true});
    assert.deepEqual(errors,[]);
    results.push({width,roots,touchScrollPositions:trace,music,decorations,fixed,errors});
    await context.close();
  }
  const page=await browser.newPage();
  await page.goto(`${base}/bodas/ayde-octavio`);
  await page.getByRole('button',{name:'Abrir invitación'}).waitFor();
  await page.goto(`${base}/?__invitationHost=panel.invitaciones-access.smartbrain.lat`);
  await page.getByRole('heading',{name:'Panel de tu invitación'}).waitFor();
  await page.goto(base);
  assert.equal(await page.locator('main ol').count(),0);
  console.log('PASS: five viewports, simulated touch/wheel scroll, images, music, timeline, links, traditional route and panel entry.');
  await writeFile(path.join(output,'results.json'),JSON.stringify(results,null,2));
} finally { await browser.close(); }


