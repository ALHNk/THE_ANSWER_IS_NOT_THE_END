/* global window, document, innerWidth */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import zlib from "node:zlib";
const browser = await chromium.launch({
  headless: true,
  channel:
    process.env.PLAYWRIGHT_CHANNEL ||
    (process.platform === "win32" ? "msedge" : undefined),
});
const records = [];
for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await session.send("Performance.enable");
  await page.addInitScript(() => {
    window.__qa = { lcp: 0, cls: 0, longTasks: [] };
    for (const type of ["largest-contentful-paint", "layout-shift", "longtask"])
      try {
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            if (type === "largest-contentful-paint")
              window.__qa.lcp = e.startTime;
            if (type === "layout-shift" && !e.hadRecentInput)
              window.__qa.cls += e.value;
            if (type === "longtask") window.__qa.longTasks.push(e.duration);
          }
        }).observe({ type, buffered: true });
      } catch {
        /* Unsupported metric is left unreported. */
      }
  });
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("http://127.0.0.1:4173/");
  await page.waitForTimeout(1200);
  const initial = await page.evaluate(() => ({
    timing: performance.getEntriesByType("navigation")[0].toJSON(),
    paint: performance.getEntriesByType("paint").map((x) => x.toJSON()),
    observer: window.__qa,
    overflow: document.documentElement.scrollWidth - innerWidth,
  }));
  for (const id of [
    "literature",
    "reflections",
    "feedback",
    "process",
    "assessment",
    "conclusion",
  ]) {
    await page
      .locator("#" + id)
      .evaluate((e) => e.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(80);
  }
  const metrics = await session.send("Performance.getMetrics");
  const after = await page.evaluate(() => ({
    observer: window.__qa,
    nodes: document.querySelectorAll("*").length,
  }));
  records.push({
    name,
    cpuThrottle: 4,
    network: "unthrottled loopback, not field measurements",
    initial,
    after,
    metrics: metrics.metrics.filter((x) =>
      [
        "JSHeapUsedSize",
        "Nodes",
        "TaskDuration",
        "LayoutDuration",
        "ScriptDuration",
      ].includes(x.name),
    ),
    externalRequests: requests.filter(
      (u) => !u.startsWith("http://127.0.0.1:4173/"),
    ),
  });
  await context.close();
}
const bundles = fs.readdirSync("dist/assets").map((name) => {
  const bytes = fs.readFileSync("dist/assets/" + name);
  return { name, bytes: bytes.length, gzipBytes: zlib.gzipSync(bytes).length };
});
fs.mkdirSync("qa", { recursive: true });
fs.writeFileSync(
  "qa/performance.json",
  JSON.stringify(
    { measuredAt: new Date().toISOString(), records, bundles },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      records: records.map((r) => ({
        name: r.name,
        lcp: r.initial.observer.lcp,
        cls: r.initial.observer.cls,
        longTasks: r.after.observer.longTasks,
        external: r.externalRequests,
        nodes: r.after.nodes,
        metrics: r.metrics,
      })),
      bundles,
    },
    null,
    2,
  ),
);
await browser.close();
