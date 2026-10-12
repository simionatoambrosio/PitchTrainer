'use client';

import React, { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useQuizStore } from '@/store/useQuizStore';
import { Header } from '@/components/layout/Header';
import { ScoreHud } from '@/components/hud/ScoreHud';
import { SoundTriggerHero } from '@/components/audio/SoundTriggerHero';
import { ChoiceCard } from '@/components/quiz/ChoiceCard';
import { FeedbackBanner } from '@/components/quiz/FeedbackBanner';
import { FilterModal } from '@/components/modal/FilterModal';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { VoiceLabModal } from '@/components/voice/VoiceLabModal';
import { JourneyHub } from '@/components/journey/JourneyHub';
import { EvolutionView } from '@/components/evolution/EvolutionView';
import { Compass, Music, Layers, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    currentQuestion,
    selectedOptionId,
    isAnswered,
    isCorrect,
    isAudioPlaying,
    hasAudioUnlocked,
    activeTab,
    isOnboardingOpen,
    isVoiceLabOpen,
    stats,
    filters,
    initQuestion,
    playCurrentAudio,
    submitAnswer,
    nextQuestion,
    switchMode,
    startExercise,
    setActiveTab,
    setIsOnboardingOpen,
    setIsVoiceLabOpen,
    completeOnboarding,
    updateFilters,
    resetStats,
  } = useQuizStore();

  useEffect(() => {
    setIsHydrated(true);
    initQuestion();
  }, [initQuestion]);

  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10B981', '#F59E0B', '#6366F1', '#34D399'],
    });
  }, []);

  const handleSelectOption = async (optionId: string) => {
    const wasCorrect = await submitAnswer(optionId);
    if (wasCorrect && (stats.currentStreak + 1) % 5 === 0) {
      triggerCelebration();
    }
  };

  // Atalhos de teclado no modo Arcade
  useEffect(() => {
    const isAnyModalOpen = isSettingsOpen || isOnboardingOpen || isVoiceLabOpen;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnyModalOpen || e.target instanceof HTMLInputElement || activeTab !== 'arcade') return;

      if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        playCurrentAudio();
        return;
      }

      if (e.key === 'Enter') {
        if (isAnswered) {
          e.preventDefault();
          nextQuestion();
        }
        return;
      }

      if (!isAnswered && currentQuestion) {
        const keyNumber = parseInt(e.key, 10);
        if (keyNumber >= 1 && keyNumber <= 4) {
          const targetOpt = currentQuestion.options.find((o) => o.shortcutNumber === keyNumber);
          if (targetOpt) {
            e.preventDefault();
            handleSelectOption(targetOpt.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isAnswered,
    currentQuestion,
    isSettingsOpen,
    isOnboardingOpen,
    isVoiceLabOpen,
    activeTab,
    playCurrentAudio,
    nextQuestion,
    stats.currentStreak,
  ]);

  if (!isHydrated || !currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin mb-4" />
        <p className="text-slate-400 font-semibold text-sm">Carregando PitchTrainer...</p>
      </div>
    );
  }

  const isCompactBoard = filters.optionCount === 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white">
      {/* 1. Cabeçalho Principal */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsOnboardingOpen(true)}
      />

      {/* 2. Visualização: JORNADA GUIADA */}
      {activeTab === 'journey' && (
        <main className="flex-1">
          <JourneyHub
            masteryByExercise={stats.masteryByExercise}
            onSelectExercise={(type) => startExercise(type)}
            onOpenVoiceLab={() => setIsVoiceLabOpen(true)}
          />
        </main>
      )}

      {/* 3. Visualização: EVOLUÇÃO E ANALYTICS DIÁRIO */}
      {activeTab === 'evolution' && (
        <main className="flex-1">
          <EvolutionView
            stats={stats}
            onStartExercise={(type) => startExercise(type)}
          />
        </main>
      )}

      {/* 4. Visualização: MODO PRÁTICA (ARCADE) */}
      {activeTab === 'arcade' && (
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-3 sm:py-5 flex flex-col justify-between pb-32">
          {/* Seletor rápido de modo no Arcade */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setActiveTab('journey')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar à Trilha</span>
            </button>

            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => switchMode('direction')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filters.mode === 'direction'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Subiu/Desceu
              </button>
              <button
                type="button"
                onClick={() => switchMode('notes')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filters.mode === 'notes'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Notas
              </button>
              <button
                type="button"
                onClick={() => switchMode('chords')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filters.mode === 'chords'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Acordes
              </button>
            </div>
          </div>

          {/* HUD com Streak, Recorde e Precisão */}
          <ScoreHud stats={stats} />

          {/* Hero de Reprodução do Som de Violão */}
          <SoundTriggerHero
            mode={filters.mode}
            isPlaying={isAudioPlaying}
            hasUnlocked={hasAudioUnlocked}
            onPlay={playCurrentAudio}
          />

          {/* Grade de Alternativas */}
          <div className="w-full my-2">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {filters.mode === 'direction'
                  ? 'O 2º som foi mais agudo ou mais grave?'
                  : filters.optionCount === 2
                  ? 'Duelo de 2 Opções (50% de chance):'
                  : 'Escolha uma alternativa:'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Atalhos: <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-slate-400">1</kbd> a <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-slate-400">{Math.min(currentQuestion.options.length, 4)}</kbd>
              </span>
            </div>

            <div
              className={`grid gap-2.5 ${
                filters.optionCount === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : isCompactBoard
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {currentQuestion.options.map((option) => (
                <ChoiceCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptionId === option.id}
                  isAnswered={isAnswered}
                  isCompact={isCompactBoard}
                  onSelect={handleSelectOption}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* 5. Banner de Feedback Inferior estilo Duolingo */}
      {activeTab === 'arcade' && (
        <FeedbackBanner
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          question={currentQuestion}
          currentStreak={stats.currentStreak}
          onContinue={nextQuestion}
        />
      )}

      {/* 6. Modal de Onboarding */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={completeOnboarding}
        onStartLevel0={() => {
          completeOnboarding();
          startExercise('direction');
        }}
      />

      {/* 7. Laboratório de Voz & Zumbido */}
      <VoiceLabModal
        isOpen={isVoiceLabOpen}
        onClose={() => setIsVoiceLabOpen(false)}
      />

      {/* 8. Modal de Configurações e Filtros */}
      <FilterModal
        isOpen={isSettingsOpen}
        filters={filters}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateFilters={updateFilters}
        onResetStats={resetStats}
      />
    </div>
  );
}
