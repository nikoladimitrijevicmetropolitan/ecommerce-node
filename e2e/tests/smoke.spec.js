const { test, expect } = require('@playwright/test');

test('Frontend aplikacija se uspešno učitava', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Provera da li se logo pojavljuje (znak da je React uspešno renderovan)
  await expect(page.locator('.navbar-logo')).toBeVisible();
  await expect(page.locator('.navbar-logo')).toContainText('VIBE');
});

test('Backend API je dostupan', async ({ request }) => {
  // Provera da li backend API odgovara
  const response = await request.get('http://localhost:3000/api/products');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBeTruthy();
});
