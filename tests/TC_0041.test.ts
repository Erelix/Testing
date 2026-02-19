import { test, expect } from '@playwright/test';
import data from '../test-data.json';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(data.user.email);
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill(data.user.password);
  await page.getByRole('button', { name: 'Log in' }).click();
});

test.afterEach(async ({ page }) => {
  await page.getByRole('link', { name: 'Log out' }).click();
});

test('TC_0041', async ({ page }) => {
  await page.locator('#topcartlink').hover();
  await expect(page.locator('#flyout-cart')).toContainText('You have no items in your shopping cart.');

  await page.getByRole('link', { name: 'Computers' }).nth(1).click();
  await page.getByRole('link', { name: 'Picture for category Accessories' }).click();
  await page.getByRole('link', { name: 'TCP Instructor Led Training', exact: true }).click();
  await page.locator('#add-to-cart-button-66').click();
  await expect(page.locator('.bar-notification.success')).toBeVisible();
  await page.getByRole('link', { name: 'Tricentis Demo Web Shop' }).click();
  await page.locator('#topcartlink').hover();
  await expect(page.locator('#flyout-cart')).toContainText('There are 1 item(s) in your cart.');

  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page.locator('#flyout-cart')).toContainText('You have no items in your shopping cart.');

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(data.user.email);
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill(data.user.password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('#topcartlink').hover();
  await expect(page.locator('#flyout-cart')).toContainText('There are 1 item(s) in your cart.');

  await page.getByRole('link', { name: 'Shopping cart (1)' }).click();
  await page.locator('#termsofservice').check();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByLabel('Select a billing address from').selectOption('');
  await page.getByRole('textbox', { name: 'First name:' }).click();
  await page.getByRole('textbox', { name: 'First name:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'First name:' }).fill(data.billing.firstName);
  await page.getByRole('textbox', { name: 'Last name:' }).dblclick();
  await page.getByRole('textbox', { name: 'Last name:' }).fill(data.billing.lastName);
  await page.getByRole('textbox', { name: 'Email:' }).dblclick();
  await page.getByRole('textbox', { name: 'Email:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Email:' }).fill(data.billing.email);
  await page.getByLabel('Country:').selectOption(data.billing.country);
  await page.getByRole('textbox', { name: 'City:' }).click();
  await page.getByRole('textbox', { name: 'City:' }).fill(data.billing.city);
  await page.getByRole('textbox', { name: 'Address 1:' }).click();
  await page.getByRole('textbox', { name: 'Address 1:' }).fill(data.billing.address);
  await page.getByRole('textbox', { name: 'Zip / postal code:' }).click();
  await page.getByRole('textbox', { name: 'Zip / postal code:' }).fill(data.billing.zip);
  await page.getByRole('textbox', { name: 'Phone number:' }).click();
  await page.getByRole('textbox', { name: 'Phone number:' }).fill(data.billing.phone);

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Select a shipping address').selectOption('4766064');

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('radio', { name: 'Next Day Air (0.00)' }).check();
  
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('radio', { name: 'Check / Money Order (5.00)' }).check();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('cell')).toContainText('Mail Personal or Business Check, Cashier\'s Check or money order to:');

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#checkout-confirm-order-load')).toContainText('9005.00');

  await page.getByRole('button', { name: 'Confirm' }).click();
  
  await page.waitForURL('**/checkout/completed/');
});

