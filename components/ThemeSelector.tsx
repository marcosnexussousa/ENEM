
import React from 'react';
import { ENEM_THEMES } from '../data/themes';
import { Theme } from '../types';

interface ThemeSelectorProps {
  onSelect: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-8 h-1 bg-primary rounded-full"></div>
             <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Intelligence Hub</h3>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            Pronto para <span className="text-primary italic">Hackear</span> o ENEM?
          </h2>
        </div>
        <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
          <button className="px-5 py-2.5 bg-white dark:bg-indigo-600 rounded-xl text-[10px] font-black text-indigo-600 dark:text-white uppercase tracking-widest shadow-lg">Populares</button>
          <button className="px-5 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Recentes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ENEM_THEMES.map((theme) => {
          const isFreeTheme = theme.id === 'tema-livre';
          
          return (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className={`group relative p-10 rounded-[3rem] border-2 text-left transition-all duration-500 overflow-hidden active:scale-[0.98] ${
                isFreeTheme 
                  ? 'bg-amber-500/5 border-amber-500/10 hover:border-amber-500/40 hover:shadow-[0_0_60px_rgba(245,158,11,0.1)]' 
                  : 'bg-white/40 dark:bg-indigo-500/[0.02] border-slate-200 dark:border-indigo-500/10 hover:border-primary/50 hover:shadow-[0_0_80px_rgba(99,102,241,0.15)]'
              } backdrop-blur-md`}
            >
              {/* EFEITO DE LUZ NO HOVER */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col gap-2">
                    <div className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg w-fit ${
                      isFreeTheme ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/10 text-primary'
                    }`}>
                      {theme.year}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 dark:text-indigo-300/40 uppercase tracking-widest">
                      Eixo: {theme.axis}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                    isFreeTheme ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' :
                    theme.difficulty === 'Fácil' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' :
                    theme.difficulty === 'Médio' ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' :
                    'bg-rose-500/5 text-rose-500 border-rose-500/20'
                  }`}>
                    {theme.difficulty}
                  </div>
                </div>
                
                <h4 className="text-2xl font-black leading-tight text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
                  {theme.title}
                </h4>
                
                <div className="mt-12 flex items-center justify-between">
                   <div className={`flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.2em] ${
                     isFreeTheme ? 'text-amber-500' : 'text-primary'
                   }`}>
                      <span>Iniciar Redação</span>
                      <div className="w-10 h-[2px] bg-current opacity-30 group-hover:w-16 transition-all duration-500"></div>
                   </div>
                   <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 group-hover:bg-primary group-hover:text-white transition-all">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                       <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                     </svg>
                   </div>
                </div>
              </div>

              {/* WATERMARK ICON */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 rotate-[-15deg] group-hover:rotate-0 scale-150">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
