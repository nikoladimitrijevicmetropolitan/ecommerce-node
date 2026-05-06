import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link somehow
    addToCart(product);
  };

  return (
    <div className="product-card glass-panel animate-fade-in">
      <Link to={`/products/${product.id}`} className="product-image-wrapper">
        <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
        <div className="category-badge">{product.category}</div>
      </Link>
      
      <div className="product-info">
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <div className="product-actions">
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          <button 
            className="btn btn-primary add-to-cart-btn"
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
