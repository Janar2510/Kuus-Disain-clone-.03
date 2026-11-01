import { chromium } from "playwright";

const LOCAL = "http://127.0.0.1:3000";
const SOURCE = "https://senawastudio.com";

const pages = [
  ["home", "/"],
  ["work", "/work"],
  ["project", "/work/aa-house"],
  ["studio", "/studio"],
  ["process", "/process"],
  ["elements", "/elements"],
  ["contact", "/contact"],
  ["services", "/services"],
];

async function shoot(browser, base, prefix, width, height, dir) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const [name, path] of pages) {
    try {
      await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 });
    } catch (error) {
      console.log(`NAV FAIL ${prefix}${name}: ${error.message.split("\n")[0]}`);
      continue;
    }
    await page.waitForTimeout(1800);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(900);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${dir}/${prefix}${name}-${width}.png` });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    console.log(`shot ${prefix}${name}-${width}`);
  }
  await context.close();
}

(async () => {
  const dir = process.argv[2] || "docs/design-references/senawa";
  const target = process.argv[3] || "local";
  const browser = await chromium.launch();
  const base = target === "source" ? SOURCE : LOCAL;
  await shoot(browser, base, target === "source" ? "src-" : "loc-", 1440, 900, dir);
  await shoot(browser, base, target === "source" ? "srcm-" : "locm-", 390, 844, dir);
  await browser.close();
})();
