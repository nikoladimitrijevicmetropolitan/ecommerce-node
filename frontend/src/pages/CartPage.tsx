import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import './CartPage.css';

export function CartPage() {
  const { items, removeFromCart, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <div className="glass-panel text-center p-8">
          <h2>Your cart is empty</h2>
          <p className="subtitle">Looks like you haven't added any premium gear yet.</p>
          <Link to="/" className="btn btn-primary mt-6">
            <ArrowLeft size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <header className="page-header animate-fade-in">
        <h1>Your <span className="text-gradient">Cart</span></h1>
      </header>

      <div className="cart-grid">
        <div className="cart-items animate-fade-in">
          {items.map((item) => (
            <div key={item.id} className="cart-item glass-panel">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  className="btn-icon text-danger" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={() => {
            alert('Checkout successful! (Demo)');
            clearCart();
          }}>
            <CreditCard size={20} /> Proceed to Checkout
          </button>
          <Link to="/" className="back-link mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
