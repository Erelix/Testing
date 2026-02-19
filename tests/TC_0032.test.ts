import { test, expect } from '@playwright/test';

test('TC_0032', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByRole('link', { name: 'Dynamic Properties' }).click();

  const colorChangeBtn = page.locator('#colorChange');
  const visibleAfterBtn = page.getByRole('button', { name: 'Visible After 5 Seconds' });

  await colorChangeBtn.waitFor({ state: 'attached' });
  await expect(colorChangeBtn).toHaveClass(/text-danger/, { timeout: 10000 });
  await expect(visibleAfterBtn).toBeVisible({ timeout: 10000 });
});
