import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.products.getById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      <Link to="/" className="text-blue-600 hover:underline">Back to products</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div 
                key={i}
                className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  activeImage === i ? 'border-blue-600' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                onClick={() => setActiveImage(i)}
              >
                <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 ml-2">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.8</span>
                <span className="text-xs text-slate-400 font-normal">(120 reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              className="flex-grow flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-[0.98]"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={22} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl font-bold transition-all">
              Save for later
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">2 Year Warranty</h4>
                <p className="text-xs text-slate-500">Full manufacturer protection</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Free Delivery</h4>
                <p className="text-xs text-slate-500">On all orders over $100</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <RotateCcw size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">30-Day Returns</h4>
                <p className="text-xs text-slate-500">Hassle-free return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
