import { test, expect } from "@playwright/test";
import { presentationSteps } from "../src/presentation";

test("PageDown and PageUp traverse every element and reveal exhibits without clicking", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/");
  await page.keyboard.press("PageUp");
  await expect(
    page.locator('[data-presentation-active="opening"]'),
  ).toBeFocused();
  for (const step of presentationSteps.slice(1)) {
    await page.keyboard.press("PageDown");
    const active = page.locator(`[data-presentation-active="${step.id}"]`);
    await expect(active, step.id).toBeFocused();
    await expect(active, step.id).toBeInViewport();
    if (step.id === "why")
      await expect(page.locator(".why-note")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    if (step.id.startsWith("lens-")) {
      const index = Number(step.id.split("-")[1]);
      await expect(
        page.locator(".concept-nodes button").nth(index),
      ).toHaveAttribute("aria-pressed", "true");
    }
    if (step.id.includes("-sources")) await expect(active).toBeVisible();
    if (step.id === "survey-table")
      await expect(page.locator("table")).toBeVisible();
    if (step.id === "revision-before")
      await expect(
        page.getByRole("slider", { name: "Revision comparison" }),
      ).toHaveValue("0");
    if (step.id === "revision-after")
      await expect(
        page.getByRole("slider", { name: "Revision comparison" }),
      ).toHaveValue("100");
    if (step.id.startsWith("evidence-")) {
      const index = Number(step.id.split("-")[1]);
      await expect(
        page.locator(".evidence-choices button").nth(index),
      ).toHaveAttribute("aria-pressed", "true");
    }
    if (step.id === "paper-before")
      await expect(
        page.locator(".closing-paper .paper-annotations"),
      ).toHaveCount(0);
    if (step.id === "paper-after")
      await expect(
        page.locator(".closing-paper .paper-annotations"),
      ).toBeVisible();
    if (step.modal) await expect(page.getByRole("dialog")).toBeVisible();
  }
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.keyboard.press("PageDown");
  await expect(
    page.locator('[data-presentation-active="finish"]'),
  ).toBeFocused();
  for (const step of presentationSteps.slice(0, -1).reverse()) {
    await page.keyboard.press("PageUp");
    await expect(
      page.locator(`[data-presentation-active="${step.id}"]`),
      step.id,
    ).toBeFocused();
    if (step.id === "paper-before")
      await expect(
        page.locator(".closing-paper .paper-annotations"),
      ).toHaveCount(0);
    if (step.id === "revision-before")
      await expect(
        page.getByRole("slider", { name: "Revision comparison" }),
      ).toHaveValue("0");
  }
  await expect(page.locator(".why-note")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.keyboard.press("PageUp");
  await expect(
    page.locator('[data-presentation-active="opening"]'),
  ).toBeFocused();
});

test("presentation keys respect editable fields and resume after direct navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("PageDown");
  await expect(page.locator('[data-presentation-active="why"]')).toBeFocused();
  await page.locator(".team-record").first().locator("summary").click();
  const field = page.locator("textarea").first();
  await field.fill("A private course record");
  await page.keyboard.press("PageDown");
  await expect(field).toBeFocused();
  await expect(field).toHaveValue("A private course record");
  await expect(page.locator("[data-presentation-active]")).toHaveCount(0);
  await page
    .getByRole("link", { name: "06 The evidence", exact: true })
    .click();
  await expect(page.locator("#assessment")).toBeInViewport();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.querySelector("#assessment")!.getBoundingClientRect().top,
      ),
    )
    .toBeLessThan(200);
  await page.keyboard.press("PageDown");
  await expect(
    page.locator('[data-presentation-active="evidence-0"]'),
  ).toBeFocused();
  await expect(page.locator(".choice-explanation")).toContainText("authorship");
});

test("corrected author name and source filenames remain distinct", async ({
  page,
}) => {
  await page.goto("/");
  const card = page
    .locator(".member-card")
    .filter({
      has: page.getByRole("heading", {
        name: "Temirlan Zholtayev",
        exact: true,
      }),
    });
  await expect(card).toBeVisible();
  await card.locator("summary").click();
  await expect(card).toContainText(
    "Zholtaev_Temirlan_Reflective_notes_week6.docx",
  );
  await page.goto("/poster.html");
  await expect(page.locator(".authors")).toContainText("Temirlan Zholtayev");
  await expect(page.locator(".voices")).toContainText("Temirlan Zholtayev");
  await page.goto("/credits.html");
  await expect(page.locator("body")).toContainText("Temirlan Zholtayev");
});
