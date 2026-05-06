import { test, expect } from '@playwright/test';

test.describe('Search and Pagination Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the grid to appear
    await expect(page.locator('.product-grid')).toBeVisible({ timeout: 15000 });
  });

  test('should search for products', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search gear..."]');
    
    // Type a specific product name from seed (e.g., 'Laptop')
    await searchInput.fill('Laptop');
    
    // Wait for debounced search (500ms) and API response
    // We expect only 1 product to match 'Laptop'
    await page.waitForTimeout(1000); 
    
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Laptop');
  });

  test('should filter by category', async ({ page }) => {
    const categorySelect = page.locator('select').first();
    
    // Select 'Audio'
    await categorySelect.selectOption('Audio');
    
    // Wait for the grid to update — Playwright retries automatically with expect
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(1, { timeout: 5000 });
    await expect(cards.first()).toContainText('Sonic Headphones');
  });

  test('should clear filters and show all products', async ({ page }) => {
    // First, apply a filter
    const categorySelect = page.locator('select').first();
    await categorySelect.selectOption('Audio');
    await page.waitForTimeout(1000);
    
    // Only 1 product should be visible
    await expect(page.locator('.product-card')).toHaveCount(1);

    // URL should reflect the filter
    expect(page.url()).toContain('category=Audio');

    // Click "Clear all filters" — we need to reset manually via select
    await categorySelect.selectOption('');
    await page.waitForTimeout(1000);
    
    // All products should be visible again
    const cards = page.locator('.product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);
  });
});
