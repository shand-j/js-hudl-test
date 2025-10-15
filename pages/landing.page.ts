import type { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly loginSelectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginSelectButton = page.getByTestId('login-select');
  }

  async goto() {
    /* Navigate to the landing page with stable locale*/
    await this.page.goto('/en_gb/');
  }

  async clickLogin() {
    await this.loginSelectButton.click();
  }

  async clickApplicationLogin(app: string) {
    await this.page.getByTestId(`login-${app}`).click();
  }
}