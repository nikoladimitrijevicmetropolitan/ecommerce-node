import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await productService.getProducts({
      page: parseInt(req.query.page as string) || undefined,
      limit: parseInt(req.query.limit as string) || undefined,
      search: req.query.search as string,
      category: req.query.category as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });
    res.json(result);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await productService.getProductById(req.params.id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}
