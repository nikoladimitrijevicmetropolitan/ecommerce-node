import express, { Request, Response } from 'express';
import Product from './models/Product';
import { Op, OrderItem } from 'sequelize';

const app = express();

app.use(express.json());

// Get all products with pagination, search and filters
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || '';
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const sortOrder = (req.query.sortOrder as string) || 'DESC';

    const offset = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }
    if (category) {
      where.category = category;
    }

    const order: OrderItem[] = [[sortBy, sortOrder]];

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    res.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('API Error:', error);
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
