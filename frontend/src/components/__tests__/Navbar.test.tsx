import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from '../Navbar';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../../context/CartContext';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test',
  description: 'Test',
  price: 100,
  category: 'Test',
  imageUrl: 'test.jpg',
  stock: 10,
  createdAt: '',
  updatedAt: '',
};

// Helper component da dodamo proizvod u korpu spolja
function TestWrapper() {
  const { addToCart } = useCart();
  return (
    <>
      <Navbar />
      <button onClick={() => addToCart(mockProduct)}>Add Item</button>
    </>
  );
}

describe('Navbar Component', () => {
  it('updates cart badge when items are added to cart', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <TestWrapper />
        </MemoryRouter>
      </CartProvider>
    );

    // Initial state: badge shouldn't exist if count is 0
    expect(screen.queryByText('1')).not.toBeInTheDocument();

    // Add item
    act(() => {
      screen.getByText('Add Item').click();
    });

    // Badge should show 1
    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('cart-badge');
  });
});
