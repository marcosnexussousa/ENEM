
export interface CompetencyScore {
  score: number;
  label: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
}

export interface FeedbackResponse {
  totalScore: number;
  competencies: {
    c1: CompetencyScore;
    c2: CompetencyScore;
    c3: CompetencyScore;
    c4: CompetencyScore;
    c5: CompetencyScore;
  };
  overallFeedback: string;
  suggestedAction: string;
  sisuEstimate?: {
    medicine: string; // "Passaria" | "Quase" | "Longe"
    law: string;
    engineering: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'FREE' | 'PRO' | 'MAX';
  correctionsRemaining: number;
  isOnline: boolean;
}

export interface Theme {
  id: string;
  year: string;
  title: string;
  axis: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  motivationTexts: string[];
  variant?: 'ancient';
}

export interface Essay {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  feedback?: FeedbackResponse;
}
