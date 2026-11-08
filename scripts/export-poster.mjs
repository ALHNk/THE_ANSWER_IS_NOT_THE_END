// Exports the static poster to PDF (594x420 mm, as defined in the poster's @page rule).
//
//   node scripts/export-poster.mjs --dist   -> reads dist/poster.html, writes dist/poster.pdf
//                                              (used by GitHub Actions; no dev server needed)
//   node scripts/export-poster.mjs          -> reads the dev server, writes public/poster.pdf
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const fromDist = process.argv.includes("--dist");
const browser = await chromium.launch({
  headless: true,
  channel:
    process.env.PLAYWRIGHT_CHANNEL ||
    (process.platform === "win32" ? "msedge" : undefined),
});
const page = await browser.newPage({
  viewport: { width: 1680, height: 1188 },
  deviceScaleFactor: 1,
});
let url;
let out;
if (fromDist) {
  const html = path.resolve("dist/poster.html");
  if (!fs.existsSync(html))
    throw new Error("dist/poster.html not found - run the build first.");
  url = pathToFileURL(html).href;
  out = path.resolve("dist/poster.pdf");
} else {
  url = (process.env.POSTER_ORIGIN || "http://127.0.0.1:5173") + "/poster.html";
  out = path.resolve("public/poster.pdf");
}
await page.goto(url, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
if (!fromDist) {
  fs.mkdirSync("qa", { recursive: true });
  await page.screenshot({ path: "qa/poster-print.png", fullPage: true });
}
console.log("Exported " + path.relative(process.cwd(), out));
await browser.close();
