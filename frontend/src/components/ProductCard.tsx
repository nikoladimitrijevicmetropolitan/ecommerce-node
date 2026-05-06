import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/products/${product.id}`} className="product-image-wrapper relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50">
          {product.category}
        </div>
      </Link>
      
      <div className="product-info p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:text-blue-500 transition-colors">
          <h3 className="product-title font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="product-price text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">${product.price.toFixed(2)}</p>
        
        <div className="product-actions mt-auto pt-4 flex items-center justify-between">
          <span className={`stock-status text-xs font-medium ${product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          <button 
            className="add-to-cart-btn p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full shadow-md hover:shadow-lg disabled:shadow-none transition-all"
            disabled={product.stock === 0}
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
