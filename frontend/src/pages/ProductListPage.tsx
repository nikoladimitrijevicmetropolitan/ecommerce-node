import { useEffect, useState } from 'react';
import { Product } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import './ProductListPage.css';

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-page container">
      <header className="page-header animate-fade-in">
        <h1>Discover <span className="text-gradient">Premium</span> Gear</h1>
        <p className="subtitle">Elevate your vibe with our curated collection of high-end products.</p>
      </header>

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="error-container glass-panel">
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
