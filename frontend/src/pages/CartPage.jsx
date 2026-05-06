import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, removeFromCart, addToCart, getCartCount, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-slate-400" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our latest products and find something you love.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Start Shopping
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-10 tracking-tight flex items-center gap-4">
        Shopping Cart
        <span className="text-sm font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">
          {getCartCount()} items
        </span>
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="xl:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 transition-all hover:shadow-lg">
              <div className="flex gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-slate-500"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-slate-500"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-black text-lg text-slate-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sticky top-24 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span className="font-bold text-emerald-500">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Tax</span>
                <span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-900/20 dark:shadow-blue-600/20 active:scale-95 mb-6">
              <CreditCard size={22} />
              Checkout Now
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <ShieldCheck size={18} className="text-emerald-500" />
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
