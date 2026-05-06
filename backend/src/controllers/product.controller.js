const productService = require('../services/product.service');

async function getAllProducts(req, res) {
  try {
    console.log(`[DEBUG] Controller getAllProducts: query=${JSON.stringify(req.query)}`);
    const result = await productService.getProducts({
      page: parseInt(req.query.page) || undefined,
      limit: parseInt(req.query.limit) || undefined,
      search: req.query.search,
      category: req.query.category,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    });
    res.json(result);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

module.exports = { getAllProducts, getProductById };
