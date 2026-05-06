const { test, expect } = require('@playwright/test');

test.describe('E-commerce Vibe User Flow', () => {
  test('should navigate from list to detail page', async ({ page }) => {
    await page.goto('/');
    
    // Wait for first product card
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible();
    
    const productName = await firstProduct.locator('.product-title').innerText();
    console.log('Testing with product:', productName);

    // Click on the title to go to details
    await firstProduct.locator('.product-title').click();
    
    // Verify detail page
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.locator('h1')).toHaveText(productName);
    
    // Check if price and description are visible
    await expect(page.locator('.text-3xl.font-bold')).toBeVisible();
    await expect(page.locator('.text-lg.leading-relaxed')).toBeVisible();
  });

  test('should go back to collection from detail page', async ({ page }) => {
    await page.goto('/');
    await page.locator('.product-card').first().locator('.product-title').click();
    
    // Click back button
    await page.locator('text=Back to collection').click();
    
    // Should be back at home
    await expect(page).toHaveURL('/');
    await expect(page.locator('.product-card')).toHaveCount(8);
  });
});
