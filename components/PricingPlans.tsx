
import React, { useState } from 'react';

export const PricingPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Básico',
      price: '0',
      description: 'Perfeito para quem está começando a treinar.',
      features: [
        '2 correções por mês',
        'Feedback básico de competências',
        'Acesso a temas antigos',
        'Suporte via comunidade'
      ],
      cta: 'Começar Grátis',
      highlighted: false,
    },
    {
      name: 'Aprova Pro',
      price: isAnnual ? '24,90' : '34,90',
      description: 'O caminho mais rápido para os 900+ pontos.',
      features: [
        'Correções ilimitadas',
        'Feedback granular por IA',
        'Simulador SiSU em tempo real',
        'Todos os temas (Enem + Inéditos)',
        'Análise de tempo de escrita'
      ],
      cta: 'Assinar Agora',
      highlighted: true,
      tag: 'Mais Popular'
    },
    {
      name: 'Aprova Max',
      price: isAnnual ? '49,90' : '64,90',
      description: 'Mentoria completa para medicina e cursos concorridos.',
      features: [
        'Tudo do plano Pro',
        'Correção humana (1/mês)',
        'Plano de estudo personalizado',
        'Análise de videoaula inclusa',
        'Suporte prioritário 24/7'
      ],
      cta: 'Seja Elite',
      highlighted: false,
    }
  ];

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Investimento</h3>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
          O melhor custo-benefício para sua <span className="text-indigo-600">Aprovação</span>
        </h2>
        
        {/* Toggle Anual/Mensal */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Mensal</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative transition-colors"
          >
            <div className={`w-5 h-5 bg-indigo-600 rounded-full transition-all duration-300 transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Anual <span className="ml-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full uppercase">Economize 30%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i}
            className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 group flex flex-col ${
              plan.highlighted 
                ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' 
                : 'bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {plan.tag && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                {plan.tag}
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-400">R$</span>
              <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
              <span className="text-sm font-bold text-slate-400">/mês</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 ${
              plan.highlighted 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-700' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-indigo-50 dark:bg-indigo-500/5 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/20 text-center">
        <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
          ✨ Instituição de ensino? <a href="#" className="underline decoration-indigo-300 underline-offset-4 hover:text-indigo-900 transition-colors">Conheça nossos planos corporativos para escolas.</a>
        </p>
      </div>
    </div>
  );
};
