import React from 'react';
import { Mail, FileText, Infinity, Printer, ShieldAlert, Zap } from 'lucide-react';

export const FAQ: React.FC = () => {
  const items = [
    {
      question: "Como recebo o material?",
      answer: "O envio é imediato e automático! Assim que o pagamento for confirmado, você receberá um e-mail com o link exclusivo para download.",
      icon: <Mail className="text-brand-yellow" size={24} />
    },
    {
      question: "Qual o formato dos arquivos?",
      answer: "Todos os materiais são disponibilizados em PDF de alta resolução, prontos para leitura em celular, tablet, computador ou Kindle.",
      icon: <FileText className="text-brand-green" size={24} />
    },
    {
      question: "Por quanto tempo tenho acesso?",
      answer: "O acesso é vitalício. Uma vez adquirido, o material é seu para sempre. Você pode baixar e guardar em seus dispositivos com segurança.",
      icon: <Infinity className="text-purple-400" size={24} />
    },
    {
      question: "Posso imprimir o material?",
      answer: "Sim! O PDF é totalmente liberado para download e impressão. Você pode imprimir colorido, preto e branco ou encadernar para estudar.",
      icon: <Printer className="text-green-400" size={24} />
    },
    {
      question: "Posso compartilhar com amigos?",
      answer: "Não. Os materiais são de uso exclusivo e individual. O compartilhamento não autorizado é proibido e monitorado por direitos autorais.",
      icon: <ShieldAlert className="text-red-400" size={24} />
    },
    {
      question: "E se eu tiver dúvidas?",
      answer: "Nossa equipe de suporte está pronta para te ajudar. Basta entrar em contato pelo e-mail oficial disponível no final da página.",
      icon: <Zap className="text-cyan-400" size={24} />
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="text-center mb-12 relative z-10">
         <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
         <p className="text-emerald-200/70">Tire suas dúvidas sobre o funcionamento da nossa loja.</p>
       </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
         {items.map((item, idx) => (
           <div key={idx} className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 hover:border-brand-green/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green/5">
              <div className="mb-4 bg-emerald-900/50 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.question}</h3>
              <p className="text-emerald-100/70 text-sm leading-relaxed">{item.answer}</p>
           </div>
         ))}
       </div>
    </section>
  );
};