
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onNewEssay?: () => void;
  onShowPricing?: () => void;
  onGoHome?: () => void;
  onUpdateUser?: (updates: Partial<User>) => void;
}

type ThemeProfile = 'aprova' | 'midnight' | 'nature' | 'solar' | 'ocean' | 'rose' | 'lavender' | 'slate';

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user,
  onNewEssay, 
  onShowPricing, 
  onGoHome,
  onUpdateUser
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode') as 'light' | 'dark';
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [themeProfile, setThemeProfile] = useState<ThemeProfile>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-profile') as ThemeProfile) || 'aprova';
    }
    return 'aprova';
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / docHeight) * 100;
      
      setScrollProgress(progress);
      setScrolled(scrollY > 20);
      setShowScrollTop(scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme-mode', themeMode);

    root.setAttribute('data-theme', themeProfile);
    localStorage.setItem('theme-profile', themeProfile);
  }, [themeMode, themeProfile]);

  const toggleThemeMode = () => setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const themeOptions: { id: ThemeProfile; color: string; label: string; desc: string }[] = [
    { id: 'aprova', color: 'bg-indigo-600', label: 'Aprova.ai', desc: 'NEURAL DEEP THEME' },
    { id: 'midnight', color: 'bg-zinc-950', label: 'Midnight', desc: 'OLED BLACK' },
    { id: 'nature', color: 'bg-emerald-600', label: 'Natureza', desc: 'CALM ZEN' },
    { id: 'solar', color: 'bg-amber-700', label: 'Solar', desc: 'WARM PAPER' },
    { id: 'ocean', color: 'bg-cyan-600', label: 'Oceano', desc: 'DEEP SEA' },
    { id: 'rose', color: 'bg-rose-500', label: 'Rose Bloom', desc: 'CREATIVE PINK' },
    { id: 'lavender', color: 'bg-violet-500', label: 'Lavender', desc: 'DREAMY' },
    { id: 'slate', color: 'bg-slate-600', label: 'Slate Steel', desc: 'INDUSTRIAL' },
  ];

  const handleLogoClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  const getPlanBadge = (plan: string) => {
    switch(plan) {
      case 'MAX': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'PRO': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-1000 bg-transparent">
      {/* Elementos Decorativos de Background Dinâmicos */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <header 
        className={`sticky top-0 z-[100] w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled 
            ? "py-3 glass-premium shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b border-indigo-500/10" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div 
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-violet-500 to-primary transition-all duration-300 ease-out z-[101] opacity-70"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-6 group cursor-pointer relative overflow-visible transition-all duration-500 hover:scale-[1.03] hover:rotate-1"
          >
            <div className={`relative flex items-center justify-center transition-all duration-1000 ${
              scrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              {/* Outer Glow Pulse */}
              <div className="absolute -inset-3 bg-primary/10 rounded-full blur-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Orbital Rings */}
              <div className="absolute inset-[-4px] border border-primary/20 rounded-2xl animate-orbital-right opacity-40"></div>
              <div className="absolute inset-[-8px] border border-indigo-500/10 rounded-2xl animate-orbital-left opacity-20"></div>
              
              {/* Main Icon Container */}
              <div className={`relative z-10 w-full h-full bg-primary rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-6 overflow-hidden`}>
                {/* Subtle Pulse Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-2xl animate-pulse opacity-40"></div>
                
                {/* SVG Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className={`relative z-20 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`}>
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>

                {/* Animated Light Sweep Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-150%] animate-[laser-scan_4s_linear_infinite] opacity-30"></div>
              </div>
            </div>

            <div className="flex flex-col relative">
              <div className="laser-line animate-laser-scan"></div>
              <span className={`font-black tracking-tighter transition-all duration-700 logo-liquid-prism drop-shadow-sm flex items-center gap-0.5 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                Aprova.ai
                <span className="relative flex h-2 w-2 mb-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </span>
              <div className="flex items-center gap-2 overflow-hidden">
                <div className={`h-[1px] transition-all duration-700 bg-primary/40 ${scrolled ? 'w-0' : 'w-4'}`}></div>
                <span className={`transition-all duration-700 font-black text-slate-400 dark:text-indigo-300/60 uppercase tracking-[0.3em] leading-none whitespace-nowrap ${scrolled ? 'text-[0px] opacity-0' : 'text-[10px] opacity-100'}`}>
                  O Waze de <span className="text-primary/80 dark:text-primary">Aprovação</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={onNewEssay}
              className={`relative group overflow-hidden bg-[#4B42D9] text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_-5px_rgba(75,66,217,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(75,66,217,0.5)] ${
                scrolled ? 'px-6 py-3 text-[11px]' : 'px-8 py-4 text-sm'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-lg group-hover:rotate-90 transition-transform duration-500">
                  <span className="text-lg leading-none">+</span>
                </div>
                <span className="hidden sm:inline">Nova Redação</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
            </button>

            <div className="h-8 w-[1px] bg-indigo-500/20 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsThemeMenuOpen(!isThemeMenuOpen);
                    setIsProfileMenuOpen(false);
                  }}
                  className={`rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:border-primary/40 shadow-inner ${
                    scrolled ? 'w-9 h-9' : 'w-11 h-11'
                  }`}
                >
                  <div className={`rounded-full ${themeOptions.find(t => t.id === themeProfile)?.color} shadow-[0_0_12px_rgba(var(--color-primary-rgb, 79,70,229),0.5)] border border-white/40 ring-4 ring-primary/5 transition-all ${
                    scrolled ? 'w-3 h-3' : 'w-4 h-4'
                  }`}></div>
                </button>
                
                {isThemeMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsThemeMenuOpen(false)}></div>
                    <div className="absolute top-14 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 w-80 z-20 animate-in fade-in zoom-in-95 origin-top-right backdrop-blur-3xl">
                      <div className="flex justify-between items-center mb-6 px-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Sua Experiência Visual</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {themeOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setThemeProfile(opt.id);
                              setIsThemeMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition-all relative overflow-hidden group/btn ${
                              themeProfile === opt.id 
                                ? 'bg-primary/5 border-2 border-primary shadow-lg shadow-primary/10' 
                                : 'border border-transparent hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full ${opt.color} flex-shrink-0 shadow-lg ring-2 ring-black/5 z-10`}></div>
                            <div className="flex flex-col z-10">
                              <span className={`text-xs font-black tracking-tight ${themeProfile === opt.id ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                                {opt.label}
                              </span>
                              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-1">
                                {opt.desc}
                              </span>
                            </div>
                            {themeProfile === opt.id && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse z-10"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="relative">
                <div 
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsThemeMenuOpen(false);
                  }}
                  className="hidden sm:flex items-center gap-4 pl-3 cursor-pointer group"
                >
                  <div className="text-right">
                    <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors ${
                      user.plan !== 'FREE' ? 'text-primary' : 'text-slate-400'
                    }`}>Status {user.plan}</p>
                    <p className="font-bold text-sm tracking-tight dark:text-white group-hover:text-primary transition-colors">{user.name}</p>
                  </div>
                  <div className="relative">
                    <img src={user.avatarUrl} className={`rounded-2xl object-cover border-2 transition-all group-hover:scale-110 shadow-lg ${
                      user.plan !== 'FREE' ? 'border-primary/20' : 'border-slate-200 dark:border-white/10'
                    } ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`} alt="Perfil" />
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <div className="relative inline-flex h-4 w-4 bg-emerald-500 border-2 border-white dark:border-[#08081a] rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {isProfileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)}></div>
                    <div className="absolute top-14 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 w-80 z-20 animate-in fade-in zoom-in-95 origin-top-right backdrop-blur-3xl">
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative mb-3">
                           <img src={user.avatarUrl} className="w-16 h-16 rounded-3xl object-cover border-2 border-primary/20 shadow-xl" alt="Avatar" />
                           <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-[#08081a] rounded-full"></div>
                        </div>
                        <h4 className="text-lg font-black dark:text-white tracking-tight">{user.name}</h4>
                        <p className="text-xs font-bold text-slate-400 dark:text-indigo-300/40 uppercase tracking-widest">{user.email}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                           <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plano Atual</span>
                             <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getPlanBadge(user.plan)}`}>
                                {user.plan}
                             </span>
                           </div>
                           <div className="space-y-2 mt-4">
                              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                <span>Correções Restantes</span>
                                <span className="text-primary">{user.correctionsRemaining}</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-1000" 
                                  style={{ width: `${(user.correctionsRemaining / 30) * 100}%` }}
                                ></div>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          <button 
                            onClick={() => {
                              onShowPricing?.();
                              setIsProfileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-left transition-all group"
                          >
                             <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-primary group-hover:text-white transition-all">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M2 12h20"/></svg>
                             </div>
                             <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Upgrade para PRO</span>
                          </button>
                          
                          <button 
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-left transition-all"
                          >
                             <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                             </div>
                             <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Minhas Redações</span>
                          </button>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-rose-500/10 text-rose-500 transition-all">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                             <span className="text-xs font-black uppercase tracking-tighter">Sair da Conta</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative z-10 transition-all duration-700">
        {children}
      </main>

      <footer className="bg-white/50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 py-16 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-4 group cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </div>
            <span className="font-black text-2xl tracking-tighter dark:text-white logo-liquid-prism">Aprova.ai</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-slate-400 dark:text-indigo-400/40 uppercase tracking-[0.4em]">Tecnologia Preditiva para Vestibulares</p>
            <p className="text-[10px] font-bold text-slate-300 dark:text-indigo-400/20 uppercase tracking-[0.2em]">© 2024 Lab de IA Aplicada</p>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 z-[110] w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-500 transform ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
        } hover:scale-110 active:scale-90 ring-8 ring-primary/10`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </div>
  );
};
