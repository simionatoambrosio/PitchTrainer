import { ChordQuality, NotationStyle, NoteName } from './music';

export type QuizMode = 'notes' | 'chords' | 'direction';

export type ExerciseType =
  | 'direction'      // Subiu ou Desceu? (Contorno Melódico)
  | 'notes_duel'     // Notas - Duelo de 2 Opções
  | 'notes_quiz'     // Notas - Quiz de 4 Opções
  | 'notes_board'    // Notas - Tabuleiro Completo (todas as 7 notas naturais)
  | 'chords_duel'    // Acordes - Duelo Maior vs Menor (2 Opções)
  | 'chords_quiz'    // Acordes - Quiz de 4 Opções
  | 'chords_board';  // Acordes - Tabuleiro Completo

export type OptionCountSetting = 2 | 4 | 'all';

export interface QuizOption {
  id: string;
  label: string;
  subLabel?: string;
  shortcutNumber: number; // 1, 2, 3, 4 ...
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  exerciseType: ExerciseType;
  targetId: string;
  targetLabel: string;
  targetSubLabel: string;
  // Audio playback payload
  frequencies: number[]; // 1 nota para notas, múltiplas para acordes, ou 2 em sequência para direção
  isSequence?: boolean; // se true, toca freq[0] seguido de freq[1]
  sequenceNotes?: { name: string; frequency: number }[];
  options: QuizOption[];
}

export interface DirectionQuestion extends QuizQuestion {
  directionTarget: 'higher' | 'lower'; // o 2º som foi mais agudo (higher) ou mais grave (lower)
  note1Freq: number;
  note2Freq: number;
  note1Label: string;
  note2Label: string;
}

// Estatísticas detalhadas por tipo de exercício em um determinado dia
export interface ExerciseDailyStats {
  total: number;
  correct: number;
  accuracy: number; // 0 - 100%
  bestStreak: number;
}

// Registro diário consolidado
export interface DayRecord {
  date: string; // Formato YYYY-MM-DD
  totalAnswered: number;
  correctAnswers: number;
  overallAccuracy: number;
  byExercise: Partial<Record<ExerciseType, ExerciseDailyStats>>;
}

// Histórico de maestria de vida
export interface ExerciseMastery {
  lifetimeTotal: number;
  lifetimeCorrect: number;
  bestStreak: number;
  accuracy: number;
}

export interface UserStats {
  totalAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  streakMilestonesReached: number[];
  lastSessionDate: string;
  // Histórico por dia (chave = 'YYYY-MM-DD')
  dailyHistory: Record<string, DayRecord>;
  // Maestria acumulada por tipo de exercício
  masteryByExercise: Partial<Record<ExerciseType, ExerciseMastery>>;
  hasSeenOnboarding: boolean;
}

export interface FilterSettings {
  mode: QuizMode;
  activeExercise: ExerciseType;
  optionCount: OptionCountSetting;
  notationStyle: NotationStyle;
  // Notes Track settings
  includeAccidentals: boolean;
  noteOctave: 'all' | 'mid' | 'low';
  // Chords Track settings
  selectedQualities: ChordQuality[];
  // Playback & Game Settings
  autoPlayNext: boolean;
  strumSpeedMs: number;
  soundVolume: number;
}
