
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import ChatBot from './components/ChatBot.tsx';
import { Constellation } from './components/Constellation.tsx';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILLS } from './constants.tsx';

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic constellation background - Z-INDEX 20 */}
      <Constellation />

      {/* Navbar - Z-INDEX 50 */}
      <Navbar />
      
      {/* Hero Section - Z-INDEX 10 */}
      <section id="home" className="relative pt-48 pb-24 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="reveal flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full glass text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-10 w-fit mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{PERSONAL_INFO.availability}</span>
          </div>
          
          <h1 className="reveal font-outfit text-6xl md:text-[9rem] font-black leading-[0.8] tracking-tighter mb-10">
            <span className="text-white block mb-2">SYSTEM</span>
            <span className="text-gradient block mb-2">ARCHITECT</span>
            <span className="text-white block opacity-10">RICHARD</span>
          </h1>
          
          <p className="reveal max-w-xl mx-auto text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-14 px-4">
            {PERSONAL_INFO.bio}
          </p>
          
          <div className="reveal flex flex-wrap justify-center gap-6">
            <a href="#projects" className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 uppercase tracking-widest text-[10px]">
              Explore Work
            </a>
            <a href="#contact" className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/5 transition-all border border-white/10 uppercase tracking-widest text-[10px]">
              Initiate Contact
            </a>
          </div>
        </div>
      </section>

      {/* Bento Grid Skills - Z-INDEX 10 */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <h2 className="font-outfit text-5xl font-black mb-4 tracking-tight">INFRASTRUCTURE</h2>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Technological stack and methodology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[650px]">
            {SKILLS.map((skill, idx) => (
              <div 
                key={skill.category} 
                className={`reveal bento-card p-12 rounded-[3rem] flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2' : 
                  idx === 1 ? 'md:col-span-2 md:row-span-1' :
                  'md:col-span-2 md:row-span-1'
                }`}
              >
                <div>
                  <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">{skill.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skill.items.map(item => (
                      <span key={item} className="px-5 py-2.5 bg-white/5 rounded-2xl text-[11px] font-bold text-zinc-300 border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-white/5 font-outfit text-8xl font-black italic select-none">
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase - Z-INDEX 10 */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="font-outfit text-6xl font-black mb-6 tracking-tighter">PORTFOLIO</h2>
              <p className="text-zinc-500 max-w-sm text-xs leading-relaxed uppercase tracking-widest">Autonomous systems and digital logic</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="reveal group relative bg-[#09090b] rounded-[4rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-indigo-500/40">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-12 pt-0 -mt-10 relative z-10">
                  <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{project.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-10 line-clamp-2 uppercase tracking-wide">
                    {project.description}
                  </p>
                  <a href={project.link} className="inline-flex items-center space-x-4 text-[10px] font-black text-white uppercase tracking-[0.3em] group/btn">
                    <span>Analyze Architecture</span>
                    <div className="w-8 h-[1px] bg-white/20 transition-all group-hover/btn:w-12 group-hover/btn:bg-white"></div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience - Z-INDEX 10 */}
      <section id="experience" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-24">
            <h2 className="font-outfit text-4xl font-black mb-4 tracking-[0.2em]">TRAJECTORY</h2>
            <div className="w-20 h-[1px] bg-indigo-500 mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="reveal group p-12 rounded-[3.5rem] glass border border-white/5 transition-all hover:bg-zinc-900/40">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">{exp.period}</span>
                    <h3 className="text-4xl font-black mb-2 tracking-tight uppercase">{exp.role}</h3>
                    <p className="text-zinc-500 font-bold text-sm mb-10 tracking-[0.1em]">{exp.company}</p>
                    <div className="space-y-6">
                      {exp.description.map((item, i) => (
                        <div key={i} className="flex items-start space-x-6 text-zinc-400 text-[13px] leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Z-INDEX 10 */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal glass rounded-[5rem] p-16 md:p-32 border border-white/10 overflow-hidden relative">
             <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
               <div>
                  <h2 className="font-outfit text-6xl md:text-8xl font-black mb-12 leading-[0.8] tracking-tighter">
                    READY TO <br />
                    <span className="text-gradient">SCALE?</span>
                  </h2>
                  <p className="text-zinc-500 text-sm mb-16 leading-relaxed max-w-sm uppercase tracking-widest font-bold">
                    Currently accepting strategic architectural inquiries.
                  </p>
                  <div className="space-y-8">
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-2xl font-outfit font-black text-white hover:text-indigo-400 transition-colors block tracking-tight">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
               </div>
               
               <div className="bg-black/40 p-12 rounded-[4rem] border border-white/5">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input type="text" placeholder="IDENTITY" className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-8 py-5 outline-none focus:border-indigo-500/50 transition-colors text-[10px] font-bold tracking-widest" />
                      <input type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-8 py-5 outline-none focus:border-indigo-500/50 transition-colors text-[10px] font-bold tracking-widest" />
                    </div>
                    <textarea placeholder="ARCHITECTURAL INQUIRY SUMMARY..." className="w-full bg-white/5 border border-white/5 rounded-[3rem] px-8 py-7 outline-none focus:border-indigo-500/50 transition-colors h-48 text-[10px] font-bold tracking-widest"></textarea>
                    <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-[2rem] hover:bg-zinc-200 transition-all active:scale-95">
                      INITIALIZE UPLINK
                    </button>
                  </form>
               </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-black font-outfit tracking-tighter">RA<span className="text-indigo-500">.</span></div>
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.6em]">
            © {new Date().getFullYear()} Richard Akintunde • Lagos Origin
          </p>
          <div className="flex space-x-12">
            {['LinkedIn', 'GitHub', 'X'].map(social => (
              <a key={social} href="#" className="text-zinc-600 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.3em]">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ChatBot - Z-INDEX 1000 */}
      <ChatBot />
    </div>
  );
};

export default App;
