import { test, expect } from '@playwright/test';

test('TC_0021', async ({ page }) => {

  await page.goto('https://demowebshop.tricentis.com/');

  await page.getByRole('link', { name: 'Computers' }).nth(1).click();
  await page.getByRole('link', { name: 'Picture for category Desktops' }).click();
 
  await page.waitForSelector('.product-item .price');
 
  const minPrice = 1200;
  const maxPrice = 1800;
  
  const productItem = page.locator('//div[contains(@class,"product-item")][.//span[contains(@class,"price") and number(translate(., "$,", "")) = 1800]]').first();
  
  await expect(productItem).toBeVisible();
  
  const priceText = await productItem.locator('.price').innerText();
  const selectedPrice = parseFloat(priceText.replace('$', ''));
  
  expect(selectedPrice).toBeGreaterThanOrEqual(minPrice);
  expect(selectedPrice).toBeLessThanOrEqual(maxPrice);

  await productItem.locator('a').first().click();
  await page.locator('#add-to-cart-button-74').click();
  await expect(page.locator('#bar-notification')).toContainText('added to your shopping cart');

  await page.getByRole('link', { name: 'Tricentis Demo Web Shop' }).click();
  await page.getByRole('link', { name: 'Computers' }).nth(1).click();
  await page.getByRole('link', { name: 'Picture for category Accessories' }).click();
  await page.getByRole('link', { name: 'TCP Instructor Led Training', exact: true }).click();

  const tcpPriceText = await page.locator('.product-price').innerText();
  const tcpPrice = parseFloat(tcpPriceText.replace('$', ''));

  await page.getByRole('textbox', { name: 'Qty:' }).fill('3');
  await page.locator('#add-to-cart-button-66').click();
  await expect(page.locator('#bar-notification')).toContainText('added to your shopping cart');

  await page.getByRole('link', { name: 'Shopping cart (4)' }).click();
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('radio', { name: '8GB [+60.00]' }).check();
  await expect(page.getByRole('radio', { name: '8GB [+60.00]' })).toBeChecked();
  await page.getByRole('button', { name: 'Update' }).click();

  await page.getByRole('link', { name: 'Shopping cart (4)' }).click();

  await page.locator('input.qty-input').nth(1).fill('2');
  await page.getByRole('button', { name: 'Update shopping cart' }).click();


  const desktopPrice = selectedPrice + 60 + 15;
  const expectedTotal = desktopPrice + tcpPrice * 2;

  const totalLocator = page.locator('span.product-price.order-total strong');

  await expect(totalLocator).toBeVisible();

  const totalText = await totalLocator.innerText();
  const actualTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

  expect(actualTotal).toBe(expectedTotal);

  await page.locator('#termsofservice').check();
  await page.getByRole('button', { name: 'Checkout' }).click();

});
