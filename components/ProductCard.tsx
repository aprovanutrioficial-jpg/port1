import React from 'react';
import { Star, ShoppingCart, FileText, ExternalLink, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

// Pix Icon SVG - Memoized to prevent re-creation
const PixIcon = React.memo(() => (
  <svg viewBox="0 0 48 48" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"></path>
    <path d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"></path>
    <path d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26C46.65,21.88,46.65,26.12,44.04,28.74z"></path>
  </svg>
));

// Using React.memo to prevent unnecessary re-renders of the list when cart state changes
export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onAddToCart, onBuyNow }) => {
  const navigate = useNavigate();

  // Logic to determine promo price
  const isComboPortugues = product.id === '207511512';
  
  let currentPrice = 10.00;
  if (isComboPortugues) currentPrice = 27.00;

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Navegar diretamente
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:bg-white/10 hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] hover:-translate-y-1 overflow-hidden flex flex-col h-full">
      
      {/* Decorative gradient blob behind card on hover - Optimized with hardware acceleration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl group-hover:bg-brand-green/40 transition-all duration-500 transform-gpu"></div>
      
      {/* Promo Badge */}
      <div className="absolute top-0 right-0 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-lg">
        R$ {currentPrice.toFixed(0)}
      </div>

      {/* Image Container */}
      <Link 
        to={`/product/${product.id}`} 
        onClick={handleViewProduct}
        className="block relative aspect-[1000/570] w-full overflow-hidden rounded-xl mb-4 bg-emerald-900/30 cursor-pointer"
      >
        {/* Performance Optimization: Lazy load offscreen images and async decode */}
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          loading="lazy"
          decoding="async"
          width="1000"
          height="570"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white/90 font-medium flex items-center gap-1 border border-white/10">
          <FileText size={12} /> PDF
        </div>
        
        {/* Hover Overlay with "View" */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="flex items-center gap-2 text-white font-medium px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
                <ExternalLink size={16} /> Ver Detalhes
            </span>
        </div>
      </Link>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 flex-grow">
        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              // Use Math.round to ensure 4.8+ looks like 5 stars
              className={`${i < Math.round(product.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-emerald-700'}`} 
            />
          ))}
          <span className="text-xs text-emerald-300/70 ml-1">({product.reviews})</span>
        </div>

        {/* Title */}
        <Link 
          to={`/product/${product.id}`} 
          onClick={handleViewProduct}
          className="block"
        >
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-brand-green transition-colors cursor-pointer hover:underline decoration-brand-green/30 underline-offset-4">
            {product.title}
            </h3>
        </Link>

        {/* Price and Actions */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="mb-3">
            <span className="text-xs text-emerald-300/70 block mb-1">Valor Promocional</span>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-brand-yellow">
                R$ {currentPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm text-emerald-500/50 line-through">
                R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
            </div>
            
            {/* Payment Methods Badges */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium" title="Pagamento via Pix">
                    <PixIcon /> Pix
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-200/50 text-[10px] font-medium" title="Pagamento via Cartão">
                    <CreditCard size={12} /> Cartão
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            <Button 
              variant="primary" 
              onClick={() => onBuyNow(product)}
              className={`${isComboPortugues ? 'col-span-5' : 'col-span-3'} !px-2 text-sm font-bold shadow-lg shadow-brand-yellow/10`}
            >
              Comprar
            </Button>

            {!isComboPortugues && (
              <Button 
                variant="glass" 
                onClick={() => onAddToCart(product)}
                className="col-span-2 !px-0 flex justify-center hover:!bg-brand-green/20 hover:!border-brand-green/50 group/btn"
                title="Adicionar ao Carrinho"
              >
                <ShoppingCart size={20} className="text-emerald-300 group-hover/btn:text-brand-green transition-colors" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});