import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
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
          <button className="icon-btn cart-btn">
            <ShoppingBag size={22} />
            <span className="cart-badge">0</span>
          </button>
          <button className="icon-btn hidden-desktop">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
