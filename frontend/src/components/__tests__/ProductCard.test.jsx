import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../ProductCard';
import { CartProvider } from '../../context/CartContext';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'A great product',
  price: 99.99,
  category: 'Electronics',
  imageUrl: 'https://example.com/image.jpg',
  stock: 10,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('10 in stock')).toBeInTheDocument();
  });

  it('renders out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductCard product={outOfStockProduct} />
        </BrowserRouter>
      </CartProvider>
    );

    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    const addButton = screen.getByLabelText('Add to cart');
    expect(addButton).toBeDisabled();
  });
});
