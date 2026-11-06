import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { pathToFileURL } from "url";

const root = path.resolve(import.meta.dirname, "..");
const shots = path.join(root, "scripts", "shots", "replay");
fs.mkdirSync(shots, { recursive: true });
const ORIG = process.env.ORIG_URL || pathToFileURL(path.join(root, "orig.html")).href;
const NEXT = process.env.NEXT_URL || "http://localhost:3100/";

const steps = [
  ["initial", async () => {}],
  ["auto tour advanced after 5.6s", async (p) => { await p.clock.runFor(5600); }],
  ...[0, 1, 2, 3, 4].map((i) => [`benefit ${i}`, async (p) => { await p.locator("button.benefit").nth(i).click(); }]),
  ...[0, 1, 2, 3, 4].map((i) => [`sidebar ${i}`, async (p) => { await p.locator("button.side").nth(i).click(); }]),
  ["sidebar Home again", async (p) => { await p.locator("button.side").nth(0).click(); }],
  ["toggle plan step 4", async (p) => { await p.locator(".dash button", { hasText: "Managing Your Sales Pipeline" }).click(); }],
  ["toggle plan step 1", async (p) => { await p.locator(".dash button", { hasText: "Sales Growth Strategy" }).click(); }],
  ["sidebar Leads", async (p) => { await p.locator("button.side").nth(1).click(); }],
  ["chip Hot", async (p) => { await p.locator("button.chip", { hasText: "Hot" }).click(); }],
  ["chip Warm", async (p) => { await p.locator("button.chip", { hasText: "Warm" }).click(); }],
  ["chip All", async (p) => { await p.locator("button.chip", { hasText: "All" }).click(); }],
  ["qualify first lead", async (p) => { await p.locator("button.qbtn").first().click(); }],
  ["qualify first lead again (un-qualify)", async (p) => { await p.locator("button.qbtn").first().click(); }],
  ["qualify first lead (final)", async (p) => { await p.locator("button.qbtn").first().click(); }],
  ["sidebar Pipeline", async (p) => { await p.locator("button.side").nth(2).click(); }],
  ...[0, 1, 2, 3, 4].map((i) => [`pipeline stage ${i}`, async (p) => { await p.locator("button.stage").nth(i).click(); }]),
  ["sidebar Campaigns", async (p) => { await p.locator("button.side").nth(3).click(); }],
  ...[0, 1, 2, 3].map((i) => [`sequence switch ${i}`, async (p) => { await p.locator("button.switch").nth(i).click(); }]),
  ["sidebar Analytics", async (p) => { await p.locator("button.side").nth(4).click(); }],
  ...[0, 1, 2, 3, 4, 5].map((i) => [`hover bar ${i}`, async (p) => { await p.locator(".bar").nth(i).hover(); }]),
  ["click bar 2", async (p) => { await p.locator(".bar").nth(2).click(); }],
  ...[0, 1, 2, 3, 4].map((i) => [`module ${i}`, async (p) => { await p.locator("button.mod").nth(i).click(); await p.waitForTimeout(700); }]),
  ["submit empty form", async (p) => { await p.locator("#register").scrollIntoViewIfNeeded(); await p.locator("form button[type=submit]").click(); }],
  ["fill all fields", async (p) => {
    await p.getByLabel("First Name").fill("Ada");
    await p.getByLabel("Surname").fill("Lovelace");
    await p.getByLabel("Email Address").fill("ada@example.com");
    await p.getByLabel("Country code").selectOption("+234");
    await p.getByLabel("Phone Number").fill("8012345678");
    await p.getByLabel("Location (City, Country)").fill("Lagos, Nigeria");
    await p.getByLabel("I am a…").selectOption("Founder / Co-founder");
  }],
  ["analytics view shows typed name", async (p) => { await p.locator("button.side").nth(4).click(); }],
  ["submit valid form", async (p) => { await p.locator("form button[type=submit]").click(); }],
  ["register another person", async (p) => { await p.getByRole("button", { name: "Register another person" }).click(); }],
  ["invalid email shows error", async (p) => {
    await p.getByLabel("First Name").fill("Bo");
    await p.getByLabel("Surname").fill("Li");
    await p.getByLabel("Email Address").fill("bad");
    await p.getByLabel("Phone Number").fill("1");
    await p.getByLabel("Location (City, Country)").fill("X");
    await p.getByLabel("I am a…").selectOption("Sales Manager");
    await p.locator("form button[type=submit]").click();
  }],
  ["edit clears error", async (p) => { await p.getByLabel("Email Address").fill("bo@x.co"); }],
];

const KEEP = process.env.KEEP ? process.env.KEEP.split(",").map(Number) : null;
async function run(name, url) {
  const browser = await chromium.launch({ args: ["--disable-partial-raster"] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) errs.push(`${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  await page.clock.install();
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
  await page.waitForTimeout(200);
  const hashes = [];
  for (let i = 0; i < steps.length; i++) {
    const [label, fn] = steps[i];
    if (KEEP && !KEEP.includes(i)) { hashes.push("skipped"); continue; }
    await fn(page);
    await page.waitForTimeout(Number(process.env.WAIT||250));
    // Force one full repaint (same on both pages) so Chrome's partial-repaint edge blending cannot differ.
    await page.evaluate(() => { const y = window.scrollY; window.scrollTo({ top: 0, behavior: "instant" }); window.scrollTo({ top: y, behavior: "instant" }); });
    await page.waitForTimeout(100);
    const buf = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(shots, `${name}-${String(i).padStart(2, "0")}.png`), buf);
    hashes.push(crypto.createHash("sha256").update(buf).digest("hex"));
  }
  await browser.close();
  return { hashes, errs };
}

const o = await run("orig", ORIG);
const n = await run("next", NEXT);
let bad = 0;
steps.forEach(([label], i) => {
  const ok = o.hashes[i] === n.hashes[i];
  if (!ok) bad++;
  console.log(ok ? "MATCH   " : "MISMATCH", String(i).padStart(2, "0"), label);
});
// the replay must also actually change the screen between steps (sanity: not all identical)
console.log("distinct screens in original:", new Set(o.hashes).size, "of", steps.length);
console.log("console messages orig:", JSON.stringify(o.errs));
console.log("console messages next:", JSON.stringify(n.errs));
console.log(bad === 0 ? `ALL ${steps.length} STEPS MATCH` : `${bad} STEPS DIFFER`);
process.exit(bad ? 1 : 0);
