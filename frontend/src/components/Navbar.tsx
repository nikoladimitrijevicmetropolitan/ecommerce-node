import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="navbar sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="navbar-logo flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-gradient">VIBE</span>
        </Link>
        
        <div className="navbar-search hidden md:flex items-center relative w-full max-w-md mx-8">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-hidden"
          />
        </div>
        
        <div className="navbar-actions flex items-center gap-2">
          <button className="p-2 text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Search size={22} />
          </button>
          
          <Link to="/cart" className="cart-btn relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
            {count > 0 && (
              <span className="cart-badge absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {count}
              </span>
            )}
          </Link>
          
          <button className="p-2 text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
