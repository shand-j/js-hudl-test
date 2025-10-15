import type { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page; 
    }

    getGlobalUserMenu(userName: string): Locator {
        return this.page.getByText(userName, { exact: true });
    }

    async networkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}
