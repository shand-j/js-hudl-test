import { test as baseTest } from '@playwright/test';
import { LoginPage} from '../pages/hudl-login.page.ts';
import { LandingPage } from '../pages/landing.page.ts';
import { DashboardPage } from '../pages/dashboard.page.ts';

const test = baseTest.extend<{
  loginPage: LoginPage;
  landingPage: LandingPage;
  dashboardPage: DashboardPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
});

export default test;
