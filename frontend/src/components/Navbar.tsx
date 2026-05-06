import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export function Navbar() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="text-gradient">VIBE</span>
        </Link>
        
        <div className="navbar-search hidden-mobile">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search premium products..." />
        </div>
        
        <div className="navbar-actions">
          <button className="icon-btn hidden-desktop">
            <Search size={22} />
          </button>
          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingBag size={22} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
          <button className="icon-btn hidden-desktop">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
