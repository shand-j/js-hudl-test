import { expect } from '@playwright/test';
import test from '../fixtures/resources.fixture.ts';
import { TEST_CREDENTIALS } from '../utils/constants.ts';

test.describe('E2E Login Test', () => {
    let stateParam: string | null = null;   

    test.beforeEach(async ({ loginPage, landingPage }) => {
        stateParam = null;

        await landingPage.goto();
        await landingPage.clickLogin();
        await landingPage.clickApplicationLogin('hudl');
        stateParam = await loginPage.getStateParam();
    });

    // Test data for different login scenarios. Tests the main login scenarios in a data-driven manner.
    const loginTestData = [
        {
            name: 'Valid credentials allow successful login',
            email: TEST_CREDENTIALS.VALID_EMAIL,
            password: TEST_CREDENTIALS.VALID_PASSWORD,
            shouldSucceed: true,
            expectedElement: TEST_CREDENTIALS.USER_NAME
        },
        {
            name: 'Invalid email prevents login',
            email: TEST_CREDENTIALS.INVALID_EMAIL,
            password: TEST_CREDENTIALS.VALID_PASSWORD,
            shouldSucceed: false,
        },
        {
            name: 'Invalid password prevents login',
            email: TEST_CREDENTIALS.VALID_EMAIL,
            password: TEST_CREDENTIALS.INVALID_PASSWORD,
            shouldSucceed: false,
        }
    ] as const;

    loginTestData.forEach((testCase) => {
        test(testCase.name, async ({ loginPage, dashboardPage }) => {
            expect(loginPage.isRedirectedToAuth()).toBeTruthy();
            
            await loginPage.login(testCase.email, testCase.password);

            if (testCase.shouldSucceed) {
                await expect(dashboardPage.getGlobalUserMenu(TEST_CREDENTIALS.USER_NAME)).toBeVisible();
            } else {
                testCase.name.includes('Invalid email') ? await expect(loginPage.invalidEmailErrorMessage).toBeVisible()
                : await expect( loginPage.invalidPasswordErrorMessage).toBeVisible();

                expect( loginPage.page.url()).toContain('identity.hudl.com');
            }
        });
    });
});