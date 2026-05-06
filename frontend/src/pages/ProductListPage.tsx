import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product, PaginatedResponse } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Pagination } from '../components/Pagination';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Read params from URL
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';

  // Categories list (usually would come from API, but hardcoded for simplicity)
  const categories = ['Electronics', 'Audio', 'Wearables', 'Accessories'];

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.products.getAll({
        page,
        limit: 8,
        search,
        category,
        sortBy,
        sortOrder: 'DESC'
      });
      setData(response);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, category, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 on filter change
    if (key !== 'page') {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  // Debounced search handler
  const [searchTerm, setSearchTerm] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== search) {
        updateParam('search', searchTerm);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, search]);

  return (
    <div className="product-list-page container mx-auto px-4 py-8">
      <header className="page-header text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
          Discover <span className="text-gradient">Premium</span> Gear
        </h1>
      </header>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search gear..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <Filter size={16} className="text-slate-500" />
            <select 
              value={category} 
              onChange={(e) => updateParam('category', e.target.value)}
              className="bg-transparent text-sm font-medium outline-hidden cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select 
              value={sortBy} 
              onChange={(e) => updateParam('sortBy', e.target.value)}
              className="bg-transparent text-sm font-medium outline-hidden cursor-pointer"
            >
              <option value="createdAt">Newest</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="max-w-md mx-auto p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center shadow-xl">
          <p className="text-rose-500 font-bold text-lg mb-6">{error}</p>
          <button 
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            onClick={() => fetchProducts()}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          {data.data.length > 0 ? (
            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-in fade-in duration-700">
              {data.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-2xl font-bold text-slate-400">No products found matching your criteria.</p>
              <button 
                className="mt-6 text-blue-600 font-bold hover:underline"
                onClick={() => setSearchParams({})}
              >
                Clear all filters
              </button>
            </div>
          )}

          <Pagination 
            currentPage={data.page} 
            totalPages={data.totalPages} 
            onPageChange={(p) => updateParam('page', p.toString())} 
          />
        </>
      )}
    </div>
  );
}
