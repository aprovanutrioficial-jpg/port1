import React, { useEffect, useState } from 'react';
import { X, Trash2, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';
import { gerarCheckoutURL } from '../services/checkout';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemoveItem }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Fix: Reset loading state when returning from checkout (BFCache/Back button)
  useEffect(() => {
    const handlePageShow = () => {
      setIsRedirecting(false);
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleProsseguirCompra = (e: React.MouseEvent) => {
    // 1. Interceptar clique e prevenir redirecionamento imediato
    e.preventDefault();

    if (cart.length === 0) {
      alert("Selecione pelo menos um produto");
      return;
    }

    setIsRedirecting(true);

    // 3. Aguardar 500ms e realizar redirecionamento manual
    setTimeout(() => {
      const checkoutUrl = gerarCheckoutURL(cart);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setIsRedirecting(false);
      }
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-emerald-950/90 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 pb-24 sm:pb-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Seu Carrinho</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-emerald-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-emerald-500/50">
                <p>Seu carrinho está vazio.</p>
                <Button variant="glass" onClick={onClose} className="mt-4 text-sm">
                  Começar a comprar
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                  <img src={item.imageUrl} alt={item.title} className="w-24 aspect-[1000/570] object-cover rounded-lg" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-brand-yellow font-semibold mt-1">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-400">Qtd: {item.quantity}</span>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                        disabled={isRedirecting}
                      >
                        <Trash2 size={12} /> Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 pt-6 mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400">Total</span>
                <span className="text-2xl font-bold text-brand-yellow">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <Button 
                variant="primary" 
                onClick={handleProsseguirCompra} 
                className="w-full py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                id="finalizar-compra"
                disabled={isRedirecting}
              >
                {isRedirecting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Redirecionando...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} /> Prosseguir para compra
                  </>
                )}
              </Button>

              <Button 
                variant="glass" 
                onClick={onClose} 
                disabled={isRedirecting}
                className="w-full py-3 text-sm text-emerald-400 hover:text-white !bg-white/5 hover:!bg-white/10 border-transparent"
              >
                <ArrowLeft size={16} /> Ver mais produtos
              </Button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};