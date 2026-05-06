import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import sequelize from '../models';
import Product from '../models/Product';

describe('Product API Integration Tests', () => {
  let testProductId: string;

  beforeAll(async () => {
    // Sync DB and clear data
    await sequelize.sync({ force: true });

    // Seed test data
    const product = await Product.create({
      name: 'Test Product',
      description: 'A product for testing',
      price: 10.99,
      category: 'Test Category',
      imageUrl: 'http://example.com/image.png',
      stock: 5,
    });
    testProductId = product.id;
  });

  describe('GET /api/products', () => {
    it('should return a list of products with 200 status code', async () => {
      const response = await request(app).get('/api/products');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('name', 'Test Product');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a specific product when a valid id is provided', async () => {
      const response = await request(app).get(`/api/products/${testProductId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testProductId);
      expect(response.body).toHaveProperty('name', 'Test Product');
    });

    it('should return 404 when product is not found', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).get(`/api/products/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Product not found');
    });
  });
});
