import { test, expect } from '@playwright/test';


// setup('do login', async ({ page }) => {
//   await page.getByLabel('Link').click();
//   await page.getByLabel('Link').fill('iPhone');
//   await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').click();
//   await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  
//   await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').click();
//   await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');

//   await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').click()
//   await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').fill("20000")
// });

test.beforeEach(async ({ page }) => {

});

// test('has title', async ({ page }) => {
//   await page.goto('https://localhost:5173/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle("Vite + React");
// });

test.only('add and delte items', async ({ page }) => {
  await page.goto('https://localhost:5173/AddItem');

  // Click the get started link.
  // await page.goto('https://localhost:5173/AddItem');

  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()

  await page.getByLabel('Link').click();
  await page.getByLabel('Link').fill('iPhone');
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  
  await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');

  await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').click()
  await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').fill("20000")

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Electronics' }).click();

  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await expect(page.getByText('iPhone', { exact: true })).toBeVisible()
  await expect(page.getByText('20000', )).toBeVisible()

  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()

  await page.locator('button:nth-child(5)').first().click();
  await page.locator('button:nth-child(5)').first().click();
  
  await page.getByLabel('edit').first().click();
  await page.getByRole('textbox', { name: 'Item name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Item name', exact: true }).fill('iPhone 2');
  await page.locator('span').filter({ hasText: 'iPhone 2' }).getByRole('button').click();
  
  await page.getByLabel('edit').nth(1).click();
  await page.getByRole('textbox', { name: 'Item name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Item name', exact: true }).fill('iPhone 3');
  await page.locator('span').filter({ hasText: 'iPhone 3Item nameItem name' }).getByRole('button').click();

  await expect(page.getByText('iPhone 2', { exact: true })).toBeVisible()
  await expect(page.getByText('iPhone 3', { exact: true })).toBeVisible()

  await page.locator('li').filter({ hasText: 'iPhonehttps://www.alza.cz/iphone-15?dq=7927613&evt=ac' }).getByLabel('delete').click();
  await expect(page.getByText('iPhone', { exact: true })).not.toBeVisible()

  await page.locator('li').filter({ hasText: 'iPhone 2https://www.alza.cz/iphone-15?dq=7927613&evt=ac' }).getByRole('checkbox').check();
  await page.locator('li').filter({ hasText: 'iPhone 3https://www.alza.cz/iphone-15?dq=7927613&evt=ac' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Delete Selected' }).click();

  await expect(page.getByText('iPhone 2', { exact: true })).not.toBeVisible()
  await expect(page.getByText('iPhone 3', { exact: true })).not.toBeVisible()
});

test('add items to Feed and check them', async ({ page }) => {
  await page.goto('https://localhost:5173/AddItem');

  await page.getByLabel('Link').click();
  await page.getByLabel('Link').fill('iPhone');
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Link$/ }).locator('#outlined-basic').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  
  await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Image Link$/ }).locator('#outlined-basic').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');

  await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').click()
  await page.locator('div').filter({ hasText: /^Price$/ }).locator('#outlined-basic').fill("20000")

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Electronics' }).click();

  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await page.goto('https://localhost:5173/Feed');


  await expect(page.getByLabel('Search')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Price' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Show only available' })).toBeVisible()
  await expect(page.getByText("iPhone")).toBeVisible()
  await expect(page.getByText("Electronics")).toBeVisible()
  await expect(page.getByText("20000")).toBeVisible()
  await expect(page.getByLabel('add')).toBeVisible()
});





