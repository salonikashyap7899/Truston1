import { test, expect } from '@playwright/test';

test('verify footer is visible on about-us', async ({ page }) => {
  await page.goto('http://localhost:5173/about-us');
  await page.waitForLoadState('networkidle');

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'about_us_footer_check.png', fullPage: true });

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});
