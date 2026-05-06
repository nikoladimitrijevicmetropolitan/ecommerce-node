// const { describe, it, expect, beforeAll } = require('vitest');
const request = require('supertest');
const app = require('../app');
const sequelize = require('../models');
const Product = require('../models/Product');

describe('Product API Integration Tests', () => {
  let testProductId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const products = await Promise.all([
      Product.create({
        name: 'Alpha Laptop',
        description: 'A laptop for testing',
        price: 1200,
        category: 'Electronics',
        imageUrl: 'http://example.com/laptop.png',
        stock: 5,
      }),
      Product.create({
        name: 'Beta Headphones',
        description: 'Headphones for testing',
        price: 250,
        category: 'Audio',
        imageUrl: 'http://example.com/headphones.png',
        stock: 10,
      }),
      Product.create({
        name: 'Gamma Watch',
        description: 'A watch for testing',
        price: 199,
        category: 'Wearables',
        imageUrl: 'http://example.com/watch.png',
        stock: 0,
      }),
    ]);
    testProductId = products[0].id;
  });

  describe('GET /api/products', () => {
    it('should return paginated response with correct structure', async () => {
      const response = await request(app).get('/api/products');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('totalPages');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should paginate with limit and page params', async () => {
      const response = await request(app).get('/api/products?limit=2&page=1');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.total).toBe(3);
      expect(response.body.totalPages).toBe(2);

      const page2 = await request(app).get('/api/products?limit=2&page=2');
      expect(page2.body.data).toHaveLength(1);
      expect(page2.body.page).toBe(2);
    });

    it('should filter by search term', async () => {
      const response = await request(app).get('/api/products?search=Laptop');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toContain('Laptop');
    });

    it('should filter by category', async () => {
      const response = await request(app).get('/api/products?category=Audio');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Audio');
    });

    it('should sort by price ascending', async () => {
      const response = await request(app).get('/api/products?sortBy=price&sortOrder=ASC');
      expect(response.status).toBe(200);
      const prices = response.body.data.map((p) => p.price);
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    it('should default to page 1 when invalid page is given', async () => {
      const response = await request(app).get('/api/products?page=0');
      expect(response.status).toBe(200);
      expect(response.body.page).toBe(1);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a specific product when a valid id is provided', async () => {
      const response = await request(app).get(`/api/products/${testProductId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testProductId);
      expect(response.body).toHaveProperty('name', 'Alpha Laptop');
    });

    it('should return 404 when product is not found', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).get(`/api/products/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Product not found');
    });
  });
});
