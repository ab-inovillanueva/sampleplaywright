import { test, expect } from '@playwright/test';

test('Testcase 1 - Form submission', async ({ page }) => {
  //Sample site to test
  await page.goto('https://jupiter.cloud.planittesting.com/#/');

  //Verify the error messages
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('link', { name: 'Submit' }).click();
  await expect(page.getByText('We welcome your feedback - but we won\'t get it unless you complete the form correctly.')).toBeVisible();
  await expect(page.getByText('Forename is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Message is required')).toBeVisible();
  
  //Verify if the error message in the forename field is gone when the forename field is populated
  await page.getByRole('textbox', { name: 'Forename *' }).fill('Abi');
  await expect(page.getByText('Forename is required')).not.toBeVisible();

  //Verify if the error message in the email field is gone when the email field is populated
  await page.getByRole('textbox', { name: 'Email *' }).fill('abi@test.com');
  await expect(page.getByText('Email is required')).not.toBeVisible();

  //Verify if the error message in the message field is gone when the message field is populated
  await page.getByRole('textbox', { name: 'Message *' }).fill('i am abi');
  await expect(page.getByText('Message is required')).not.toBeVisible();

  //Verify that all mandatory fields are filled
  await expect(page.getByText('We welcome your feedback - tell it how it is.')).toBeVisible();
});