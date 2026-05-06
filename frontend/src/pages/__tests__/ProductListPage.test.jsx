import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductListPage } from '../ProductListPage';
import { api } from '../../services/api';
import { CartProvider } from '../../context/CartContext';

// Mock the API service
vi.mock('../../services/api', () => ({
  api: {
    products: {
      getAll: vi.fn(),
    },
  },
}));

const mockPaginatedResponse = {
  data: [
    {
      id: '1',
      name: 'Test Product',
      description: 'Test',
      price: 100,
      category: 'Electronics',
      imageUrl: 'test.jpg',
      stock: 10,
    },
  ],
  total: 1,
  page: 1,
  totalPages: 1,
};

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    api.products.getAll.mockReturnValue(new Promise(() => {})); // Never resolves
    
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </CartProvider>
    );

    // Should show loading spinner
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders products after successful fetch', async () => {
    api.products.getAll.mockResolvedValue(mockPaginatedResponse);

    render(
      <CartProvider>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Found 1 products')).toBeInTheDocument();
  });
});
