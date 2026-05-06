import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await api.products.getById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found or failed to load.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="error-container glass-panel">
          <h2>Oops!</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page container">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to collection</span>
      </Link>

      <div className="product-detail-grid">
        <div className="product-image-section animate-fade-in">
          <div className="glass-panel main-image-container">
            <img src={product.imageUrl} alt={product.name} className="detail-image" />
            <div className="detail-category">{product.category}</div>
          </div>
        </div>

        <div className="product-info-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          
          <div className="detail-description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <ShieldCheck className="feature-icon" />
              <span>2 Year Premium Warranty</span>
            </div>
            <div className="feature-item">
              <Truck className="feature-icon" />
              <span>Free Express Delivery</span>
            </div>
          </div>

          <div className="action-section glass-panel">
            <div className="stock-info">
              <span className={`status-dot ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}></span>
              <span>{product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}</span>
            </div>
            
            <button 
              className="btn btn-primary buy-btn"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={20} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
