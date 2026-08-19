export type StageId = 
  | 'welcome'
  | 'mission1_subjects'
  | 'mission2_spelling'
  | 'mission3_boss_spelling'
  | 'mission4_does_trap'
  | 'mission5_grand_battle'
  | 'results';

export type QuestionCategory = 
  | 'subject_id' 
  | 'spelling_rules' 
  | 'negative_doesnt' 
  | 'question_does' 
  | 'mixed';

export type QuestionType = 
  | 'multiple_choice' 
  | 'fill_blank' 
  | 'sentence_correction' 
  | 'sort_category' 
  | 'spot_s_position';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  vietnameseMeaning?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hintSteps: string[];
  highlightWords?: string[];
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface UserAnswerRecord {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  questionText: string;
  explanation: string;
}

export interface UserProgress {
  xp: number;
  combo: number;
  maxCombo: number;
  completedMissions: StageId[];
  badges: Badge[];
  history: UserAnswerRecord[];
  soundEnabled: boolean;
}
