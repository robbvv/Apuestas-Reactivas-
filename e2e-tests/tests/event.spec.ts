import { test, expect } from "@playwright/test";
import { loginWith, registerUser, createEvent } from "./helper";

test.describe("Event app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await registerUser(page, "bob", "bob@mail.com", "dylan");

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page.getByText("Events")).toBeVisible();
  });

  test("login form works", async ({ page }) => {
    await loginWith(page, "bob", "dylan");
    await expect(page.getByText("bob")).toBeVisible(); // tu UI muestra username, no name
  });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "bob", "dylan");
      await expect(page.getByText("bob")).toBeVisible();
    });

    test("a new event can be created", async ({ page }) => {
      await createEvent(page, "Event by Playwright");

      await page.goto("/event-list");
      await expect(page.getByText("Event by Playwright")).toBeVisible();
    });

    test.describe("and an event exists", () => {
      test.beforeEach(async ({ page }) => {
        await createEvent(page, "Single Event");
      });

      test("event can be updated", async ({ page }) => {
        await page.goto("/event-list");
        await page.getByText("Single Event").click();

        await page.getByRole("button", { name: "Edit event" }).click();
        await page.getByPlaceholder("Type the title").fill("Updated Event");
        await page.getByRole("button", { name: "Save changes" }).click();

        await expect(page.getByText("Updated Event")).toBeVisible();
      });

      test("event can be deleted", async ({ page }) => {
        await page.goto("/event-list");
        await page.getByText("Single Event").click();

        await page.getByRole("button", { name: "Delete event" }).click();

        await page.goto("/event-list");
        await expect(page.getByText("Single Event")).not.toBeVisible();
      });
    });

    test.describe("and several events exist", () => {
      test.beforeEach(async ({ page }) => {
        await createEvent(page, "First Event");
        await createEvent(page, "Second Event");
      });

      test("one of them can be viewed individually", async ({ page }) => {
        await page.goto("/event-list");
        await page.getByText("First Event").click();

        await expect(page.getByText("First Event")).toBeVisible();
      });
    });
  });

});
