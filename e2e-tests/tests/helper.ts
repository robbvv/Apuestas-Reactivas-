import { Page } from "@playwright/test";

export const loginWith = async (page: Page, username: string, password: string) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
};

export const registerUser = async (page: Page, username: string, email: string, password: string) => {
  await page.goto("/register");
  await page.getByPlaceholder("Type your username").fill(username);
  await page.getByPlaceholder("Type you email").fill(email);
  await page.getByPlaceholder("Type your password").fill(password);
  await page.getByRole("button", { name: "Register" }).click();
};

export const createEvent = async (page: Page, title: string) => {
  await page.goto("/event-form");

  await page.getByPlaceholder("Type the title").fill(title);
  await page.getByPlaceholder("Type the organizer's name").fill("Tester");
  await page.getByPlaceholder("Type the organizer's email").fill("tester@mail.com");
  await page.getByPlaceholder("Describe the event").fill("Some description");
  await page.getByPlaceholder("Type the event sport").fill("Football");
  await page.getByPlaceholder("Type the event location").fill("Madrid");
  await page.getByLabel("Date of the event:").fill("2030-01-01");
  await page.getByPlaceholder("Type the minimum bet").fill("10");

  await page.getByPlaceholder("Option name").fill("Team A");
  await page.getByPlaceholder("Payout").fill("2");
  await page.getByRole("button", { name: "Add option" }).click();

  await page.getByRole("button", { name: "Publish event" }).click();
};
