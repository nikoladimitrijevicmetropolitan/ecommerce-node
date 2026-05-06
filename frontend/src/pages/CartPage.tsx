import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, removeFromCart, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
        <div className="max-w-md w-full p-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-center shadow-xl">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Looks like you haven't added any premium gear yet.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <ArrowLeft size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container mx-auto px-4 py-8">
      <header className="page-header mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your <span className="text-gradient">Cart</span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="cart-item group flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-100 dark:bg-slate-900" />
              <div className="flex-grow px-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{item.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">Qty: {item.quantity}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <p className="text-xl font-black text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  className="btn-icon p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-all" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-2xl shadow-slate-900/40 sticky top-24">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
          <div className="flex justify-between mb-4 text-slate-400">
            <span>Subtotal</span>
            <span className="text-white font-medium">${getTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-slate-400">
            <span>Shipping</span>
            <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest mt-1">Free</span>
          </div>
          <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
            <span className="text-slate-400">Total</span>
            <span className="text-3xl font-black">${getTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]" onClick={() => {
            alert('Checkout successful! (Demo)');
            clearCart();
          }}>
            <CreditCard size={20} /> Proceed to Checkout
          </button>
          <Link to="/" className="flex justify-center items-center gap-2 mt-6 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
