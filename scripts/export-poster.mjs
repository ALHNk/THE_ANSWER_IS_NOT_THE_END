import { chromium } from "@playwright/test";
import fs from "node:fs";
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
await page.goto(
  (process.env.POSTER_ORIGIN || "http://127.0.0.1:5173") + "/poster.html",
  { waitUntil: "networkidle" },
);
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: "public/poster.pdf",
  preferCSSPageSize: true,
  printBackground: true,
});
fs.mkdirSync("qa", { recursive: true });
await page.screenshot({ path: "qa/poster-print.png", fullPage: true });
console.log("Exported public/poster.pdf and qa/poster-print.png");
await browser.close();
