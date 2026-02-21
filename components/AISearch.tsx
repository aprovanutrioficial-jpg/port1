import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import { getProductRecommendations } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISearch: React.FC<AISearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setQuery('');

    const response = await getProductRecommendations(userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: response, isProductRecommendation: true }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-emerald-950 border border-brand-green/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-brand-green/10 to-transparent">
          <div className="flex items-center gap-2 text-brand-green">
            <Sparkles size={20} />
            <span className="font-semibold">AprovaPortuguês AI Assistant</span>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-emerald-400/50">
              <Sparkles size={48} className="mx-auto mb-4 opacity-20" />
              <p>Pergunte-me sobre materiais para Português, Gramática ou Concursos...</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-brand-green text-white rounded-tr-none' 
                  : 'bg-white/10 text-emerald-100 border border-white/5 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-brand-yellow" />
                <span className="text-xs text-emerald-400">AprovaPortuguês está pensando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSearch} className="p-4 border-t border-white/10 bg-emerald-900/30">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você deseja aprender hoje?"
              className="w-full bg-emerald-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-emerald-500 focus:outline-none focus:border-brand-green/50 transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-green rounded-lg text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};