import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Oops!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page container mx-auto px-4 py-8">
      <Link to="/" className="back-link inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="product-image-section animate-in fade-in duration-500">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/50">
              {product.category}
            </div>
          </div>
        </div>

        <div className="product-info-section flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
          <h1 className="detail-title text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            {product.name}
          </h1>
          <p className="detail-price text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">About this item</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <ShieldCheck className="text-blue-500" />
              <span>2 Year Premium Warranty</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <Truck className="text-blue-500" />
              <span>Free Express Delivery</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 font-bold">
              <span className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`}></span>
              <span className={product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </span>
            </div>
            
            <button 
              className="buy-btn w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={22} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
