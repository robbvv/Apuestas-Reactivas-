import { test, expect } from "@playwright/test";
import { loginWith, registerUser, logout } from "./helper";

const baseUrl="http://localhost:5173"
const resetUrl="http://localhost:3001/api"

test.describe("Login flow", () => {
  test.beforeEach(async ({ request }) => {
    await request.post(resetUrl+"/testing/reset");
  });

  test("user can register and login", async ({ page }) => {
    await registerUser(page, "bob", "bob@mail.com", "secret123");
    await loginWith(page, "bob", "secret123");
    await expect(page.getByText(/Welcome, bob. What would you like to do?/)).toBeVisible();
  });

  test("protected page redirects to login when not authenticated", async ({ page }) => {
    await page.goto(baseUrl+"/");
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto(baseUrl+"/me");
    await expect(page.getByTestId("login-card-title")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "alice", "wrongpass");
    await expect(page.getByText("Wrong credentials")).toBeVisible();
  });

  test("login requires username", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "", "pass123");
    await expect(page.getByText("All fields are required")).toBeVisible();
  });

  test("login requires password", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "alice", "");
    await expect(page.getByText("All fields are required")).toBeVisible();
  });

  test("login requires both username and password", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "", "");
    await expect(page.getByText("All fields are required")).toBeVisible();
  });

  test("logout successful, profile no longer visible", async ({ page }) => {
    await registerUser(page, "alice", "alice@mail.com", "pass123");
    await loginWith(page, "alice", "pass123");
    await expect(page.getByText(/Welcome, alice. What would you like to do?/)).toBeVisible();
    await logout(page);
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto(baseUrl+"/me");
    await expect(page.getByTestId("login-card-title")).toBeVisible();
  });
});
