import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductListPage } from '../ProductListPage';
import { MemoryRouter } from 'react-router-dom';
import { api } from '../../services/api';
import { CartProvider } from '../../context/CartContext';
import type { Product, PaginatedResponse } from '../../types';

// Mock the API service
vi.mock('../../services/api', () => ({
  api: {
    products: {
      getAll: vi.fn(),
    },
  },
}));

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vibe Phone',
    description: 'Sleek phone',
    price: 699,
    category: 'Mobile',
    imageUrl: 'phone.jpg',
    stock: 10,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Vibe Watch',
    description: 'Smart watch',
    price: 299,
    category: 'Wearables',
    imageUrl: 'watch.jpg',
    stock: 0,
    createdAt: '',
    updatedAt: '',
  },
];

const mockResponse: PaginatedResponse<Product> = {
  data: mockProducts,
  total: 2,
  page: 1,
  totalPages: 1,
};

describe('ProductListPage', () => {
  it('shows loading spinner then displays products', async () => {
    vi.mocked(api.products.getAll).mockResolvedValue(mockResponse);

    render(
      <CartProvider>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </CartProvider>
    );

    // Should show header
    expect(screen.getByText(/Discover/)).toBeInTheDocument();
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Vibe Phone')).toBeInTheDocument();
    });

    expect(screen.getByText('Vibe Watch')).toBeInTheDocument();
    expect(screen.getByText('$699.00')).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    vi.mocked(api.products.getAll).mockRejectedValue(new Error('API Error'));

    render(
      <CartProvider>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/)).toBeInTheDocument();
    });
  });
});
