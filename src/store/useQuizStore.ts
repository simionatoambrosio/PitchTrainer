import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DayRecord,
  ExerciseDailyStats,
  ExerciseMastery,
  ExerciseType,
  FilterSettings,
  QuizMode,
  QuizQuestion,
  UserStats,
} from '@/types/quiz';
import { generateNextQuizQuestion } from '@/lib/music/quizGenerator';
import { audioEngine } from '@/lib/audio/AudioEngine';

interface QuizState {
  currentQuestion: QuizQuestion | null;
  selectedOptionId: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  isAudioPlaying: boolean;
  hasAudioUnlocked: boolean;

  // Navegação de Telas principais
  activeTab: 'journey' | 'arcade' | 'evolution';
  isOnboardingOpen: boolean;
  isVoiceLabOpen: boolean;

  stats: UserStats;
  filters: FilterSettings;

  // Ações
  initQuestion: () => void;
  playCurrentAudio: () => Promise<void>;
  submitAnswer: (optionId: string) => Promise<boolean>;
  nextQuestion: () => void;
  switchMode: (newMode: QuizMode) => void;
  startExercise: (exerciseType: ExerciseType) => void;
  setActiveTab: (tab: 'journey' | 'arcade' | 'evolution') => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setIsVoiceLabOpen: (open: boolean) => void;
  completeOnboarding: () => void;
  updateFilters: (partial: Partial<FilterSettings>) => void;
  resetStats: () => void;
}

const DEFAULT_FILTERS: FilterSettings = {
  mode: 'direction',
  activeExercise: 'direction',
  optionCount: 2,
  notationStyle: 'anglo',
  includeAccidentals: false,
  noteOctave: 'all',
  selectedQualities: ['major', 'minor'],
  autoPlayNext: true,
  strumSpeedMs: 28,
  soundVolume: 0.85,
};

const DEFAULT_STATS: UserStats = {
  totalAnswered: 0,
  correctAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  streakMilestonesReached: [],
  lastSessionDate: new Date().toISOString(),
  dailyHistory: {},
  masteryByExercise: {},
  hasSeenOnboarding: false,
};

function getTodayKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuestion: null,
      selectedOptionId: null,
      isAnswered: false,
      isCorrect: null,
      isAudioPlaying: false,
      hasAudioUnlocked: false,

      activeTab: 'journey',
      isOnboardingOpen: false,
      isVoiceLabOpen: false,

      stats: DEFAULT_STATS,
      filters: DEFAULT_FILTERS,

      initQuestion: () => {
        const state = get();
        if (!state.currentQuestion) {
          const q = generateNextQuizQuestion(state.filters);
          set({ currentQuestion: q });
        }

        // Se o usuário nunca viu o onboarding, abre automaticamente
        if (!state.stats.hasSeenOnboarding) {
          set({ isOnboardingOpen: true });
        }
      },

      playCurrentAudio: async () => {
        const { currentQuestion, filters } = get();
        if (!currentQuestion) return;

        set({ isAudioPlaying: true, hasAudioUnlocked: true });

        try {
          if (currentQuestion.isSequence && currentQuestion.frequencies.length >= 2) {
            await audioEngine.playTwoNotesSequence(
              currentQuestion.frequencies[0],
              currentQuestion.frequencies[1],
              400,
              filters.soundVolume
            );
          } else if (currentQuestion.mode === 'notes') {
            await audioEngine.playNote(currentQuestion.frequencies[0], filters.soundVolume);
          } else {
            await audioEngine.playChord(currentQuestion.frequencies, filters.strumSpeedMs, filters.soundVolume);
          }
        } finally {
          setTimeout(() => {
            set({ isAudioPlaying: false });
          }, 500);
        }
      },

      submitAnswer: async (optionId: string) => {
        const { currentQuestion, isAnswered, stats, filters } = get();
        if (isAnswered || !currentQuestion) return false;

        const chosenOption = currentQuestion.options.find((opt) => opt.id === optionId);
        if (!chosenOption) return false;

        const isCorrect = chosenOption.isCorrect;
        const exerciseType = currentQuestion.exerciseType || filters.activeExercise;
        const todayKey = getTodayKey();

        // 1. Atualiza métricas globais
        const newTotal = stats.totalAnswered + 1;
        const newCorrect = stats.correctAnswers + (isCorrect ? 1 : 0);
        const newCurrentStreak = isCorrect ? stats.currentStreak + 1 : 0;
        const newBestStreak = Math.max(stats.bestStreak, newCurrentStreak);

        // 2. Atualiza ou cria o registro diário do dia atual
        const existingDay: DayRecord = stats.dailyHistory[todayKey] || {
          date: todayKey,
          totalAnswered: 0,
          correctAnswers: 0,
          overallAccuracy: 0,
          byExercise: {},
        };

        const existingExDaily: ExerciseDailyStats = existingDay.byExercise[exerciseType] || {
          total: 0,
          correct: 0,
          accuracy: 0,
          bestStreak: 0,
        };

        const updatedExDaily: ExerciseDailyStats = {
          total: existingExDaily.total + 1,
          correct: existingExDaily.correct + (isCorrect ? 1 : 0),
          accuracy: Math.round(((existingExDaily.correct + (isCorrect ? 1 : 0)) / (existingExDaily.total + 1)) * 100),
          bestStreak: Math.max(existingExDaily.bestStreak, newCurrentStreak),
        };

        const updatedDay: DayRecord = {
          ...existingDay,
          totalAnswered: existingDay.totalAnswered + 1,
          correctAnswers: existingDay.correctAnswers + (isCorrect ? 1 : 0),
          overallAccuracy: Math.round(
            ((existingDay.correctAnswers + (isCorrect ? 1 : 0)) / (existingDay.totalAnswered + 1)) * 100
          ),
          byExercise: {
            ...existingDay.byExercise,
            [exerciseType]: updatedExDaily,
          },
        };

        // 3. Atualiza maestria cumulativa por exercício
        const existingMastery: ExerciseMastery = stats.masteryByExercise[exerciseType] || {
          lifetimeTotal: 0,
          lifetimeCorrect: 0,
          bestStreak: 0,
          accuracy: 0,
        };

        const updatedMastery: ExerciseMastery = {
          lifetimeTotal: existingMastery.lifetimeTotal + 1,
          lifetimeCorrect: existingMastery.lifetimeCorrect + (isCorrect ? 1 : 0),
          bestStreak: Math.max(existingMastery.bestStreak, newCurrentStreak),
          accuracy: Math.round(
            ((existingMastery.lifetimeCorrect + (isCorrect ? 1 : 0)) / (existingMastery.lifetimeTotal + 1)) * 100
          ),
        };

        set({
          selectedOptionId: optionId,
          isAnswered: true,
          isCorrect,
          stats: {
            ...stats,
            totalAnswered: newTotal,
            correctAnswers: newCorrect,
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
            lastSessionDate: new Date().toISOString(),
            dailyHistory: {
              ...stats.dailyHistory,
              [todayKey]: updatedDay,
            },
            masteryByExercise: {
              ...stats.masteryByExercise,
              [exerciseType]: updatedMastery,
            },
          },
        });

        // Efeitos sonoros
        if (isCorrect) {
          if (newCurrentStreak > 0 && newCurrentStreak % 5 === 0) {
            await audioEngine.playStreakFanfare();
          } else {
            await audioEngine.playSuccessSfx();
          }
        } else {
          await audioEngine.playErrorSfx();
        }

        return isCorrect;
      },

      nextQuestion: () => {
        const { filters } = get();
        const nextQ = generateNextQuizQuestion(filters);

        set({
          currentQuestion: nextQ,
          selectedOptionId: null,
          isAnswered: false,
          isCorrect: null,
        });

        if (filters.autoPlayNext) {
          setTimeout(() => {
            get().playCurrentAudio();
          }, 200);
        }
      },

      switchMode: (newMode: QuizMode) => {
        const currentFilters = get().filters;
        const updatedFilters: FilterSettings = {
          ...currentFilters,
          mode: newMode,
          activeExercise: newMode === 'direction' ? 'direction' : newMode === 'notes' ? 'notes_quiz' : 'chords_quiz',
          optionCount: newMode === 'direction' ? 2 : currentFilters.optionCount,
        };
        const nextQ = generateNextQuizQuestion(updatedFilters);

        set({
          filters: updatedFilters,
          currentQuestion: nextQ,
          selectedOptionId: null,
          isAnswered: false,
          isCorrect: null,
          activeTab: 'arcade',
        });

        if (updatedFilters.autoPlayNext) {
          setTimeout(() => {
            get().playCurrentAudio();
          }, 250);
        }
      },

      startExercise: (exerciseType: ExerciseType) => {
        const currentFilters = get().filters;
        let newMode: QuizMode = 'notes';
        let optionCount: FilterSettings['optionCount'] = 4;

        if (exerciseType === 'direction') {
          newMode = 'direction';
          optionCount = 2;
        } else if (exerciseType === 'notes_duel') {
          newMode = 'notes';
          optionCount = 2;
        } else if (exerciseType === 'notes_quiz') {
          newMode = 'notes';
          optionCount = 4;
        } else if (exerciseType === 'notes_board') {
          newMode = 'notes';
          optionCount = 'all';
        } else if (exerciseType === 'chords_duel') {
          newMode = 'chords';
          optionCount = 2;
        } else if (exerciseType === 'chords_quiz') {
          newMode = 'chords';
          optionCount = 4;
        } else if (exerciseType === 'chords_board') {
          newMode = 'chords';
          optionCount = 'all';
        }

        const updatedFilters: FilterSettings = {
          ...currentFilters,
          mode: newMode,
          activeExercise: exerciseType,
          optionCount,
        };

        const nextQ = generateNextQuizQuestion(updatedFilters);

        set({
          filters: updatedFilters,
          currentQuestion: nextQ,
          selectedOptionId: null,
          isAnswered: false,
          isCorrect: null,
          activeTab: 'arcade',
        });

        if (updatedFilters.autoPlayNext) {
          setTimeout(() => {
            get().playCurrentAudio();
          }, 300);
        }
      },

      setActiveTab: (tab) => set({ activeTab: tab }),
      setIsOnboardingOpen: (open) => set({ isOnboardingOpen: open }),
      setIsVoiceLabOpen: (open) => set({ isVoiceLabOpen: open }),

      completeOnboarding: () => {
        set((state) => ({
          isOnboardingOpen: false,
          stats: { ...state.stats, hasSeenOnboarding: true },
        }));
      },

      updateFilters: (partial: Partial<FilterSettings>) => {
        const currentFilters = get().filters;
        const updatedFilters: FilterSettings = { ...currentFilters, ...partial };
        const nextQ = generateNextQuizQuestion(updatedFilters);

        set({
          filters: updatedFilters,
          currentQuestion: nextQ,
          selectedOptionId: null,
          isAnswered: false,
          isCorrect: null,
        });
      },

      resetStats: () => {
        set({
          stats: {
            ...DEFAULT_STATS,
            hasSeenOnboarding: true,
            lastSessionDate: new Date().toISOString(),
          },
        });
      },
    }),
    {
      name: 'pitch_trainer_store_v2',
      partialize: (state) => ({
        stats: state.stats,
        filters: state.filters,
      }),
    }
  )
);
