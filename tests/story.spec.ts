import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

test("seven chapters, five distinct authors, truthful survey and no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("main > section")).toHaveCount(7);
  for (const name of [
    "Amina Tuzelova",
    "Alikhan Khamidulla",
    "Temirlan Zholtayev",
    "Alua Nurlybekova",
    "Zhanerke Pernesh",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(
    page.locator(".member-card > .mini-label", {
      hasText: "REVISED INTERPRETATION",
    }),
  ).toHaveCount(5);
  await expect(
    page.getByRole("img", {
      name: "Survey agreement and disagreement, N equals 22",
    }),
  ).toHaveAccessibleDescription(/59.1% disagreement, mean 2.77/);
  await page.getByText("Read the complete reported data").click();
  for (const [item, value, mean] of [
    [2, "95.5", "4.45"],
    [6, "72.7", "4.09"],
    [7, "59.1", "2.77"],
    [10, "77.3", "4.09"],
  ] as const) {
    const row = page.getByRole("row").filter({
      has: page.getByRole("rowheader", {
        name: new RegExp("^" + item + "\\."),
      }),
    });
    await expect(row).toContainText(value);
    await expect(row).toContainText(mean);
  }
  await expect(page.locator(".rubric-strip article")).toHaveCount(5);
  await expect(page.locator(".rubric-strip")).toContainText("20%");
  expect(errors).toEqual([]);
});

test("concepts, reflection sources, revision keyboard, assessment and ending are operable", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Constructive alignment/ }).click();
  await expect(page.locator(".concept-detail")).toContainText(
    "Alignment is a design tool",
  );
  await page.locator(".member-card").first().locator("summary").click();
  await expect(page.locator(".member-card").first()).toContainText(
    "scan p. 3 visibly says Week 5",
  );
  const range = page.getByRole("slider", { name: "Revision comparison" });
  await range.focus();
  await range.press("End");
  await expect(range).toHaveValue("100");
  await page.getByRole("button", { name: /A short oral explanation/ }).click();
  await expect(page.locator(".choice-explanation")).toContainText(
    "Speaking anxiety and teacher workload matter",
  );
  await page
    .getByRole("button", { name: /Compare with the first answer/ })
    .click();
  await expect(page.locator(".closing-paper .paper-annotations")).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: /Reveal what changed/ }).click();
  await expect(page.locator(".closing-paper .paper-annotations")).toContainText(
    "Show the reasoning.",
  );
});

test("Q&A traps focus, Escape closes and restores focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Q&A", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .locator("summary")
    .filter({ hasText: "What does N=22 establish?" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "It cannot establish causal improvement",
  );
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      document.querySelector("dialog")?.contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("direct anchors, refresh restoration, scroll reversal and explicit motion control", async ({
  page,
}) => {
  await page.goto("/#assessment");
  await expect(page.locator("#assessment")).toBeInViewport();
  await page.reload();
  await expect(page.locator("#assessment")).toBeInViewport();
  await page.evaluate(() => scrollTo({ top: 5000, behavior: "instant" }));
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => Math.abs(scrollY - 5000)))
    .toBeLessThan(5);
  await page.getByRole("link", { name: "01 The answer", exact: true }).click();
  await expect(page.locator("#main-title")).toBeInViewport();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const before = await page
    .locator(".hero-exhibit .answer-paper")
    .evaluate((e) => getComputedStyle(e).transform);
  await page.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
  await page.waitForTimeout(250);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(250);
  const after = await page
    .locator(".hero-exhibit .answer-paper")
    .evaluate((e) => getComputedStyle(e).transform);
  expect(after).toBe(before);
  await page
    .getByRole("button", { name: "Skip animation", exact: true })
    .click();
  await expect(page.locator(".story")).toHaveClass(/reduced/);
  await expect(
    page.getByRole("button", { name: "Motion off" }),
  ).toHaveAttribute("aria-pressed", "true");
});

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["tablet", 820, 1180],
  ["mobile", 390, 844],
] as const) {
  test(`${name}: responsive layout, chart and screenshot evidence`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.waitForTimeout(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `qa/${name}-opening.png` });
    if (name === "mobile") {
      await page.getByRole("button", { name: "Chapters", exact: true }).click();
      await page
        .getByRole("link", { name: "06 The evidence", exact: true })
        .click();
      await expect(page.locator("#assessment")).toBeInViewport();
      await expect(page.locator(".chapter-nav")).not.toBeVisible();
    }
    await page.locator(".survey-chart").scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `qa/${name}-chart.png` });
    if (name === "mobile") {
      await expect(page.locator(".mobile-chart")).toBeVisible();
      expect(
        await page
          .locator(".mobile-chart p")
          .first()
          .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
      ).toBeGreaterThanOrEqual(15);
    }
    await page
      .locator("#reflections")
      .evaluate((e) =>
        e.scrollIntoView({ behavior: "instant", block: "start" }),
      );
    await page.screenshot({ path: `qa/${name}-reflections.png` });
    await page
      .locator("#conclusion")
      .evaluate((e) =>
        e.scrollIntoView({ behavior: "instant", block: "start" }),
      );
    await page.screenshot({ path: `qa/${name}-conclusion.png` });
    await page.screenshot({ path: `qa/${name}-full.png`, fullPage: true });
  });
}

