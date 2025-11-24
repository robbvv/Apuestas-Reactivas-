import { Page } from "@playwright/test";

const baseUrl = "http://localhost:5173";

export const registerUser = async (page: Page, username: string, email: string, password: string) => {
  await page.goto(baseUrl + "/register");
  await page.getByPlaceholder("Enter your username").fill(username);
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.getByPlaceholder("Enter your password").fill(password);
  await page.getByRole("button", { name: "Register" }).click();
};

export const loginWith = async (page: Page, username: string, password: string) => {
  await page.goto(baseUrl + "/login");
  await page.getByPlaceholder("Enter your username").fill(username);
  await page.getByPlaceholder("Enter your password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
};

export const logout = async (page: Page) => {
  await page.getByTestId("logout-link-navbar").click();
}

export const createEvent = async (page: Page, title: string) => {
  await page.goto(baseUrl + "/event-form");

  await page.getByPlaceholder("Type the event title").fill(title);
  await page.getByPlaceholder("Type the organizer's name").fill("Tester");
  await page.getByPlaceholder("Type the organizer's email").fill("tester@mail.com");
  await page.getByPlaceholder("Describe the event").fill("Some description");
  await page.getByPlaceholder("Type the event sport").fill("Football");
  await page.getByPlaceholder("Type the event location").fill("Madrid");
  await page.getByLabel("Date").fill("2030-01-01");
  await page.getByPlaceholder("Minimum bet amount").fill("10");

  await page.getByPlaceholder("Option name (e.g. Team A wins)").fill("Team A");
  await page.getByPlaceholder("Payout").fill("2");
  await page.getByRole("button", { name: "Add option" }).click();

  await page.getByPlaceholder("Option name (e.g. Team A wins)").fill("Team B");
  await page.getByPlaceholder("Payout").fill("2");
  await page.getByRole("button", { name: "Add option" }).click();

  await page.getByRole("button", { name: "Publish event" }).click();
};
