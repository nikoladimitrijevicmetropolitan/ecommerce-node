import express, { Request, Response } from 'express';
import Product from './models/Product';

const app = express();

app.use(express.json());

// Get all products
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by id
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default app;
