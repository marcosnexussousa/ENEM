
import React, { useState, useMemo } from 'react';
import { Theme } from '../types';

interface EssayEditorProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  selectedTheme: Theme | null;
  onBack: () => void;
}

export const EssayEditor: React.FC<EssayEditorProps> = ({ onAnalyze, isLoading, selectedTheme, onBack }) => {
  const [text, setText] = useState('');
  const [showMotivation, setShowMotivation] = useState(false);
  
  const LINE_HEIGHT_VAL = 2.4; // rem para mais respiro
  const LINE_HEIGHT = `${LINE_HEIGHT_VAL}rem`; 

  const isAncient = selectedTheme?.variant === 'ancient';

  const metrics = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0).length : 0;
    const lines = text.split('\n').length;
    return { words, lines };
  }, [text]);

  const wordPercentage = Math.min((metrics.words / 500) * 100, 100);

  const getStatusInfo = () => {
    if (metrics.words === 0) return { label: 'Em Branco', color: 'text-slate-400', bg: 'bg-slate-100 dark:bg-white/5', stroke: 'stroke-slate-200' };
    if (metrics.words < 150) return { label: 'Abaixo do Mínimo', color: 'text-rose-500', bg: 'bg-rose-500/10', stroke: 'stroke-rose-500' };
    if (metrics.words < 350) return { label: 'Em Progresso', color: 'text-amber-500', bg: 'bg-amber-500/10', stroke: 'stroke-amber-500' };
    return { label: 'Extensão Ideal', color: 'text-emerald-500', bg: 'bg-emerald-500/10', stroke: 'stroke-emerald-500' };
  };

  const status = getStatusInfo();

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* HEADER DE CONTEXTO */}
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </div>
          Recuar para Catálogo
        </button>

        <div className={`glass-premium p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group ${isAncient ? 'border-amber-900/20' : ''}`}>
           {isAncient && <div className="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>}
           <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000">
             <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary"><path d="M12 2v20M2 12h20"/></svg>
           </div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
             <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">{selectedTheme?.year}</span>
                 <span className="text-[10px] font-black text-slate-400 dark:text-indigo-300/40 uppercase tracking-widest">{selectedTheme?.axis}</span>
               </div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight max-w-2xl">{selectedTheme?.title}</h3>
             </div>
             <button 
               onClick={() => setShowMotivation(!showMotivation)}
               className="px-8 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
             >
               {showMotivation ? 'Esconder Proposta' : 'Analisar Textos'}
             </button>
           </div>
        </div>

        {showMotivation && (
          <div className="bg-white/50 dark:bg-indigo-500/[0.03] border border-indigo-500/10 p-10 rounded-[2.5rem] animate-in slide-in-from-top-6 duration-700 backdrop-blur-xl">
            <h4 className="text-[11px] font-black uppercase text-primary mb-8 tracking-[0.4em]">Base de Conhecimento / Textos Motivadores</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedTheme?.motivationTexts.map((txt, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-3xl font-black text-primary/10 group-hover:text-primary/30 transition-colors">0{i+1}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">"{txt}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ÁREA DE ESCRITA: PAPER FEEL */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className={`relative glass-premium rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/5 ${isAncient ? 'animate-ancient-fade ring-4 ring-amber-500/5' : ''}`}>
          {/* HEADER DE MÉTRICAS */}
          <div className="px-10 py-6 bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 lg:gap-12">
            
            <div className="flex items-center gap-5 min-w-fit">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ambiente de Redação</span>
                  <div className={`mt-1 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${status.bg} ${status.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text-', 'bg-')} animate-pulse`}></span>
                    {status.label}
                  </div>
                </div>
            </div>

            <div className="flex flex-1 items-center gap-6 lg:gap-10">
               {/* CARD PALAVRAS */}
               <div className="flex items-center gap-4 group/stat">
                  <div className="text-right">
                    <span className={`text-4xl font-black tracking-tighter leading-none block transition-colors duration-500 ${metrics.words > 500 ? 'text-rose-500' : 'text-slate-800 dark:text-white'}`}>
                      {metrics.words}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Palavras</span>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
                  <div className="hidden sm:flex flex-col justify-center">
                    <span className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] leading-tight">Mín. Sugerido</span>
                    <span className="text-sm font-black text-slate-500 dark:text-slate-400">150</span>
                  </div>
               </div>

               {/* PROGRESS BAR */}
               <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span>Fluxo Textual</span>
                    <span className={status.color}>{Math.floor(wordPercentage)}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200/50 dark:bg-white/5 rounded-full overflow-hidden p-0.5 relative shadow-inner">
                    <div className="absolute left-[30%] top-0 bottom-0 w-[2px] bg-white dark:bg-slate-900 z-10 opacity-60"></div>
                    <div className={`h-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${metrics.words > 500 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]'}`} style={{ width: `${wordPercentage}%` }}></div>
                  </div>
               </div>

               {/* CARD LINHAS */}
               <div className="flex items-center gap-4 min-w-fit">
                  <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
                  <div className="text-left">
                    <span className={`text-4xl font-black tracking-tighter leading-none block ${metrics.lines > 30 ? 'text-rose-500' : 'text-slate-800 dark:text-white'}`}>
                      {metrics.lines}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Linhas (Max 30)</span>
                  </div>
               </div>
            </div>
          </div>
          
          <div className={`relative flex min-h-[750px] shadow-inner transition-colors duration-700 ${isAncient ? 'bg-[#fff9f0]' : 'bg-white'}`}>
            {/* RÉGUA LATERAL */}
            <div className={`w-16 border-r-2 flex flex-col items-center pt-[2.4rem] select-none ${isAncient ? 'border-amber-900/10 bg-amber-50/50' : 'border-rose-500/10 bg-slate-50/50'}`}>
               {[...Array(30)].map((_, i) => (
                 <span key={i} className={`text-[11px] font-black h-[2.4rem] flex items-center justify-center transition-colors ${isAncient ? 'text-amber-800/30' : 'text-slate-400'}`}>
                   {i + 1}
                 </span>
               ))}
            </div>
            {/* CANVAS DE ESCRITA - PAPER EFFECT */}
            <div className={`flex-1 relative ${isAncient ? 'bg-[#fffdfa] bg-ancient-grid' : 'bg-white'}`}>
              {/* Linhas do Papel (Ocultas se quadriculado carregar) */}
              {!isAncient && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.4]" 
                  style={{ 
                    backgroundImage: 'linear-gradient(transparent 98%, #e2e8f0 98%)', 
                    backgroundSize: `100% ${LINE_HEIGHT}`, 
                    backgroundPosition: `0 ${LINE_HEIGHT}` 
                  }}
                ></div>
              )}
              
              {/* Margem Lateral do Papel */}
              <div className={`absolute left-0 top-0 bottom-0 w-[1px] pointer-events-none ${isAncient ? 'bg-amber-900/20 shadow-[1px_0_0_rgba(139,92,5,0.05)]' : 'bg-rose-500/20'}`}></div>

              <textarea
                className={`w-full h-[750px] p-10 pt-[2.4rem] text-xl focus:outline-none resize-none placeholder-slate-300 font-serif bg-transparent leading-[2.4rem] tracking-tight selection:bg-primary/20 scrollbar-hide relative z-10 ${isAncient ? 'text-amber-950/90' : 'text-slate-900'}`}
                placeholder="Inicie sua argumentação no papel milimetrado clássico..."
                style={{ lineHeight: LINE_HEIGHT }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="p-10 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-5 text-left max-w-sm">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-500 border border-amber-500/20 shadow-inner">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-indigo-300/40 font-bold leading-relaxed uppercase tracking-widest">
                Dica: O visual de caderno antigo ajuda na concentração e resgate da memória muscular da escrita manual. Aproveite!
              </p>
            </div>
            <button
              onClick={() => metrics.words >= 150 ? onAnalyze(text) : alert(`Você digitou apenas ${metrics.words} palavras. O mínimo para uma análise consistente é 150 palavras.`)}
              disabled={isLoading || metrics.words < 10}
              className="group relative overflow-hidden px-16 py-6 rounded-[2rem] font-black text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 bg-primary shadow-2xl shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-4 text-sm uppercase tracking-[0.2em]">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sincronizando IA...
                  </>
                ) : 'Executar Análise'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
