import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { CartItem } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cart: CartItem[];
  onToggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onToggleCart }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Pequeno delay para permitir a renderização da Home antes do scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-lg flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={handleScrollToTop}>
          <img 
            src="https://i.imgur.com/3zvMl7k.png" 
            alt="AprovaPortuguês Logo" 
            className="w-8 h-8 object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            AprovaPortuguês
          </span>
          {/* Mobile Logo Text */}
          <span className="text-xl font-bold tracking-tight text-white sm:hidden">
            AprovaPortuguês
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={handleScrollToTop}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            Início
          </button>
          <button 
            onClick={() => handleScroll('products')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            Catálogo
          </button>
          <button 
            onClick={() => handleScroll('faq')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleScroll('contact')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            Contato
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleCart}
            className="relative p-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all group"
            aria-label="Cart"
          >
            <ShoppingCart size={20} className="group-hover:text-brand-yellow transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-green text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-slate-900">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="hidden p-2 text-slate-300">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};