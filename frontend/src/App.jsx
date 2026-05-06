import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
