
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { EssayEditor } from './components/EssayEditor';
import { FeedbackDashboard } from './components/FeedbackDashboard';
import { ThemeSelector } from './components/ThemeSelector';
import { PricingPlans } from './components/PricingPlans';
import { correctEssay } from './services/geminiService';
import { FREE_THEME } from './data/themes';
import { FeedbackResponse, Theme, User } from './types';

type ViewState = 'home' | 'editor' | 'feedback' | 'pricing';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // MOCK USER STATE
  const [user, setUser] = useState<User>({
    id: 'user-001',
    name: 'João Silva',
    email: 'joao.silva@aluno.com',
    avatarUrl: 'https://picsum.photos/seed/user-44/100/100',
    plan: 'PRO',
    correctionsRemaining: 12,
    isOnline: true
  });

  const currentYear = new Date().getFullYear();

  const handleUpdateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!selectedTheme) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await correctEssay(text, selectedTheme);
      setFeedback(result);
      
      // Simular consumo de cota
      handleUpdateUser({ correctionsRemaining: Math.max(0, user.correctionsRemaining - 1) });
      
      setView('feedback');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Houve um erro técnico. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedTheme, user.correctionsRemaining, handleUpdateUser]);

  const handleNewBlankEssay = useCallback(() => {
    setFeedback(null);
    setSelectedTheme(FREE_THEME);
    setError(null);
    setView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = useCallback(() => {
    setFeedback(null);
    setSelectedTheme(null);
    setError(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShowPricing = useCallback(() => {
    setView('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Layout 
      user={user}
      onUpdateUser={handleUpdateUser}
      onNewEssay={handleNewBlankEssay} 
      onShowPricing={handleShowPricing} 
      onGoHome={handleGoHome}
    >
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        
        {/* VIEW: HOME (Catálogo) */}
        {view === 'home' && !isAnalyzing && (
          <>
            <section className="text-center space-y-8 py-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest animate-bounce">
                🚀 Temas {currentYear} Disponíveis
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                Transforme seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Potencial</span><br/>em Aprovação.
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                Olá, {user.name.split(' ')[0]}! Selecione um tema e comece sua jornada. Você ainda tem {user.correctionsRemaining} créditos Pro.
              </p>
            </section>
            <ThemeSelector onSelect={(theme) => {
              setSelectedTheme(theme);
              setView('editor');
            }} />
          </>
        )}

        {/* VIEW: PRICING */}
        {view === 'pricing' && (
          <PricingPlans />
        )}

        {/* VIEW: EDITOR */}
        {view === 'editor' && selectedTheme && (
          <EssayEditor 
            selectedTheme={selectedTheme} 
            onAnalyze={handleAnalyze} 
            isLoading={isAnalyzing} 
            onBack={handleGoHome}
          />
        )}

        {/* VIEW: FEEDBACK */}
        {view === 'feedback' && feedback && !isAnalyzing && (
          <div className="space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Análise da Proposta</h2>
              <div className="flex gap-4">
                <button onClick={handleGoHome} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Ver Temas
                </button>
                <button onClick={handleNewBlankEssay} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                  Nova Redação
                </button>
              </div>
            </div>
            <FeedbackDashboard data={feedback} />
          </div>
        )}

        {/* LOADING STATE */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-pulse">
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <h3 className="text-2xl font-black dark:text-white">IA está lendo cada linha...</h3>
              <p className="text-slate-500 font-medium">Sincronizando modelos neurais para sua correção.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-3xl text-rose-700 dark:text-rose-400 font-bold flex items-center gap-4">
            <span className="text-2xl">⚠️</span> {error}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
