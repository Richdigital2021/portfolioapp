
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-black font-outfit tracking-tighter hover:opacity-80 transition-opacity">
          RA<span className="text-indigo-500">.</span>
        </a>
        <div className="hidden md:flex space-x-12 items-center">
          {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
            Hire
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
