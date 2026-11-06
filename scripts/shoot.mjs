import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "scripts", "shots");
fs.mkdirSync(out, { recursive: true });
const ORIG = pathToFileURL(path.join(root, "orig.html")).href;
const NEXT = "http://localhost:3100/";
const sizes = [[1920, 1080], [1440, 900], [1180, 800], [768, 1024], [390, 844]];

const browser = await chromium.launch({ args: ["--disable-partial-raster"] });
const msgs = { orig: [], next: [] };
for (const [w, h] of sizes) {
  for (const [name, url] of [["orig", ORIG], ["next", NEXT]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on("console", (m) => { if (["error", "warning"].includes(m.type())) msgs[name].push(`${w}: ${m.type()}: ${m.text()}`); });
    page.on("pageerror", (e) => msgs[name].push(`${w}: pageerror: ${e.message}`));
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(1200);
    await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
    await page.waitForTimeout(200);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(out, `${name}-${w}.png`), fullPage: true });
    console.log(name, w, "height", height, "scrollW", await page.evaluate(() => document.documentElement.scrollWidth));
    await ctx.close();
  }
}
await browser.close();
console.log(JSON.stringify(msgs, null, 1));
