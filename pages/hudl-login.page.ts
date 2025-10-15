import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly emailEditButton: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly malformedEmailErrorMessage: Locator;
  readonly missingEmailErrorMessage: Locator;
  readonly invalidEmailErrorMessage: Locator;
  readonly invalidPasswordErrorMessage: Locator;
  readonly missingPasswordErrorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly togglePasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="username"], #username');
    this.emailEditButton = page.getByText('Edit', { exact: true });
    this.passwordInput = page.locator('input[name="password"], #password');
    this.continueButton = page.getByText('Continue', { exact: true });
    this.malformedEmailErrorMessage = page.getByText('Enter a valid email.', { exact: true });
    this.missingEmailErrorMessage = page.getByText('Enter an email address', { exact: true });
    this.missingPasswordErrorMessage = page.getByText('Enter your password.', { exact: true });
    this.invalidEmailErrorMessage = page.getByText('Incorrect username or password.', { exact: true });
    this.invalidPasswordErrorMessage = page.getByText('Your email or password is incorrect. Try again.', { exact: true });
    this.forgotPasswordLink = page.getByText('Forgot Password', { exact: true });
    this.togglePasswordButton = page.locator('button[aria-label="Show password"]');
  }

  async goTo() {
    await this.page.goto('/login');
  }

  async getStateParam(): Promise<string | null> {
    return this.page.url().includes('state=') ? new URL(this.page.url()).searchParams.get('state') : null;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async readEmail(): Promise<string> {
    return this.emailInput.inputValue();
  }

  async clickEditEmail() {
    await this.emailEditButton.click();
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.clickContinue();
    
    await this.fillPassword(password);
    await this.clickContinue();
  }

  async togglePasswordVisibility() {
    await this.togglePasswordButton.click();
  }

  async isFieldRequired(field: Locator): Promise<boolean> {
    return field.evaluate(el => (el as HTMLInputElement).validity.valueMissing);
  }

  async isRedirectedToAuth(): Promise<boolean> {
    return this.page.url().startsWith('https://identity.hudl.com/u/login/identifier?state=');
  }
}