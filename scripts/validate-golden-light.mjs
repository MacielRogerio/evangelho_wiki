import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/home/rogerio-maciel/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/home/rogerio-maciel/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',headless:true});
const page=await browser.newPage({viewport:{width:1536,height:864}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=process.env.TEST_URL||'http://localhost:5173';
const active=()=>page.locator('.hero').getAttribute('data-golden-playing');
const opacity=sel=>page.locator(sel).evaluate(e=>Number(getComputedStyle(e).opacity));
async function enter(){const b=await page.locator('.bible-presence').boundingBox();await page.mouse.move(b.x+b.width*.5,b.y+b.height*.65);}
try{
 await page.goto(base);await page.clock.install();await page.clock.pauseAt(new Date());await enter();await page.clock.runFor(400);
 assert.equal(await active(),'true');assert(await opacity('[data-beam="christ"]')>.5);assert.equal(await opacity('[data-beam="old"]'),0);
 await page.screenshot({path:'artifacts/golden-light-travel.png'});
 await page.mouse.move(10,10);await page.clock.runFor(850);
 assert(await opacity('[data-pulse="christ"]')>0);assert.equal(await opacity('[data-beam="old"]'),0);
 await page.screenshot({path:'artifacts/golden-light-arrival.png'});
 await page.clock.runFor(650);assert(await opacity('[data-beam="old"]')>0);assert(await opacity('[data-beam="now"]')>0);
 await page.screenshot({path:'artifacts/golden-light-branches.png'});
 await page.clock.runFor(450);
 assert(await page.locator('[data-beam=old] .beam-core').evaluate(e=>parseFloat(e.style.strokeDasharray)>=e.getTotalLength()-.5));
 await page.screenshot({path:'artifacts/golden-light-full-arc.png'});
 await page.clock.runFor(1150);assert.equal(await active(),null);
 await enter();await page.clock.runFor(3500);assert.equal(await active(),null);
 await page.clock.runFor(3000);assert.equal(await active(),null); // no loop while still inside
 await page.mouse.move(10,10);await enter();assert.equal(await active(),'true');
 await page.setViewportSize({width:1000,height:800});await page.clock.runFor(400);await page.screenshot({path:'artifacts/golden-light-narrow-desktop.png'});
 assert(await page.locator('.golden-light').evaluate(e=>e.getBoundingClientRect().width===e.parentElement.getBoundingClientRect().width));
 await page.locator('.portal.new').click();assert.equal(new URL(page.url()).pathname,'/novo-testamento');
 await page.goto(base);await page.emulateMedia({reducedMotion:'reduce'});await enter();await page.clock.runFor(200);
 assert(await opacity('[data-pulse="source"]')>0);assert.equal(await opacity('[data-beam="christ"]'),0);await page.clock.runFor(500);assert.equal(await active(),null);
 await page.setViewportSize({width:390,height:844});await page.goto(base);assert.equal(await page.locator('.bible-presence').isVisible(),false);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'artifacts/golden-light-mobile.png',fullPage:true});
 const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 for(const [selector,path] of [['old','antigo-testamento'],['new','novo-testamento'],['now','atualidade']]){await touch.goto(base);await touch.locator('.portal.'+selector).tap();assert.equal(new URL(touch.url()).pathname,'/'+path);}
 await touch.close();
 assert.deepEqual(errors,[]);console.log('PASS: sequence, arrival before branching, completion outside, repeat, no loop, resize, reduced motion, mobile layout and three links; no JS errors.');
}finally{await browser.close();}
