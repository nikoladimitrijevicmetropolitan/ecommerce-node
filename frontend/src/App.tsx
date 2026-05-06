import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
