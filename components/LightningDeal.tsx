import React, { useState, useEffect } from 'react';
import { Zap, Clock, Sparkles } from 'lucide-react';

export const LightningDeal: React.FC = () => {
  // 2 hours + 30 minutes in seconds
  const INITIAL_TIME = (2 * 60 * 60) + (30 * 60);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : INITIAL_TIME));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full mb-8 relative group">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-brand-yellow/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100 duration-700"></div>
      
      {/* Main Container */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden shadow-lg transition-all duration-300 hover:border-brand-yellow/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]">
        
        {/* Left: Info */}
        <div className="flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-yellow to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0 animate-[pulse_3s_ease-in-out_infinite]">
             <Zap size={24} className="text-white fill-white" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider flex items-center gap-1">
                 <Sparkles size={12} /> Oferta Relâmpago
               </span>
               <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/20 font-bold">
                 -80% OFF
               </span>
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-xl md:text-2xl font-black text-white">Materiais por R$ 10,00</span>
            </div>
          </div>
        </div>

        {/* Right: Timer */}
        <div className="flex items-center gap-2 z-10 bg-black/40 px-5 py-3 rounded-xl border border-white/5 w-full md:w-auto justify-center">
           <Clock size={16} className="text-brand-yellow mr-2" />
           <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold hidden sm:inline-block mr-2">Expira em:</span>
           <div className="flex items-center gap-1 font-mono font-bold text-white text-lg">
              <span className="bg-white/10 px-2 py-1 rounded min-w-[36px] text-center">{pad(hours)}</span>
              <span className="text-slate-500">:</span>
              <span className="bg-white/10 px-2 py-1 rounded min-w-[36px] text-center">{pad(minutes)}</span>
              <span className="text-slate-500">:</span>
              <span className="bg-white/10 px-2 py-1 rounded min-w-[36px] text-center text-brand-yellow">{pad(seconds)}</span>
           </div>
        </div>

      </div>
    </div>
  );
};