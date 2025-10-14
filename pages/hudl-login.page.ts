import { Page, Locator } from '@playwright/test';
import type { LoginInputSelector, LoginButtonText, LoginErrorText, LoginLinkText } from './types';
import { LOGIN_SELECTORS } from '../utils/constants';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly malformedEmailErrorMessage: Locator;
  readonly missingEmailErrorMessage: Locator;
  readonly invalidEmailErrorMessage: Locator;
  readonly invalidPasswordErrorMessage: Locator;
  readonly missingPasswordErrorMessage: Locator;
  readonly forgotPasswordLink: Locator;

  private readonly emailSelector: LoginInputSelector;
  private readonly passwordSelector: LoginInputSelector;
  private readonly continueButtonText: LoginButtonText;
  private readonly malformedEmailErrorMessageText: LoginErrorText;
  private readonly missingEmailErrorMessageText: LoginErrorText;
  private readonly invalidEmailErrorMessageText: LoginErrorText;
  private readonly invalidPasswordErrorMessageText: LoginErrorText;
  private readonly missingPasswordErrorMessageText: LoginErrorText;
  private readonly forgotPasswordLinkText: LoginLinkText;

  constructor(page: Page) {
    this.page = page;

    this.emailSelector = LOGIN_SELECTORS.inputs.email;
    this.passwordSelector = LOGIN_SELECTORS.inputs.password;
    this.continueButtonText = LOGIN_SELECTORS.buttons.continue;
    this.malformedEmailErrorMessageText = LOGIN_SELECTORS.errorMessages.malformedEmail;
    this.missingEmailErrorMessageText = LOGIN_SELECTORS.errorMessages.missingEmail;
    this.missingPasswordErrorMessageText = LOGIN_SELECTORS.errorMessages.missingPassword;
    this.invalidEmailErrorMessageText = LOGIN_SELECTORS.errorMessages.invalidEmail;
    this.invalidPasswordErrorMessageText = LOGIN_SELECTORS.errorMessages.invalidPassword;
    this.forgotPasswordLinkText = LOGIN_SELECTORS.links.forgotPassword;

    this.emailInput = page.locator(this.emailSelector);
    this.passwordInput = page.locator(this.passwordSelector);
    this.continueButton = page.getByText(this.continueButtonText, { exact: true });
    this.malformedEmailErrorMessage = page.getByText(this.malformedEmailErrorMessageText, { exact: true });
    this.missingEmailErrorMessage = page.getByText(this.missingEmailErrorMessageText, { exact: true });
    this.missingPasswordErrorMessage = page.getByText(this.missingPasswordErrorMessageText, { exact: true });
    this.invalidEmailErrorMessage = page.getByText(this.invalidEmailErrorMessageText, { exact: true });
    this.invalidPasswordErrorMessage = page.getByText(this.invalidPasswordErrorMessageText, { exact: true });
    this.forgotPasswordLink = page.getByText(this.forgotPasswordLinkText, { exact: true });
  }

  async goTo() {
    await this.page.goto('/login');
  }

  async getStateParam() {
    return this.page.url().includes('state=') ? new URL(this.page.url()).searchParams.get('state') : null;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
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

  async isFieldRequired(field: Locator): Promise<boolean> {
    return field.evaluate(el => (el as HTMLInputElement).validity.valueMissing);
  }

  async isRedirectedToAuth(): Promise<boolean> {
    return this.page.url().startsWith('https://identity.hudl.com/u/login/identifier?state=');
  }
}