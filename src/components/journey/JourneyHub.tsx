'use client';

import React from 'react';
import {
  Compass,
  Mic,
  Swords,
  Layers,
  LayoutGrid,
  Sparkles,
  Trophy,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { ExerciseMastery, ExerciseType } from '@/types/quiz';

interface JourneyHubProps {
  masteryByExercise: Partial<Record<ExerciseType, ExerciseMastery>>;
  onSelectExercise: (type: ExerciseType) => void;
  onOpenVoiceLab: () => void;
}

export const JourneyHub: React.FC<JourneyHubProps> = ({
  masteryByExercise,
  onSelectExercise,
  onOpenVoiceLab,
}) => {
  const stages = [
    {
      title: 'Fase 1: Fundamentos da Percepção',
      subtitle: 'Construa a conexão entre ouvido, cérebro e voz antes de dar nome às notas.',
      badge: 'Essencial',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      exercises: [
        {
          id: 'direction' as ExerciseType,
          title: 'Subiu ou Desceu?',
          subtitle: 'Contorno Melódico: perceba se o 2º som foi mais agudo ou mais grave.',
          icon: <Compass className="w-5 h-5 text-emerald-400" />,
          difficulty: 'Nível 0 (Fácil)',
          recommended: true,
          action: () => onSelectExercise('direction'),
        },
        {
          id: 'voice_lab',
          title: 'Laboratório de Voz (Zumbido)',
          subtitle: 'Aprenda a técnica do Humming para sentir e afinar a nota com sua voz.',
          icon: <Mic className="w-5 h-5 text-indigo-400" />,
          difficulty: 'Tutorial Prático',
          recommended: false,
          isCustomAction: true,
          action: onOpenVoiceLab,
        },
      ],
    },
    {
      title: 'Fase 2: Reconhecimento de Notas',
      subtitle: 'Identifique notas individuais do violão sem sensação de adivinhação.',
      badge: 'Notas',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      exercises: [
        {
          id: 'notes_duel' as ExerciseType,
          title: 'Duelo de 2 Notas (50/50)',
          subtitle: 'Apenas 2 alternativas de alto contraste. Sem sobrecarga mental.',
          icon: <Swords className="w-5 h-5 text-indigo-400" />,
          difficulty: 'Nível 1',
          recommended: false,
          action: () => onSelectExercise('notes_duel'),
        },
        {
          id: 'notes_quiz' as ExerciseType,
          title: 'Quiz de 4 Notas',
          subtitle: 'Desafio clássico com 4 opções com notas naturais e acidentes.',
          icon: <Layers className="w-5 h-5 text-sky-400" />,
          difficulty: 'Nível 2',
          recommended: false,
          action: () => onSelectExercise('notes_quiz'),
        },
        {
          id: 'notes_board' as ExerciseType,
          title: 'Tabuleiro Total de Notas',
          subtitle: 'Todas as notas sempre na tela. Encontre a nota certa no mapa completo.',
          icon: <LayoutGrid className="w-5 h-5 text-purple-400" />,
          difficulty: 'Nível 3 (Maestria)',
          recommended: false,
          action: () => onSelectExercise('notes_board'),
        },
      ],
    },
    {
      title: 'Fase 3: Reconhecimento de Acordes',
      subtitle: 'Treine a percepção das cores e qualidades harmônicas do violão.',
      badge: 'Harmonia',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      exercises: [
        {
          id: 'chords_duel' as ExerciseType,
          title: 'Duelo: Maior vs Menor',
          subtitle: 'Contraste binário entre o som aberto/alegre e o som fechado/melancólico.',
          icon: <Swords className="w-5 h-5 text-amber-400" />,
          difficulty: 'Nível 1',
          recommended: false,
          action: () => onSelectExercise('chords_duel'),
        },
        {
          id: 'chords_quiz' as ExerciseType,
          title: 'Quiz de 4 Acordes',
          subtitle: 'Identifique C, Am, G, Dm, E7 e outras fôrmas reais de violão.',
          icon: <Layers className="w-5 h-5 text-amber-400" />,
          difficulty: 'Nível 2',
          recommended: false,
          action: () => onSelectExercise('chords_quiz'),
        },
        {
          id: 'chords_board' as ExerciseType,
          title: 'Tabuleiro Total de Acordes',
          subtitle: 'Todos os principais acordes do violão visíveis simultaneamente.',
          icon: <LayoutGrid className="w-5 h-5 text-orange-400" />,
          difficulty: 'Nível 3 (Maestria)',
          recommended: false,
          action: () => onSelectExercise('chords_board'),
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-200">
      {/* Banner de Boas-Vindas da Jornada */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#121E33] to-[#0D1524] border border-[#233552] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Método dos 4 Degraus
            </span>
            <span className="text-xs text-slate-400 font-medium">Jornada Pedagógica</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-display">
            Sua Trilha de Aprendizado de Ouvido
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Siga a ordem recomendada para treinar seu ouvido sem pular etapas. Cada exercício constrói a base do próximo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectExercise('direction')}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_0_#047857] active:translate-y-1 active:shadow-none cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Começar Nível 0</span>
        </button>
      </div>

      {/* Fases da Jornada */}
      <div className="space-y-8">
        {stages.map((stage, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white font-display flex items-center gap-2">
                  <span>{stage.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${stage.badgeColor}`}>
                    {stage.badge}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">{stage.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stage.exercises.map((ex) => {
                const mastery = (!ex.isCustomAction && ex.id in masteryByExercise)
                  ? masteryByExercise[ex.id as ExerciseType]
                  : null;

                const attempts = mastery?.lifetimeTotal || 0;
                const accuracy = mastery?.accuracy || 0;
                const bestStreak = mastery?.bestStreak || 0;

                return (
                  <div
                    key={ex.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      ex.recommended
                        ? 'bg-[#14233D] border-emerald-500/40 shadow-[0_0_16px_rgba(16,185,129,0.12)]'
                        : 'bg-[#101826] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                            {ex.icon}
                          </div>
                          <div>
                            <strong className="text-sm font-bold text-white block">
                              {ex.title}
                            </strong>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {ex.difficulty}
                            </span>
                          </div>
                        </div>

                        {ex.recommended && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            Recomendado
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {ex.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {/* Métricas do Exercício */}
                      {attempts > 0 ? (
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1 font-bold text-emerald-400">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {accuracy}%
                          </span>
                          <span>{attempts} treinos</span>
                          {bestStreak > 0 && (
                            <span className="flex items-center gap-1 text-amber-400 font-semibold">
                              <Trophy className="w-3 h-3" />
                              {bestStreak}x
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">
                          Ainda não praticado
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={ex.action}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                          ex.recommended
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_3px_0_#047857] active:translate-y-0.5'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 active:translate-y-0.5'
                        }`}
                      >
                        <span>Praticar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
