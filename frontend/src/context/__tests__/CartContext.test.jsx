import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from '../CartContext';

const mockProduct = {
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

const secondProduct = {
  id: '2',
  name: 'Second Product',
  description: 'Test 2',
  price: 50,
  category: 'Test',
  imageUrl: 'test2.jpg',
  stock: 5,
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
      <button onClick={() => addToCart(secondProduct)}>Add Second</button>
      <button onClick={() => removeFromCart('1')}>Remove</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  );
}

describe('CartContext', () => {
  it('should start with an empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
    expect(screen.getByTestId('items-length').textContent).toBe('0');
  });

  it('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('100');
    expect(screen.getByTestId('items-length').textContent).toBe('1');
  });

  it('should increment quantity when adding the same item twice', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add').click();
    });
    act(() => {
      screen.getByText('Add').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('total').textContent).toBe('200');
    expect(screen.getByTestId('items-length').textContent).toBe('1');
  });

  it('should calculate total correctly with multiple different items', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add').click(); // $100
    });
    act(() => {
      screen.getByText('Add Second').click(); // $50
    });

    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('total').textContent).toBe('150');
    expect(screen.getByTestId('items-length').textContent).toBe('2');
  });

  it('should remove a specific item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add').click();
    });
    act(() => {
      screen.getByText('Add Second').click();
    });
    act(() => {
      screen.getByText('Remove').click(); // removes product id '1'
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('50');
    expect(screen.getByTestId('items-length').textContent).toBe('1');
  });

  it('should clear entire cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add').click();
    });
    act(() => {
      screen.getByText('Add Second').click();
    });
    act(() => {
      screen.getByText('Clear').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
    expect(screen.getByTestId('items-length').textContent).toBe('0');
  });

  it('should throw error when useCart is used outside CartProvider', () => {
    function BadComponent() {
      useCart();
      return <div />;
    }

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<BadComponent />)).toThrow(
      'useCart must be used within a CartProvider'
    );

    consoleSpy.mockRestore();
  });
});
