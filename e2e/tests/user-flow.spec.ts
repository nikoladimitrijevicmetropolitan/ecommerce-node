import { test, expect } from '@playwright/test';

test.describe('E-commerce Vibe User Flow', () => {
  test('should navigate from list to detail page', async ({ page }) => {
    // Start at the home page
    await page.goto('/');

    // Wait for the grid to appear (increased timeout for slow dev server startup)
    const productGrid = page.locator('.product-grid');
    await expect(productGrid).toBeVisible({ timeout: 15000 });

    // Wait for at least one product card to appear
    const firstProductCard = page.locator('.product-card').first();
    await expect(firstProductCard).toBeVisible({ timeout: 10000 });
    
    const productName = await firstProductCard.locator('.product-title').innerText();
    
    console.log(`Testing with product: ${productName}`);

    // Click on the product image to go to details
    await firstProductCard.locator('.product-image-wrapper').click();

    // Should be on detail page
    await expect(page).toHaveURL(/\/products\/.+/);
    
    // Check if the title in detail page matches
    const detailTitle = page.locator('.detail-title');
    await expect(detailTitle).toHaveText(productName);
    
    // Check if "Add to Cart" button is present
    const buyButton = page.locator('.buy-btn');
    await expect(buyButton).toBeVisible();
  });

  test('should go back to collection from detail page', async ({ page }) => {
    await page.goto('/');
    await page.locator('.product-card').first().locator('.product-image-wrapper').click();
    
    // Click back link
    await page.locator('.back-link').click();
    
    // Should be back on home page
    await expect(page).toHaveURL('/');
    await expect(page.locator('.page-header')).toBeVisible();
  });
});
