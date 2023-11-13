import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React");
});

test('add one item', async ({ page }) => {
  await page.goto('https://localhost:5173/AddItem');

  // Click the get started link.
  await page.goto('https://localhost:5173/AddItem');

  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()

  await page.getByLabel('Link').click();
  await page.getByLabel('Link').fill('iPhone');
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Linkd$/ }).locator('#outlined-basic').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  
  await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');

  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await expect(page.getByText('iPhone', { exact: true })).toBeVisible()





  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
