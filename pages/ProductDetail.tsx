import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../constants';
import { Product } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Star, ShieldCheck, Download, Clock, Zap, MessageCircle, User, CheckCircle, Send } from 'lucide-react';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, onBuyNow }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const reviews = id ? MOCK_REVIEWS[id] || [] : [];

  // Review Form State
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'simple_success' | 'comment_success'>('idle');

  // Logic to determine promo price
  const isComboPortugues = product?.id === '207511512';
  
  let currentPrice = 10.00;
  if (isComboPortugues) currentPrice = 27.00;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;

    // Simulate submission
    if (userComment.trim().length > 0) {
      setSubmitStatus('comment_success');
    } else {
      setSubmitStatus('simple_success');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h2>
        <Button onClick={() => navigate('/')} variant="secondary">
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-200/60 hover:text-brand-yellow transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Voltar para catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column: Image */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-brand-yellow opacity-20 blur-2xl rounded-3xl group-hover:opacity-30 transition-opacity duration-1000"></div>
             
             {/* Container ajustado: centralizado, com padding e max-height definido */}
             <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex justify-center items-center p-6 bg-emerald-900/50">
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1 animate-pulse">
                    <Zap size={12} fill="currentColor" /> OFERTA R$ {currentPrice.toFixed(0)}
                </div>
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="max-w-full max-h-[500px] w-auto h-auto object-contain rounded-lg shadow-lg"
                />
             </div>
             
             {/* Badges below image */}
             <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                   <Download className="w-6 h-6 text-brand-green mx-auto mb-2" />
                   <span className="text-xs text-emerald-200/80 block">Download Imediato</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                   <ShieldCheck className="w-6 h-6 text-green-400 mx-auto mb-2" />
                   <span className="text-xs text-emerald-200/80 block">Compra Segura</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                   <Clock className="w-6 h-6 text-brand-yellow mx-auto mb-2" />
                   <span className="text-xs text-emerald-200/80 block">Acesso Vitalício</span>
                </div>
             </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-wider border border-brand-green/20">
                    {product.category}
                 </span>
                 <div className="flex items-center gap-1 text-brand-yellow">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium text-white">{product.rating}</span>
                    <span className="text-sm text-emerald-200/60">({product.reviews} avaliações)</span>
                 </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-2 p-4 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-xl">
                 <div>
                    <span className="block text-xs text-red-400 font-bold uppercase mb-1">Preço Promocional Limitado</span>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-white">
                            R$ {currentPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-emerald-200/50 mb-1 text-lg line-through">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-white mb-3">Sobre este material</h3>
               <p className="text-emerald-100/80 leading-relaxed text-lg whitespace-pre-line">
                 {product.description}
               </p>
               <p className="text-emerald-200/60 mt-4 leading-relaxed">
                 Este material foi desenvolvido cuidadosamente para otimizar seus estudos. 
                 Com diagramação moderna e foco no que realmente importa, você economiza tempo e aumenta sua retenção de conteúdo. 
                 Ideal para revisões rápidas e aprofundamento em tópicos específicos.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
               <Button 
                  onClick={() => onBuyNow(product)} 
                  variant="primary" 
                  className="flex-1 py-4 text-lg shadow-[0_0_20px_rgba(251,191,36,0.2)]"
               >
                  Comprar Agora
               </Button>
               {!isComboPortugues && (
                 <Button 
                    onClick={() => onAddToCart(product)} 
                    variant="glass" 
                    className="flex-1 py-4 text-lg"
                 >
                    Adicionar ao Carrinho
                 </Button>
               )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageCircle className="text-brand-yellow" />
              Avaliações de quem já comprou
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Rating Summary */}
              <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl font-bold text-white">{product.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 text-brand-yellow mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} className={i < Math.round(product.rating) ? "" : "text-emerald-800"} />
                      ))}
                    </div>
                    <p className="text-emerald-200/50 text-sm">Baseado em {product.reviews} avaliações</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Logic to meet specific user request: 97% for 5 stars, 3% for 4 stars
                    let percentage = 0;
                    if (star === 5) percentage = 97;
                    if (star === 4) percentage = 3;
                    
                    return (
                      <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-3 text-emerald-200/50 font-medium">{star}</span>
                        <Star size={12} className="text-emerald-700" />
                        <div className="flex-1 h-2 bg-emerald-900/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-yellow rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List & New Review Form */}
              <div className="md:col-span-8">
                <div className="space-y-6 mb-12">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {review.userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{review.userName}</h4>
                            <span className="text-xs text-emerald-200/50">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg border border-white/5">
                          <Star size={14} className="text-brand-yellow fill-brand-yellow" />
                          <span className="text-sm font-bold text-white">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-emerald-100/80 leading-relaxed text-sm">
                        "{review.content}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* User Review Form */}
                <div className="bg-white/5 border border-brand-green/20 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <MessageCircle size={100} className="text-brand-green" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="text-brand-yellow" fill="currentColor" />
                    Deixe sua avaliação
                  </h3>

                  {submitStatus === 'idle' ? (
                    <form onSubmit={handleReviewSubmit} className="relative z-10">
                      <div className="mb-6">
                        <label className="block text-sm text-emerald-200/80 mb-2 font-medium">Sua nota</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star 
                                size={32} 
                                className={`transition-colors duration-200 ${(hoverRating || userRating) >= star ? 'text-brand-yellow fill-brand-yellow' : 'text-emerald-800'}`} 
                              />
                            </button>
                          ))}
                        </div>
                        {userRating > 0 && <span className="text-brand-yellow text-sm mt-1 block font-medium">Excelente!</span>}
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm text-emerald-200/80 mb-2 font-medium">
                          Comentário <span className="text-emerald-200/40 font-normal">(Opcional)</span>
                        </label>
                        <textarea
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                          className="w-full bg-emerald-900/50 border border-white/10 rounded-xl p-4 text-white placeholder-emerald-500/50 focus:outline-none focus:border-brand-green/50 transition-colors h-32 resize-none"
                          placeholder="Conte-nos o que achou do material..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={userRating === 0}
                        className={`w-full sm:w-auto ${userRating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Enviar Avaliação <Send size={18} />
                      </Button>
                    </form>
                  ) : (
                    <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <CheckCircle size={32} className="text-green-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Avaliação Enviada!</h4>
                      <p className="text-emerald-200/80 max-w-md mx-auto leading-relaxed">
                        {submitStatus === 'comment_success' 
                          ? "Avaliação enviada com sucesso! Seu comentário aparecerá automaticamente aqui após 1 dia."
                          : "Avaliação enviada com sucesso! Obrigado por colaborar com nossa comunidade."}
                      </p>
                      <Button 
                        variant="glass" 
                        onClick={() => {
                          setSubmitStatus('idle');
                          setUserRating(0);
                          setUserComment('');
                        }}
                        className="mt-6 text-sm"
                      >
                        Avaliar outro produto
                      </Button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};