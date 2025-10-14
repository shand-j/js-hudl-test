import { Page, Locator } from '@playwright/test';
import { HUDL_APPLICATIONS } from '../utils/constants';
import type { ApplicationId, ApplicationKey } from './types';

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

  async clickApplicationLogin(appKey: ApplicationKey) {
    const appId: ApplicationId = HUDL_APPLICATIONS[appKey].id;
    const locator: Locator = this.page.getByTestId(appId);
    await locator.click();
  }
}