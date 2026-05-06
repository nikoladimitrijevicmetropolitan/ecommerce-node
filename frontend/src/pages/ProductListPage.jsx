import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, PackageX } from 'lucide-react';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';

const categories = ['Electronics', 'Audio', 'Wearables', 'Accessories'];

export function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState({ total: 0, totalPages: 0 });
  
  // URL state
  const query = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'DESC';

  // Local state for debounced search
  const [searchTerm, setSearchTerm] = useState(query);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.products.getAll({
        page,
        limit: 8,
        search: query,
        category,
        sortBy,
        sortOrder
      });
      setProducts(response.data);
      setMetadata({ total: response.total, totalPages: response.totalPages });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, query, category, sortBy, sortOrder]);

  // Debounce search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== query) {
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm) {
          newParams.set('search', searchTerm);
        } else {
          newParams.delete('search');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    updateParam('page', newPage.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-hidden"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={category}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    newParams.set('category', e.target.value);
                  } else {
                    newParams.delete('category');
                  }
                  newParams.set('page', '1');
                  setSearchParams(newParams);
                }}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-hidden appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSort, newOrder] = e.target.value.split('-');
                const newParams = new URLSearchParams(searchParams);
                newParams.set('sortBy', newSort);
                newParams.set('sortOrder', newOrder);
                setSearchParams(newParams);
              }}
              className="pl-4 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-hidden appearance-none"
            >
              <option value="createdAt-DESC">Newest</option>
              <option value="price-ASC">Price: Low to High</option>
              <option value="price-DESC">Price: High to Low</option>
              <option value="name-ASC">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Found {metadata.total} products
          </p>
          {(query || category) && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSearchParams({});
              }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <LoadingSpinner />
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <Pagination 
            currentPage={page} 
            totalPages={metadata.totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <PackageX size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">No products found</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
