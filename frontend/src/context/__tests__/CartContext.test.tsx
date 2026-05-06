import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from '../CartContext';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test',
  price: 100,
  category: 'Test',
  imageUrl: 'test.jpg',
  stock: 10,
  createdAt: '',
  updatedAt: '',
};

function TestComponent() {
  const { items, addToCart, removeFromCart, clearCart, getCartCount, getTotal } = useCart();
  return (
    <div>
      <div data-testid="count">{getCartCount()}</div>
      <div data-testid="total">{getTotal()}</div>
      <div data-testid="items-length">{items.length}</div>
      <button onClick={() => addToCart(mockProduct)}>Add</button>
      <button onClick={() => removeFromCart('1')}>Remove</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  );
}

describe('CartContext', () => {
  it('should add items, calculate totals, and remove items correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Initial state
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');

    // Add item
    act(() => {
      screen.getByText('Add').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('100');
    expect(screen.getByTestId('items-length').textContent).toBe('1');

    // Add same item again (quantity should increase)
    act(() => {
      screen.getByText('Add').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('total').textContent).toBe('200');
    expect(screen.getByTestId('items-length').textContent).toBe('1');

    // Remove item
    act(() => {
      screen.getByText('Remove').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
    expect(screen.getByTestId('items-length').textContent).toBe('0');
  });
});
