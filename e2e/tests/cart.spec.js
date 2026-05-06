const { test, expect } = require('@playwright/test');

test.describe('Shopping Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add items to cart, navigate to cart, and verify details', async ({ page }) => {
    // Wait for products to load
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible();
    
    const productName = await firstProduct.locator('.product-title').innerText();
    const productPrice = await firstProduct.locator('.product-price').innerText();
    
    // Click Add to Cart
    await firstProduct.locator('.add-to-cart-btn').click();
    
    // Badge should now be visible and say '1'
    await expect(page.locator('.cart-badge')).toBeVisible();
    await expect(page.locator('.cart-badge')).toHaveText('1');

    // Go to cart page
    await page.locator('.cart-btn').click();
    await expect(page).toHaveURL('/cart');

    // Verify item in cart
    await expect(page.locator('h1')).toContainText('Shopping Cart');
    await expect(page.locator('.group h3')).toHaveText(productName);
    
    // Verify total calculation
    const total = await page.locator('.text-3xl.font-black').innerText();
    // Total should be >= product price (might have shipping/tax)
    const numericTotal = parseFloat(total.replace('$', ''));
    const numericPrice = parseFloat(productPrice.replace('$', ''));
    expect(numericTotal).toBeGreaterThanOrEqual(numericPrice);
  });

  test('should increase and decrease quantity in cart', async ({ page }) => {
    await page.locator('.add-to-cart-btn').first().click();
    await page.locator('.cart-btn').click();

    const quantity = page.locator('.w-10.text-center');
    await expect(quantity).toHaveText('1');

    // Add another of same item
    await page.locator('button[aria-label="Increase quantity"]').click();
    await expect(quantity).toHaveText('2');

    // Remove one
    await page.locator('button[aria-label="Decrease quantity"]').click();
    await expect(quantity).toHaveText('1');
  });
});
