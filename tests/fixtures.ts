import { test as base, expect } from '@playwright/test';

// The demo site serves ads that can cover the page; block them so tests stay stable.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/googlesyndication|doubleclick|googleads|adservice/, (route) => route.abort());
    await use(page);
  },
});

export { expect };
