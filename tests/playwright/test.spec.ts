import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

});

test('add and delte items', async ({ page }) => {
  
  await page.goto('https://localhost:5174/AddItem');


  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()

  await page.getByLabel('Item Name').fill('iPhone');
  await page.getByLabel('Image Link').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');
  
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Other' }).isVisible();
  await page.getByRole('option', { name: 'Food' }).isVisible();
  await page.getByRole('option', { name: 'Electronics' }).click();
  
  await page.getByLabel('Price').fill('notANumber');
  await page.getByLabel('Item Link').fill('notALink');
  await page.getByText('AddClear').isDisabled()
  
  await page.getByLabel('Price').fill('20000');
  await page.getByLabel('Item Link').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');

  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await expect(page.getByText('iPhone', { exact: true })).toBeVisible()
  await expect(page.getByText('Link to web', { exact: true })).toBeVisible()
  await expect(page.getByText('20000', )).toBeVisible()
  await expect(page.getByText('Not assigned', )).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()
  await expect(page.getByLabel('duplicateItem', { exact: true })).toBeVisible()
  await expect(page.getByLabel('deleteItem', { exact: true })).toBeVisible()
  await expect(page.getByLabel('editItem', { exact: true })).toBeVisible()


  //clear button test
  await page.getByLabel('Item Link').fill('NotLink');
  await page.getByLabel('Image Link').fill('NotLinkImage');
  await page.getByLabel('Item name').fill('nothing here');
  await page.getByLabel('Price').fill('666');
  
  await expect(page.getByText('invalid link', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Clear' }).click()

  await expect(page.getByLabel('Price')).toBeEmpty();
  await expect(page.getByLabel('Item Link')).toBeEmpty();
  await expect(page.getByLabel('Image Link')).toBeEmpty();
  await expect(page.getByLabel('Item Name')).toBeEmpty();


  //duplicate button
  await page.getByLabel('duplicateItem', { exact: true }).click();

  //edit button
  await page.getByLabel('edit').nth(1).click();
  await page.getByLabel('Item', { exact: true }).click();
  await page.getByLabel('Item', { exact: true }).fill('iPhone2');
  await page.locator('li').filter({ hasText: 'ItemItemLinkLinkPricePriceNameNamee-maile-mail' }).getByLabel('Price').click();
  await page.locator('li').filter({ hasText: 'ItemItemLinkLinkPricePriceNameNamee-maile-mail' }).getByLabel('Price').fill('200000');
  await page.locator('li').filter({ hasText: 'ItemItemLinkLinkPricePriceNameNamee-maile-mail' }).getByRole('button').first().click();
  await page.locator('li').filter({ hasText: 'iPhone2Link to web200000,-Not assigned' }).getByLabel('edit').click();
  await page.getByLabel('Name', { exact: true }).click();
  await page.getByLabel('Name', { exact: true }).fill('Tim');
  await page.getByLabel('e-mail').fill('Cook');
  
  await page.locator('li').filter({ hasText: 'ItemItemLinkLinkPricePriceNameNamee-maile-mail' }).getByRole('button').first().click();


  await expect(page.getByText('iPhone2', { exact: true })).toBeVisible()
  await expect(page.getByText('200000', )).toBeVisible()
  await expect(page.getByText('Tim Cook', )).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeDisabled()
  await expect(page.getByLabel('personRemove', { exact: true })).toBeVisible()
  await page.getByLabel('personRemove', { exact: true }).click()
  await expect(page.getByText('Tim Cook', )).not.toBeVisible()

  //delete selected
  await page.locator('li').filter({ hasText: 'iPhone2Link to web200000,-Not assigned' }).getByLabel('deleteItem').click();
await page.getByLabel('duplicateItem').click();
await page.getByLabel('duplicateItem').nth(1).click();
await page.getByLabel('duplicateItem').nth(2).click();
await page.getByLabel('duplicateItem').nth(3).click();
await page.getByLabel('editItem').nth(1).click();
await page.getByLabel('Item', { exact: true }).fill('deleteItem1');
await page.locator('div:nth-child(3) > div:nth-child(2) > button').first().click();

await page.getByLabel('editItem').nth(4).click();
await page.getByLabel('Item', { exact: true }).fill('deleteItem2');
await page.locator('li').filter({ hasText: 'ItemItemLinkLinkPricePriceNameNamee-maile-mail' }).getByRole('button').first().click();

await page.locator('li').filter({ hasText: 'deleteItem1Link to web20000,-Not assigned' }).getByRole('checkbox').check();
await page.locator('li').filter({ hasText: 'deleteItem2Link to web20000,-Not assigned' }).getByRole('checkbox').check();
await page.getByRole('button', { name: 'Delete Selected' }).click();
await expect(page.getByText('deleteItem1', )).not.toBeVisible()
await expect(page.getByText('deleteItem2', )).not.toBeVisible()

});

test('add items to Feed and check them', async ({ page }) => {

  //add items
  await page.goto('https://localhost:5174/AddItem');

  await page.getByLabel('Item Name').fill('iPhone');
  await page.getByLabel('Item Link').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  await page.getByLabel('Image Link').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');
  await page.getByLabel('Price').fill('19999');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Electronics' }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await page.getByLabel('Item Name').fill('iPhone2');
  await page.getByLabel('Item Link').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  await page.getByLabel('Image Link').fill('https://image.alza.cz/products/RI045b2/RI045b2.jpg?width=500&height=500');
  await page.getByLabel('Price').fill('20000');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Electronics' }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await page.getByLabel('Item Name').fill('food1');
  await page.getByLabel('Item Link').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  await page.getByLabel('Image Link').fill('https://th.bing.com/th/id/R.7315207fd2f863f2e08ec1c86c57c382?rik=x2AJJreubaKCmg&pid=ImgRaw&r=0');
  await page.getByLabel('Price').fill('500');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Food' }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click()

  await page.getByLabel('Item Name').fill('food2');
  await page.getByLabel('Item Link').fill('https://www.alza.cz/iphone-15?dq=7927613&evt=ac');
  await page.getByLabel('Image Link').fill('https://th.bing.com/th/id/R.7315207fd2f863f2e08ec1c86c57c382?rik=x2AJJreubaKCmg&pid=ImgRaw&r=0');
  await page.getByLabel('Price').fill('501');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Food' }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click()

  //check feed
  // await page.goto('https://localhost:5174/Feed');
  await page.getByText( "Feed").nth(0).click()

  await expect(page.getByText('food1', )).toBeVisible()
  await expect(page.getByText('food2', )).toBeVisible()
  await expect(page.getByText('iPhone', { exact: true })).toBeVisible()
  await expect(page.getByText('iPhone2', { exact: true })).toBeVisible()

  //test category
  await page.locator('#selectCategory').click();
  await page.getByRole('option', { name: 'Food' }).click();
  await expect(page.getByText('food2', )).toBeVisible()
  await expect(page.getByText('iPhone', { exact: true })).not.toBeVisible()
  
  //test search
  await page.getByLabel('Search').fill('food');
  await expect(page.getByText('food1', )).toBeVisible()
  await expect(page.getByText('food2', )).toBeVisible()
  await expect(page.getByText('iPhone2', { exact: true })).not.toBeVisible()
  await expect(page.getByText('iPhone', { exact: true })).not.toBeVisible()

  //filter by text 'food' and select 'Electronics'
  await page.locator('#selectCategory').click();
  await page.getByRole('option', { name: 'Electronics' }).click();
  await expect(page.getByText('Nothing here', )).toBeVisible()
  await page.getByLabel('Search').fill('');
  await page.locator('#selectCategory').click();
  await page.getByRole('option', { name: 'All Categories' }).click();

  //assign to 
  await page.locator('div').filter({ hasText: /^food2Food501Where to buyAssign To$/ }).getByLabel('add'). click();
  await page.locator('#userNameId').click();
  await page.locator('#userNameId').fill('Chuck Norris');
  await page.locator('#useEmailId').click();
  await page.locator('#useEmailId').fill('chuck@norris.com');
  await page.getByLabel('confirm name and email button').click();
  await expect(page.getByText('Assigned to Chuck', )).toBeVisible()
  await page.getByLabel('switch between allitem and assigned items').check();
  await expect(page.getByText('Assigned to Chuck', )).not.toBeVisible()
  await expect(page.getByText('food1', )).toBeVisible()
  await expect(page.getByText('food2', )).not.toBeVisible()

  //delete all button
  await page.getByText( "Add Item").nth(0).click()
  await page.getByRole('button', { name: 'Delete All' }).click()
  await expect(page.getByText('iPhone', { exact: true })).not.toBeVisible()
});





