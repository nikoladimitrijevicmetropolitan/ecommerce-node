import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../Navbar';
import { CartProvider } from '../../context/CartContext';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ShoppingBag: () => <div data-testid="shopping-bag" />,
  Menu: () => <div data-testid="menu" />,
}));

describe('Navbar', () => {
  it('renders brand name and navigation links', () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </CartProvider>
    );

    expect(screen.getByText('VIBE')).toBeInTheDocument();
    expect(screen.getByTestId('shopping-bag')).toBeInTheDocument();
  });
});
