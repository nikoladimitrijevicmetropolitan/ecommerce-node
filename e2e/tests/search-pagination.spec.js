const { test, expect } = require('@playwright/test');

test.describe('Search and Pagination Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should search for products', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search products..."]');
    
    // Search for 'Headphones' (from seed)
    await searchInput.fill('Headphones');
    
    // Wait for debounce and API call
    await page.waitForTimeout(1000);
    
    const cards = page.locator('.product-card');
    const count = await cards.count();
    
    // In seed we have 'Sonic Headphones'
    expect(count).toBe(1);
    await expect(cards.first()).toContainText('Sonic Headphones');
  });

  test('should filter by category', async ({ page }) => {
    const categorySelect = page.locator('select').first();
    
    // Select 'Audio'
    await categorySelect.selectOption('Audio');
    
    // Wait for the grid to update
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(1, { timeout: 5000 });
    await expect(cards.first()).toContainText('Sonic Headphones');
  });

  test('should clear filters and show all products', async ({ page }) => {
    // First, apply a filter
    const categorySelect = page.locator('select').first();
    await categorySelect.selectOption('Audio');
    
    // Only 1 product should be visible
    await expect(page.locator('.product-card')).toHaveCount(1, { timeout: 5000 });

    // URL should reflect the filter
    expect(page.url()).toContain('category=Audio');

    // Click "Clear all filters"
    await categorySelect.selectOption('');
    
    // All products should be visible again
    const cards = page.locator('.product-card');
    await expect(cards).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);
  });
});
