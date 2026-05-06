const { Op } = require('sequelize');
const Product = require('../models/Product');

const ALLOWED_SORT_FIELDS = ['name', 'price', 'createdAt', 'category'];
const ALLOWED_SORT_ORDERS = ['ASC', 'DESC'];

async function getProducts(params = {}) {
  const page = Math.max(params.page || 1, 1);
  const limit = Math.min(Math.max(params.limit || 8, 1), 100);
  const search = params.search || '';
  const category = params.category || '';

  const sortBy = ALLOWED_SORT_FIELDS.includes(params.sortBy || '')
    ? params.sortBy
    : 'createdAt';
  const sortOrder = ALLOWED_SORT_ORDERS.includes((params.sortOrder || '').toUpperCase())
    ? params.sortOrder.toUpperCase()
    : 'DESC';

  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }
  if (category) {
    where.category = category;
  }

  const order = [[sortBy, sortOrder]];

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  console.log(`[DEBUG] getProducts: search="${search}", category="${category}", where=${JSON.stringify(where)}, total=${count}`);

  return {
    data: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}

async function getProductById(id) {
  return Product.findByPk(id);
}

module.exports = { getProducts, getProductById };
