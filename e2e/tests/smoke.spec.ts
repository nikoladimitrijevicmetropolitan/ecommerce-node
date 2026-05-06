import { test, expect } from '@playwright/test';

test('Frontend aplikacija se uspešno učitava', async ({ page }) => {
  // Poseta početnoj stranici frontenda
  await page.goto('/');

  // Provera da li se stranica učitala (npr. provera title-a koji Vite podrazumevano postavlja)
  await expect(page).toHaveTitle(/E-commerce Vibe/);
});

test('Backend API je dostupan', async ({ request }) => {
  // Provera da li backend API odgovara
  const response = await request.get('http://localhost:3000/api/products');
  expect(response.ok()).toBeTruthy();
  const products = await response.json();
  expect(Array.isArray(products)).toBeTruthy();
});
