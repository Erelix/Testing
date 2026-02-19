import { test, expect } from '@playwright/test';

test('TC_0031', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  await page.getByRole('link', { name: 'Widgets' }).click();
  await page.getByRole('link', { name: 'Progress Bar' }).click();

  const progressBar = page.getByRole('progressbar');
  const startStop = page.locator('#startStopButton');

  await startStop.click();

  await expect.poll(async () => {
    return await progressBar.getAttribute('aria-valuenow');
  }, {
    timeout: 15000
  }).toBe('100');

  await expect(progressBar).toHaveText('100%');
  await expect(progressBar).toHaveClass(/bg-success/);

  await page.getByRole('button', { name: 'Reset' }).click(); 
  await expect(startStop).toHaveText('Start');
});
