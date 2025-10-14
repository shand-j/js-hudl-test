import { test, expect } from '@playwright/test';
import { LoginPage, LandingPage } from '../pages';
import type { ApplicationKey } from '../pages/types';
import { TEST_CREDENTIALS, HUDL_APPLICATIONS } from '../utils/constants';

test.describe('E2E Login Test', () => {
    let loginPage: LoginPage;
    let landingPage: LandingPage;
    let hudlApp: ApplicationKey;   

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        landingPage = new LandingPage(page);
    });

    test('User can navigate to hudl and log in successfully', async () => {
        hudlApp = 'hudl';
        await landingPage.goto();
        await landingPage.clickLogin();
        await landingPage.clickApplicationLogin(hudlApp);
        expect (await loginPage.isRedirectedToAuth()).toBeTruthy();
        await loginPage.login(TEST_CREDENTIALS.VALID_EMAIL, TEST_CREDENTIALS.VALID_PASSWORD);
        expect(await loginPage.getStateParam()).not.toBeNull();
        //TODO: Verify successful login by checking for redirect or dashboard elements
    });
});