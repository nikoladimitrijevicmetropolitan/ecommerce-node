import { Op, OrderItem, WhereOptions } from 'sequelize';
import Product from '../models/Product';

const ALLOWED_SORT_FIELDS = ['name', 'price', 'createdAt', 'category'];
const ALLOWED_SORT_ORDERS = ['ASC', 'DESC'];

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getProducts(params: ProductQueryParams): Promise<PaginatedResult<Product>> {
  const page = Math.max(params.page || 1, 1);
  const limit = Math.min(Math.max(params.limit || 8, 1), 100);
  const search = params.search || '';
  const category = params.category || '';

  const sortBy = ALLOWED_SORT_FIELDS.includes(params.sortBy || '')
    ? params.sortBy!
    : 'createdAt';
  const sortOrder = ALLOWED_SORT_ORDERS.includes((params.sortOrder || '').toUpperCase())
    ? params.sortOrder!.toUpperCase()
    : 'DESC';

  const offset = (page - 1) * limit;

  const where: WhereOptions = {};
  if (search) {
    (where as any).name = { [Op.like]: `%${search}%` };
  }
  if (category) {
    (where as any).category = category;
  }

  const order: OrderItem[] = [[sortBy, sortOrder]];

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  return {
    data: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  return Product.findByPk(id);
}