test("OS reduced motion keeps real data readable and static decorative transforms", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#literature");
  await expect(page.locator(".story")).toHaveClass(/reduced/);
  await page.locator(".survey-chart").scrollIntoViewIfNeeded();
  const scales = await page
    .locator(".data-bar")
    .evaluateAll((bars) => bars.map((b) => getComputedStyle(b).transform));
  expect(scales.every((x) => x === "none")).toBe(true);
  await page.screenshot({ path: "qa/reduced-motion.png" });
});

test("core works with external requests and all bitmap images blocked", async ({
  page,
}) => {
  const external: string[] = [];
  await page.route("**/*", (route) => {
    const req = route.request();
    if (
      !req.url().startsWith("http://127.0.0.1:4173") ||
      req.resourceType() === "image"
    ) {
      external.push(req.url());
      return route.abort();
    }
    return route.continue();
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /THE ANSWER/ })).toBeVisible();
  await page.getByRole("button", { name: /A revision log/ }).click();
  await expect(page.locator(".choice-explanation")).toContainText(
    "justified revision",
  );
  expect(external.filter((x) => !x.includes("mark.svg"))).toEqual([]);
});

test("automated accessibility scan: desktop, expanded dossiers and phone", async ({
  page,
}) => {
  const results = [];
  await page.goto("/");
  results.push(
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze(),
  );
  await page
    .locator(".member-card summary")
    .evaluateAll((xs) =>
      xs.forEach((x) => ((x.parentElement as HTMLDetailsElement).open = true)),
    );
  results.push(
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze(),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  results.push(
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze(),
  );
  fs.writeFileSync(
    "qa/accessibility.json",
    JSON.stringify(
      results.map((r) => ({
        url: r.url,
        violations: r.violations,
        passes: r.passes.length,
        incomplete: r.incomplete.length,
      })),
      null,
      2,
    ),
  );
  expect(results.flatMap((r) => r.violations)).toEqual([]);
});

test("static poster has seven sections without JavaScript and credits are reachable", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/poster.html");
  await expect(page.locator(".panel")).toHaveCount(7);
  await expect(page.locator(".poster-bars")).toContainText(
    "59.1% disagreement",
  );
  await page.goto("http://127.0.0.1:4173/credits.html");
  await expect(
    page.getByRole("heading", { name: "AI disclosure", exact: true }),
  ).toBeVisible();
  await context.close();
});

test("balance game can be played to a result, and PDF downloads are offered", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("main > section")).toHaveCount(7);
  await page.getByRole("button", { name: /Start round 1/ }).click();
  for (let round = 0; round < 5; round++) {
    await page.locator(".g-options button").first().click();
    await expect(page.getByText("WHAT COULD FAIL")).toBeVisible();
    await page
      .getByRole("button", { name: /Next situation|See your course/ })
      .click();
  }
  await expect(page.getByRole("button", { name: /Play again/ })).toBeVisible();
  await expect(page.locator(".g-recap li")).toHaveCount(5);
  await page.getByRole("button", { name: /Play again/ }).click();
  await expect(page.getByText(/ROUND 1 \/ 5/)).toBeVisible();

  const poster = page.locator('.download-button[href$="poster.pdf"]');
  await expect(poster).toHaveAttribute("download", "");
  await expect(
    page.locator('.download-button[href*="essay/"][href$=".pdf"]'),
  ).toHaveCount(1);
  expect(errors).toEqual([]);
});
