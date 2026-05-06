# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Shopping Cart Flow >> should increase and decrease quantity in cart
- Location: tests\cart.spec.js:39:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.w-10.text-center')
Expected: "1"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.w-10.text-center')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "VIBE" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e7]: VIBE
      - link [ref=e9] [cursor=pointer]:
        - /url: /cart
        - img [ref=e10]
  - main [ref=e13]:
    - generic [ref=e14]:
      - img [ref=e16]
      - heading "Your cart is empty" [level=2] [ref=e19]
      - paragraph [ref=e20]: Looks like you haven't added anything to your cart yet. Explore our latest products and find something you love.
      - link "Start Shopping" [ref=e21] [cursor=pointer]:
        - /url: /
        - text: Start Shopping
        - img [ref=e22]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Shopping Cart Flow', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |   });
  7  | 
  8  |   test('should add items to cart, navigate to cart, and verify details', async ({ page }) => {
  9  |     // Wait for products to load
  10 |     const firstProduct = page.locator('.product-card').first();
  11 |     await expect(firstProduct).toBeVisible();
  12 |     
  13 |     const productName = await firstProduct.locator('.product-title').innerText();
  14 |     const productPrice = await firstProduct.locator('.product-price').innerText();
  15 |     
  16 |     // Click Add to Cart
  17 |     await firstProduct.locator('.add-to-cart-btn').click();
  18 |     
  19 |     // Badge should now be visible and say '1'
  20 |     await expect(page.locator('.cart-badge')).toBeVisible();
  21 |     await expect(page.locator('.cart-badge')).toHaveText('1');
  22 | 
  23 |     // Go to cart page
  24 |     await page.locator('.cart-btn').click();
  25 |     await expect(page).toHaveURL('/cart');
  26 | 
  27 |     // Verify item in cart
  28 |     await expect(page.locator('h1')).toContainText('Shopping Cart');
  29 |     await expect(page.locator('.group h3')).toHaveText(productName);
  30 |     
  31 |     // Verify total calculation
  32 |     const total = await page.locator('.text-3xl.font-black').innerText();
  33 |     // Total should be >= product price (might have shipping/tax)
  34 |     const numericTotal = parseFloat(total.replace('$', ''));
  35 |     const numericPrice = parseFloat(productPrice.replace('$', ''));
  36 |     expect(numericTotal).toBeGreaterThanOrEqual(numericPrice);
  37 |   });
  38 | 
  39 |   test('should increase and decrease quantity in cart', async ({ page }) => {
  40 |     await page.locator('.add-to-cart-btn').first().click();
  41 |     await page.locator('.cart-btn').click();
  42 | 
  43 |     const quantity = page.locator('.w-10.text-center');
  44 |     await expect(quantity).toHaveText('1');
  45 | 
  46 |     // Add another of same item
  47 |     await page.locator('button[aria-label="Increase quantity"]').click();
  48 |     await expect(quantity).toHaveText('2');
  49 | 
  50 |     // Remove one
  51 |     await page.locator('button[aria-label="Decrease quantity"]').click();
> 52 |     await expect(quantity).toHaveText('1');
     |                            ^ Error: expect(locator).toHaveText(expected) failed
  53 |   });
  54 | });
  55 | 
```