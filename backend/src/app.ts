import express from 'express';
import productRoutes from './routes/product.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

export default app;
