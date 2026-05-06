# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search-pagination.spec.js >> Search and Pagination Flow >> should filter by category
- Location: tests\search-pagination.spec.js:25:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.product-card').first()
Expected substring: "Sonic Headphones"
Received string:    "AudioBeta Headphones$250.0010 in stock"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.product-card').first()
    9 × locator resolved to <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div>
      - unexpected value "AudioBeta Headphones$250.0010 in stock"

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
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]:
            - img [ref=e18]
            - textbox "Search products..." [ref=e21]
          - generic [ref=e22]:
            - generic [ref=e23]:
              - img [ref=e24]
              - combobox [ref=e25]:
                - option "All Categories"
                - option "Electronics"
                - option "Audio" [selected]
                - option "Wearables"
                - option "Accessories"
            - combobox [ref=e26]:
              - option "Newest" [selected]
              - 'option "Price: Low to High"'
              - 'option "Price: High to Low"'
              - 'option "Name: A-Z"'
        - generic [ref=e27]:
          - paragraph [ref=e28]: Found 1 products
          - button "Clear all filters" [ref=e29]
      - generic [ref=e31]:
        - link "Beta Headphones Audio" [ref=e32] [cursor=pointer]:
          - /url: /products/c8e5f09f-f39e-47bd-8bfc-4ed30aecf78f
          - img "Beta Headphones" [ref=e33]
          - generic [ref=e34]: Audio
        - generic [ref=e35]:
          - link "Beta Headphones" [ref=e36] [cursor=pointer]:
            - /url: /products/c8e5f09f-f39e-47bd-8bfc-4ed30aecf78f
            - heading "Beta Headphones" [level=3] [ref=e37]
          - paragraph [ref=e38]: $250.00
          - generic [ref=e39]:
            - generic [ref=e40]: 10 in stock
            - button "Add to cart" [ref=e41]:
              - img [ref=e42]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Search and Pagination Flow', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |   });
  7  | 
  8  |   test('should search for products', async ({ page }) => {
  9  |     const searchInput = page.locator('input[placeholder="Search products..."]');
  10 |     
  11 |     // Search for 'Headphones' (from seed)
  12 |     await searchInput.fill('Headphones');
  13 |     
  14 |     // Wait for debounce and API call
  15 |     await page.waitForTimeout(1000);
  16 |     
  17 |     const cards = page.locator('.product-card');
  18 |     const count = await cards.count();
  19 |     
  20 |     // In seed we have 'Sonic Headphones'
  21 |     expect(count).toBe(1);
  22 |     await expect(cards.first()).toContainText('Sonic Headphones');
  23 |   });
  24 | 
  25 |   test('should filter by category', async ({ page }) => {
  26 |     const categorySelect = page.locator('select').first();
  27 |     
  28 |     // Select 'Audio'
  29 |     await categorySelect.selectOption('Audio');
  30 |     
  31 |     // Wait for the grid to update
  32 |     const cards = page.locator('.product-card');
  33 |     await expect(cards).toHaveCount(1, { timeout: 5000 });
> 34 |     await expect(cards.first()).toContainText('Sonic Headphones');
     |                                 ^ Error: expect(locator).toContainText(expected) failed
  35 |   });
  36 | 
  37 |   test('should clear filters and show all products', async ({ page }) => {
  38 |     // First, apply a filter
  39 |     const categorySelect = page.locator('select').first();
  40 |     await categorySelect.selectOption('Audio');
  41 |     
  42 |     // Only 1 product should be visible
  43 |     await expect(page.locator('.product-card')).toHaveCount(1, { timeout: 5000 });
  44 | 
  45 |     // URL should reflect the filter
  46 |     expect(page.url()).toContain('category=Audio');
  47 | 
  48 |     // Click "Clear all filters"
  49 |     await categorySelect.selectOption('');
  50 |     
  51 |     // All products should be visible again
  52 |     const cards = page.locator('.product-card');
  53 |     await expect(cards).toBeVisible();
  54 |     const count = await cards.count();
  55 |     expect(count).toBeGreaterThan(1);
  56 |   });
  57 | });
  58 | 
```