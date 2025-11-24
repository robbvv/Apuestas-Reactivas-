import { test, expect } from "@playwright/test";
import { loginWith, registerUser } from "./helper";

const baseUrl="http://localhost:5173"

/*
test.describe("Login flow", () => {
  test.beforeEach(async ({ request }) => {
    await request.post(baseUrl+"/testing/reset");
  });

  test("user can register and login", async ({ page }) => {
    await registerUser(page, "bob", "bob@mail.com", "secret123");
    await loginWith(page, "bob", "secret123");
    await expect(page.getByText("Signed in as bob.")).toBeVisible();
  });

  test("protected page redirects to login when not authenticated", async ({ page }) => {
    await page.goto(baseUrl+"/me");
    await expect(page.getByText("Log in")).toBeVisible();
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
});
*/