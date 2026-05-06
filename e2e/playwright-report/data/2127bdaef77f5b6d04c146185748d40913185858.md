# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search-pagination.spec.js >> Search and Pagination Flow >> should clear filters and show all products
- Location: tests\search-pagination.spec.js:37:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.product-card')
Expected: visible
Error: strict mode violation: locator('.product-card') resolved to 5 elements:
    1) <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div> aka getByText('AccessoriesGaming Mouse$45.')
    2) <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div> aka getByText('AccessoriesMechanical')
    3) <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div> aka getByText('WearablesSmart Watch Pro$199.')
    4) <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div> aka getByText('AudioSonic Headphones$250.')
    5) <div class="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">…</div> aka getByText('ElectronicsVibe Sleek Laptop$')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.product-card')

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
                - option "All Categories" [selected]
                - option "Electronics"
                - option "Audio"
                - option "Wearables"
                - option "Accessories"
            - combobox [ref=e26]:
              - option "Newest" [selected]
              - 'option "Price: Low to High"'
              - 'option "Price: High to Low"'
              - 'option "Name: A-Z"'
        - paragraph [ref=e28]: Found 5 products
      - generic [ref=e29]:
        - generic [ref=e30]:
          - link "Gaming Mouse Accessories" [ref=e31] [cursor=pointer]:
            - /url: /products/7f6687b0-b36f-4434-b764-98dbc3ff8c2e
            - img "Gaming Mouse" [ref=e32]
            - generic [ref=e33]: Accessories
          - generic [ref=e34]:
            - link "Gaming Mouse" [ref=e35] [cursor=pointer]:
              - /url: /products/7f6687b0-b36f-4434-b764-98dbc3ff8c2e
              - heading "Gaming Mouse" [level=3] [ref=e36]
            - paragraph [ref=e37]: $45.00
            - generic [ref=e38]:
              - generic [ref=e39]: 30 in stock
              - button "Add to cart" [ref=e40]:
                - img [ref=e41]
        - generic [ref=e45]:
          - link "Mechanical Keyboard Accessories" [ref=e46] [cursor=pointer]:
            - /url: /products/1e73fe5f-a2fa-4f6c-8298-f98816c5c62e
            - img "Mechanical Keyboard" [ref=e47]
            - generic [ref=e48]: Accessories
          - generic [ref=e49]:
            - link "Mechanical Keyboard" [ref=e50] [cursor=pointer]:
              - /url: /products/1e73fe5f-a2fa-4f6c-8298-f98816c5c62e
              - heading "Mechanical Keyboard" [level=3] [ref=e51]
            - paragraph [ref=e52]: $85.00
            - generic [ref=e53]:
              - generic [ref=e54]: 15 in stock
              - button "Add to cart" [ref=e55]:
                - img [ref=e56]
        - generic [ref=e60]:
          - link "Smart Watch Pro Wearables" [ref=e61] [cursor=pointer]:
            - /url: /products/cd12c637-cd84-4ce0-b7b5-1980fb2a9510
            - img "Smart Watch Pro" [ref=e62]
            - generic [ref=e63]: Wearables
          - generic [ref=e64]:
            - link "Smart Watch Pro" [ref=e65] [cursor=pointer]:
              - /url: /products/cd12c637-cd84-4ce0-b7b5-1980fb2a9510
              - heading "Smart Watch Pro" [level=3] [ref=e66]
            - paragraph [ref=e67]: $199.99
            - generic [ref=e68]:
              - generic [ref=e69]: 50 in stock
              - button "Add to cart" [ref=e70]:
                - img [ref=e71]
        - generic [ref=e75]:
          - link "Sonic Headphones Audio" [ref=e76] [cursor=pointer]:
            - /url: /products/a284c4ae-631e-4cb1-bf5e-179fbd4b7a1c
            - img "Sonic Headphones" [ref=e77]
            - generic [ref=e78]: Audio
          - generic [ref=e79]:
            - link "Sonic Headphones" [ref=e80] [cursor=pointer]:
              - /url: /products/a284c4ae-631e-4cb1-bf5e-179fbd4b7a1c
              - heading "Sonic Headphones" [level=3] [ref=e81]
            - paragraph [ref=e82]: $250.50
            - generic [ref=e83]:
              - generic [ref=e84]: 25 in stock
              - button "Add to cart" [ref=e85]:
                - img [ref=e86]
        - generic [ref=e90]:
          - link "Vibe Sleek Laptop Electronics" [ref=e91] [cursor=pointer]:
            - /url: /products/71f51e28-bc1b-4de5-979c-694579f72230
            - img "Vibe Sleek Laptop" [ref=e92]
            - generic [ref=e93]: Electronics
          - generic [ref=e94]:
            - link "Vibe Sleek Laptop" [ref=e95] [cursor=pointer]:
              - /url: /products/71f51e28-bc1b-4de5-979c-694579f72230
              - heading "Vibe Sleek Laptop" [level=3] [ref=e96]
            - paragraph [ref=e97]: $1200.00
            - generic [ref=e98]:
              - generic [ref=e99]: 10 in stock
              - button "Add to cart" [ref=e100]:
                - img [ref=e101]
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
  34 |     await expect(cards.first()).toContainText('Sonic Headphones');
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
> 53 |     await expect(cards).toBeVisible();
     |                         ^ Error: expect(locator).toBeVisible() failed
  54 |     const count = await cards.count();
  55 |     expect(count).toBeGreaterThan(1);
  56 |   });
  57 | });
  58 | 
```