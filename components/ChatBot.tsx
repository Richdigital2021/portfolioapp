
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { Message } from '../types.ts';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "System online. I'm Richard's AI interface. How can I assist with your inquiry regarding his architecture, tech stack, or availability?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "Communication link unstable. Please re-synchronize." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000]">
      {isOpen ? (
        <div className="w-[380px] md:w-[420px] h-[580px] bg-[#09090b] border border-white/10 rounded-[2.5rem] flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="p-7 bg-zinc-900/50 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/ra/100/100" alt="Richard AI" className="w-full h-full object-cover opacity-60" />
                  </div>
                </div>
                <div className="absolute bottom-[-2px] right-[-2px] w-3.5 h-3.5 bg-green-500 rounded-full border-4 border-zinc-950"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold font-outfit uppercase tracking-wider">RA.INTERFACE</h3>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Neural Link Active</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-[13px] leading-relaxed tracking-tight ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white font-medium rounded-br-sm shadow-xl shadow-indigo-600/10' 
                  : 'bg-zinc-900 text-zinc-300 rounded-bl-sm border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-white/5 px-5 py-4 rounded-3xl rounded-bl-sm flex space-x-2 items-center">
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 bg-zinc-900/50 border-t border-white/5 flex items-center space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input query..."
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-zinc-100 placeholder-zinc-700 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center disabled:opacity-50 hover:bg-zinc-200 transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 rounded-[2rem] bg-indigo-600 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="absolute -top-14 right-0 bg-white text-black text-[10px] font-black px-5 py-2.5 rounded-2xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all whitespace-nowrap shadow-2xl tracking-widest uppercase">
            Initialize Interface
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
