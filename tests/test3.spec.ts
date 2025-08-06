import { test, expect } from '@playwright/test';

test('Testcase 3 - Shopping cart scenario', async ({ page }) => {
  //Sample site to test
  await page.goto('https://jupiter.cloud.planittesting.com/#/shop');

  //verify can buy 2 stuffed frog
  await page.locator('#product-2').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-2').getByRole('link', { name: 'Buy' }).click();
  
  //verify can buy 5 fluffy bunny
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  
  //verify can buy 3 valentine bear
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();


  //get the subtotal for each products
  const frogPrice = await page.locator('#product-2').getByText('$').textContent();
  const frogPriceSubtotal = Number(frogPrice?.replace("$","")) * 2;
  
  const bunnyPrice = await page.locator('#product-4').getByText('$').textContent();
  const bunnyPriceSubtotal = Number(bunnyPrice?.replace("$","")) * 5;

  const bearPrice = await page.locator('#product-7').getByText('$').textContent();
  const bearPriceSubtotal = Number(bearPrice?.replace("$","")) * 3;
   

  await page.getByRole('link', { name: 'Cart (10)' }).click();
  

  //Verify the subtotal for each product in the cart
  const frogTotalText = await page.getByRole('cell', { name: '$21.98' }).textContent();
  const frogTotal = Number(frogTotalText?.replace("$",""));
  expect(frogPriceSubtotal).toBe(frogTotal);

  const bunnyTotalText = await page.getByRole('cell', { name: '$49.95' }).textContent();
  const bunnyTotal = Number(bunnyTotalText?.replace("$",""));
  expect(bunnyPriceSubtotal).toBe(bunnyTotal);

  const bearTotalText = await page.getByRole('cell', { name: '$44.97' }).textContent();
  const bearTotal = Number(bearTotalText?.replace("$",""));
  expect(bearPriceSubtotal).toBe(bearTotal);


  //Verify that each product price in the cart are correct
    const frogCartPrice = await page.getByRole('row', { name: 'Stuffed Frog $10.99' })
    .getByRole('cell', { name: '$10.99' }).textContent();
  expect(frogCartPrice).toBe("$10.99");

    const bunnyCartPrice = await page.getByRole('row', { name: 'Fluffy Bunny $9.99' })
    .getByRole('cell', { name: '$9.99' }).textContent();
  expect(bunnyCartPrice).toBe("$9.99");

  const bearCartPrice = await page.getByRole('row', { name: 'Valentine Bear $14.99' })
    .getByRole('cell', { name: '$14.99' }).textContent();
  expect(bearCartPrice).toBe("$14.99");


  //Verify that the total is equal to the sum of all the subtotal
  const totalPrice = frogTotal + bunnyTotal + bearTotal;
  expect(totalPrice).toBe(116.9);


});