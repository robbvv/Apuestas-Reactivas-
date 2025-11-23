import { test, expect } from "@playwright/test";
import { loginWith, registerUser } from "./helper";

test.describe("Login flow", () => {
  test.beforeEach(async ({ request }) => {
    await request.post("/api/testing/reset");
  });

  test("user can register and login", async ({ page }) => {
    await registerUser(page, "bob", "bob@mail.com", "secret123");
    await loginWith(page, "bob", "secret123");
    await expect(page.getByText("Usuario bob logueado")).toBeVisible();
  });

  test("protected page redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/me");
    await expect(page.getByRole("heading", { name: "Login Page" })).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "alice", "wrongpass");
    await expect(page.getByText("invalid username or password")).toBeVisible();
  });
});