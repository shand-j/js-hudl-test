/// <reference lib="dom" />
import { expect } from '@playwright/test';
import test from '../fixtures/resources.fixture.ts';
import { LoginPage } from '../pages/hudl-login.page.ts';
import { TEST_CREDENTIALS } from '../utils/constants.ts';
import { log } from 'console';

/*Edge case tests for the login page to ensure robust handling of unusual but possible user interactions.
I would typically ensure these are tested at lower levels (unit/integration/component) but included here for completeness.*/
test.describe('Hudl Login Tests', () => {
 
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  test('should show error message with malformed email', async ({ loginPage }) => {
    await loginPage.fillEmail(TEST_CREDENTIALS.MALFORMED_EMAIL);
    await loginPage.clickContinue();

    await expect(loginPage.malformedEmailErrorMessage).toBeVisible();
  });

  test('should show error message with empty email', async ({ loginPage }) => {
    expect(loginPage.isFieldRequired(loginPage.emailInput)).toBeTruthy();

    await loginPage.fillEmail('');
    await loginPage.clickContinue();

    await expect(loginPage.missingEmailErrorMessage).toBeVisible();
  });

  test('should show error message with empty password', async ({ loginPage }) => {
    expect(loginPage.isFieldRequired(loginPage.passwordInput)).toBeTruthy();

    await loginPage.login(TEST_CREDENTIALS.VALID_EMAIL, '');

    await expect(loginPage.missingPasswordErrorMessage).toBeVisible();
  });

  test('should display forgot password link', async ({ loginPage }) => {
    await loginPage.fillEmail(TEST_CREDENTIALS.VALID_EMAIL);
    await loginPage.clickContinue();
    
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('should be able to edit email field after submission', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(TEST_CREDENTIALS.INVALID_EMAIL, TEST_CREDENTIALS.VALID_PASSWORD);
    await expect(loginPage.invalidEmailErrorMessage).toBeVisible();
    await loginPage.clickEditEmail();

    await loginPage.fillEmail(TEST_CREDENTIALS.VALID_EMAIL);
    await loginPage.clickContinue();

    await expect(loginPage.readEmail()).resolves.toEqual(TEST_CREDENTIALS.VALID_EMAIL);
  });

  test('should be able to toggle password visibility', async ({ loginPage }) => {
    await loginPage.fillEmail(TEST_CREDENTIALS.VALID_EMAIL);
    await loginPage.clickContinue();
    
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    
    await loginPage.togglePasswordVisibility();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');

    await loginPage.togglePasswordVisibility();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});
