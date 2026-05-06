import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '../ProductCard';
import { MemoryRouter } from 'react-router-dom';
import { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Laptop',
  description: 'Powerful test laptop',
  price: 999.99,
  category: 'Electronics',
  imageUrl: 'test-image.jpg',
  stock: 5,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Laptop')).toBeInTheDocument();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('5 in stock')).toBeInTheDocument();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Laptop');
  });

  it('shows out of stock when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <MemoryRouter>
        <ProductCard product={outOfStockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });
});
