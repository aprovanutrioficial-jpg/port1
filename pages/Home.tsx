import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { LightningDeal } from '../components/LightningDeal';
import { FAQ } from '../components/FAQ';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { Mail } from 'lucide-react';

interface HomeProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart, onBuyNow }) => {
  return (
    <>
      <Hero />

      {/* Products Section */}
      <section id="products" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-yellow rounded-full"></span>
              Nossos Destaques
            </h2>
          </div>
        </div>

        {/* Lightning Deal moved here - above the first product */}
        <LightningDeal />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 border-t border-white/5 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-green/20 to-brand-green/5 text-brand-green mb-6 border border-brand-green/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <Mail size={32} />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-white">Fale Conosco</h2>
              <p className="text-emerald-200/70 mb-8 max-w-lg mx-auto">
                  Precisa de ajuda com sua compra ou tem alguma dúvida? Entre em contato diretamente com nossa equipe.
              </p>
              
              <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-brand-green/20 via-brand-yellow/10 to-brand-green/20">
                  <div className="bg-emerald-900/80 backdrop-blur-xl border border-white/10 rounded-xl px-8 py-6 flex flex-col items-center">
                      <span className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-2">Email Oficial</span>
                      <a 
                          href="mailto:suporteaprovaconcursos@gmail.com" 
                          className="text-sm sm:text-xl md:text-3xl font-bold text-white hover:text-brand-yellow transition-colors break-all"
                      >
                          suporteaprovaconcursos@gmail.com
                      </a>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
};