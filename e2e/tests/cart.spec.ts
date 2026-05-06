import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Flow', () => {
  test('should add items to cart, navigate to cart, and verify details', async ({ page }) => {
    // 1. Go to Home
    await page.goto('/');
    
    // Wait for the grid to appear
    const productGrid = page.locator('.product-grid');
    await expect(productGrid).toBeVisible({ timeout: 15000 });

    // 2. Add first product to cart
    const firstProduct = page.locator('.product-card').first();
    const firstProductName = await firstProduct.locator('.product-title').innerText();
    
    // Check initial cart count (should not exist or be 0)
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).toHaveCount(0);
    
    // Click Add to Cart
    await firstProduct.locator('.add-to-cart-btn').click();
    
    // Badge should now be visible and say '1'
    await expect(page.locator('.cart-badge')).toBeVisible();
    await expect(page.locator('.cart-badge')).toHaveText('1');

    // 3. Add second product to cart
    const secondProduct = page.locator('.product-card').nth(1);
    await secondProduct.locator('.add-to-cart-btn').click();
    
    // Badge should say '2'
    await expect(page.locator('.cart-badge')).toHaveText('2');

    // 4. Navigate to Cart
    await page.locator('.cart-btn').click();
    await expect(page).toHaveURL(/\/cart/);

    // 5. Verify Cart Page
    await expect(page.locator('.page-header h1')).toContainText('Cart');
    
    // Check if both items are present
    const cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(2);
    
    // Check if the first product's name is somewhere in the cart
    await expect(page.locator(`text=${firstProductName}`).first()).toBeVisible();

    // 6. Remove one item
    await cartItems.first().locator('.btn-icon').click();
    
    // Should have 1 item now
    await expect(cartItems).toHaveCount(1);
    
    // Badge should say 1
    await expect(page.locator('.cart-badge')).toHaveText('1');
  });
});
