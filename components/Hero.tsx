import React from 'react';
import { Button } from './Button';
import { ArrowRight, Download } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScrollToCatalog = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-32 pb-32 px-4 overflow-hidden min-h-[70vh] flex items-center">
      
      {/* Background Elements - Modern Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-yellow/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-start text-left relative z-10">
        
        {/* Text Content */}
        <div className="space-y-8 flex flex-col items-start w-full">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-brand-green text-[10px] uppercase tracking-[0.2em] font-bold backdrop-blur-md">
              <Download size={14} className="animate-bounce" />
              <span>Mais de 15.000 alunos aprovados</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.9] tracking-tighter max-w-6xl">
            <span className="block opacity-50 text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal mb-4">LOJINHA DE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-green bg-[length:200%_auto] animate-gradient">PORTUGUÊS</span> <br className="hidden md:block" />
            <span className="inline-block">QUE ACELERA SUA</span> <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-orange-400 to-brand-yellow bg-[length:200%_auto] animate-gradient">APROVAÇÃO</span>
          </h1>
          
          <div className="flex flex-wrap justify-start gap-6 pt-8">
            <Button variant="primary" onClick={handleScrollToCatalog} className="px-8 py-6 text-xl rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:shadow-brand-green/40 transition-all duration-500">
              Explorar Catálogo <ArrowRight size={24} />
            </Button>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-emerald-800 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-xs">
                <p className="text-white font-bold">Comunidade Ativa</p>
                <p className="text-emerald-200/50">Junte-se a nós</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};