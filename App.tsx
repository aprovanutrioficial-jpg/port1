import React, { useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Product, CartItem } from './types';
import { Loader2 } from 'lucide-react';

// Lazy load pages to reduce initial bundle size
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));

// Optimization: Lazy load CartDrawer. It is hidden initially, so we don't need its JS immediately.
const CartDrawer = React.lazy(() => import('./components/CartDrawer').then(module => ({ default: module.CartDrawer })));

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper function to update cart state
  const updateCartState = (product: Product) => {
    // PROMO: Force price based on product ID
    const isComboPortugues = product.id === '207511512';
    const promoPrice = isComboPortugues ? 27.00 : 10.00;
    
    const promoProduct = { ...product, price: promoPrice };

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Limit to 1 unit per product: if exists, do not increment.
        return prev;
      }
      return [...prev, { ...promoProduct, quantity: 1 }];
    });
  };

  // Action: Add to Cart (Silent add, update counter)
  const handleAddToCart = (product: Product) => {
    updateCartState(product);
    // Optional: Could add a toast notification here
  };

  // Action: Buy Now (Add and Open Cart, or Redirect if external checkout exists)
  const handleBuyNow = (product: Product) => {
    if (product.checkoutUrl) {
      window.location.href = product.checkoutUrl;
      return;
    }
    updateCartState(product);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Loading Fallback Component
  const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#01140e]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-yellow animate-spin" />
        <p className="text-emerald-200 text-sm animate-pulse">Carregando...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#01140e] text-white font-sans selection:bg-brand-green selection:text-white">
      <Navbar 
        cart={cart} 
        onToggleCart={() => setIsCartOpen(!isCartOpen)} 
      />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onAddToCart={handleAddToCart} 
                  onBuyNow={handleBuyNow} 
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  onAddToCart={handleAddToCart} 
                  onBuyNow={handleBuyNow} 
                />
              } 
            />
          </Routes>
        </Suspense>
      </main>

      <footer className="py-8 text-center text-emerald-400/50 text-sm border-t border-white/5 bg-black/20">
        <p>&copy; AprovaPortuguês. Todos os direitos reservados.</p>
      </footer>

      {/* Overlays - Wrapped in Suspense to allow lazy loading without blocking main UI */}
      <Suspense fallback={null}>
        {/* Only render if open or if we want to prefetch on hover, but here simple conditional rendering 
            plus the lazy import at top ensures the bundle is split. 
            Keeping it always mounted but lazy ensures it loads after main content.
        */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemoveItem={removeFromCart}
        />
      </Suspense>
    </div>
  );
};

export default App;