import { test, expect } from '@playwright/test';

test.beforeEach(async () => {
  // Set timeout to 100 secs for this hook to handle 5 iterations
  test.setTimeout(100000);
});

test('Testcase 2 - Iteration', async ({ page }) => {

  // Iterate 5 times
  for(let i = 0; i <= 5; i++) {
    //Sample site to test
    await page.goto('https://jupiter.cloud.planittesting.com/#/');

    //populate mandatory fields
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.getByRole('textbox', { name: 'Forename *' }).click();
    await page.getByRole('textbox', { name: 'Forename *' }).fill('Abi');
    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('Abi@test.com');
    await page.getByRole('textbox', { name: 'Message *' }).click();
    await page.getByRole('textbox', { name: 'Message *' }).fill('Hello, I\'m Abi');
    await page.getByRole('link', { name: 'Submit' }).click();

    //verify successful submission with a 20 secs timeout 
    await expect(page.getByText('Thanks Abi, we appreciate')).toBeVisible({timeout: 20000});
  }
});