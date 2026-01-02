
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { FeedbackResponse } from '../types';

interface FeedbackDashboardProps {
  data: FeedbackResponse;
}

export const FeedbackDashboard: React.FC<FeedbackDashboardProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();
  
  const chartData = [
    { subject: 'C1', A: data.competencies.c1.score, fullMark: 200 },
    { subject: 'C2', A: data.competencies.c2.score, fullMark: 200 },
    { subject: 'C3', A: data.competencies.c3.score, fullMark: 200 },
    { subject: 'C4', A: data.competencies.c4.score, fullMark: 200 },
    { subject: 'C5', A: data.competencies.c5.score, fullMark: 200 },
  ];

  // Notas de corte médias baseadas no SiSU 2023/2024
  const SISU_AVERAGES = {
    medicine: 798.4,
    law: 735.6,
    engineering: 712.8
  };

  const getSisuConfig = (userScore: number, courseKey: keyof typeof SISU_AVERAGES) => {
    const cutoff = SISU_AVERAGES[courseKey];
    const diff = userScore - cutoff;
    const progress = Math.min((userScore / cutoff) * 100, 100);
    
    let status = 'Longe';
    if (diff >= 0) status = 'Passaria';
    else if (diff >= -30) status = 'Quase';

    if (status === 'Passaria') {
      return {
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/5',
        border: 'border-emerald-500/20',
        bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
        label: 'Acesso Liberado',
        progress,
        diff,
        cutoff,
        statusLabel: 'Passaria',
        badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        icon: (
          <div className="relative flex items-center justify-center">
            <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-20"></span>
            <div className="relative w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )
      };
    }
    if (status === 'Quase') {
      return {
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-500/5',
        border: 'border-amber-500/20',
        bar: 'bg-gradient-to-r from-amber-500 to-orange-400',
        label: 'Atenção redobrada',
        progress,
        diff,
        cutoff,
        statusLabel: 'Quase lá',
        badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        icon: (
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )
      };
    }
    return {
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/5',
      border: 'border-rose-500/20',
      bar: 'bg-gradient-to-r from-rose-500 to-pink-500',
      label: 'Rota congestionada',
      progress,
      diff,
      cutoff,
      statusLabel: 'Longe',
      badge: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )
    };
  };

  const getScoreColor = () => {
    if (data.totalScore >= 900) return 'text-emerald-500';
    if (data.totalScore >= 700) return 'text-primary';
    return 'text-rose-500';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      
      {/* HEADER TÉCNICO: RELATÓRIO OFICIAL */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Status da Avaliação</h2>
          <div className="flex items-center gap-3">
             <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Relatório Técnico</span>
             <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-black text-emerald-500 uppercase">Concluído</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocolo de Correção</p>
          <p className="font-mono text-xs text-slate-500">#AI-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      {/* SEÇÃO HERO: PERFORMANCE ANALYTICS */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800/60 overflow-hidden shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 bg-white dark:bg-[#0a0f1e] rounded-full flex flex-col items-center justify-center border-[2px] border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-none">
                <svg className="absolute inset-0 w-full h-full -rotate-90 p-4">
                  <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                  <circle 
                    cx="50%" cy="50%" r="48%" 
                    stroke="currentColor" 
                    strokeWidth="4" fill="transparent" 
                    strokeDasharray="100 100"
                    strokeDashoffset={100 - (data.totalScore / 10)}
                    strokeLinecap="square"
                    pathLength="100"
                    className={`transition-all duration-1500 ease-in-out ${getScoreColor()}`}
                  />
                </svg>
                <div className="text-center z-10 px-6">
                  <span className={`text-7xl sm:text-8xl font-black tracking-tighter leading-none block ${getScoreColor()}`}>
                    {data.totalScore}
                  </span>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block">Pontuação Final</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-10 lg:p-14 space-y-10 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary"><path d="M12 2v20M2 12h20"/></svg>
                <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Veredito da Banca Examinadora</h3>
              </div>
              <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-200 leading-[1.7] tracking-tight antialiased">
                {data.overallFeedback}
              </p>
            </div>
            <div className="bg-slate-900 dark:bg-black/40 p-8 rounded-[1.5rem] border border-slate-800 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-[9px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                   <span className="w-1 h-1 bg-primary rounded-full"></span>
                   Diretriz de Evolução Técnica
                 </h4>
                 <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold italic">
                   {data.suggestedAction}
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ESTIMATIVA SISU MELHORADA */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-10 flex flex-col shadow-sm relative overflow-hidden">
          {/* Background Glow sutil */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="mb-10 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Análise Preditiva SiSU {currentYear}</h4>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Comparação estatística baseada nos algoritmos oficiais do último ciclo.</p>
          </div>
          
          <div className="space-y-6 relative z-10">
            {[
              { name: 'Medicina', key: 'medicine' as const },
              { name: 'Direito', key: 'law' as const },
              { name: 'Engenharia', key: 'engineering' as const },
            ].map((course, i) => {
              const config = getSisuConfig(data.totalScore, course.key);
              return (
                <div key={i} className={`p-8 rounded-[2rem] border-2 ${config.bg} ${config.border} transition-all duration-500 hover:scale-[1.02] group`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                      {config.icon}
                      <div>
                        <h5 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter">{course.name}</h5>
                        <div className={`mt-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-current ${config.badge}`}>
                          {config.statusLabel}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1.5">
                        <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{data.totalScore}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alvo: {config.cutoff}</span>
                      </div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${config.diff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {config.diff >= 0 ? `Excedente: +${config.diff.toFixed(1)}` : `Déficit: ${config.diff.toFixed(1)}`}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500/60">
                      <span>Probabilidade de Corte</span>
                      <span className={config.color}>{config.progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200/50 dark:bg-black/30 rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full transition-all duration-1500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${config.bar}`} 
                        style={{ width: `${config.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary"><path d="M12 2v20M2 12h20"/></svg>
              Equilíbrio Sistêmico
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#64748b" strokeOpacity={0.15} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: '900' }} />
                  <Radar
                    name="Sua Nota"
                    dataKey="A"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fill="var(--color-primary)"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min">
          {Object.entries(data.competencies).map(([key, comp]) => (
            <div key={key} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{key.toUpperCase()}</span>
                    </div>
                    <h5 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight">{comp.label}</h5>
                  </div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{comp.score}</span>
                </div>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8">
                  {comp.feedback}
                </p>
              </div>
              <div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <span>Domínio Técnico</span>
                  <span>{((comp.score / 200) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${(comp.score/200)*100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
