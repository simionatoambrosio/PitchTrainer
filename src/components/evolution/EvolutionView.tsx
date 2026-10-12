'use client';

import React, { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  Trophy,
  Target,
  Compass,
  Swords,
  Layers,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { DayRecord, ExerciseDailyStats, ExerciseMastery, ExerciseType, UserStats } from '@/types/quiz';

interface EvolutionViewProps {
  stats: UserStats;
  onStartExercise: (type: ExerciseType) => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({ stats, onStartExercise }) => {
  const [selectedExerciseFilter, setSelectedExerciseFilter] = useState<string>('all');
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  // Gera os últimos 28 dias para o calendário de atividade
  const daysGrid: { dateKey: string; dayNum: number; dayLabel: string; record?: DayRecord }[] = [];
  const today = new Date();

  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    const dayNum = d.getDate();
    const dayLabel = d.toLocaleDateString('pt-BR', { weekday: 'narrow' });
    daysGrid.push({
      dateKey,
      dayNum,
      dayLabel,
      record: stats.dailyHistory[dateKey],
    });
  }

  const selectedDayRecord = selectedDayKey ? stats.dailyHistory[selectedDayKey] : null;

  // Metadados dos exercícios
  const exerciseMeta: Record<
    ExerciseType,
    { title: string; category: string; icon: React.ReactNode; color: string }
  > = {
    direction: {
      title: 'Subiu ou Desceu? (Contorno)',
      category: 'Fundamento',
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40 text-emerald-400',
    },
    notes_duel: {
      title: 'Duelo de 2 Notas (50/50)',
      category: 'Notas',
      icon: <Swords className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/40 text-indigo-400',
    },
    notes_quiz: {
      title: 'Quiz de 4 Notas',
      category: 'Notas',
      icon: <Layers className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/40 text-sky-400',
    },
    notes_board: {
      title: 'Tabuleiro Total de Notas',
      category: 'Notas',
      icon: <LayoutGrid className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 text-purple-400',
    },
    chords_duel: {
      title: 'Duelo: Maior vs Menor',
      category: 'Acordes',
      icon: <Swords className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 text-amber-400',
    },
    chords_quiz: {
      title: 'Quiz de 4 Acordes',
      category: 'Acordes',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 text-amber-400',
    },
    chords_board: {
      title: 'Tabuleiro Total de Acordes',
      category: 'Acordes',
      icon: <LayoutGrid className="w-5 h-5 text-orange-400" />,
      color: 'border-orange-500/40 text-orange-400',
    },
  };

  const exerciseKeys = Object.keys(exerciseMeta) as ExerciseType[];

  const filteredExercises = selectedExerciseFilter === 'all'
    ? exerciseKeys
    : exerciseKeys.filter((k) => k === selectedExerciseFilter);

  // Calcula total de dias ativos
  const activeDaysCount = Object.keys(stats.dailyHistory).length;
  const overallAccuracy = stats.totalAnswered > 0
    ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100)
    : 0;

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header com Métricas Principais */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#121A2B] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Precisão Geral</span>
          </div>
          <strong className="text-2xl font-black text-white">{overallAccuracy}%</strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">{stats.correctAnswers}/{stats.totalAnswered} acertos</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121A2B] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Dias Praticados</span>
          </div>
          <strong className="text-2xl font-black text-white">{activeDaysCount}</strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">Dias com treinos</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121A2B] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Melhor Streak</span>
          </div>
          <strong className="text-2xl font-black text-white">{stats.bestStreak}x</strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">Acertos sem errar</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121A2B] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <span>Streak Atual</span>
          </div>
          <strong className="text-2xl font-black text-white">{stats.currentStreak}x</strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">Sequência ativa</span>
        </div>
      </div>

      {/* 2. Calendário de Atividade dos Últimos 28 Dias */}
      <div className="p-5 rounded-3xl bg-[#111827] border border-[#23334D] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Calendário de Consistência (Últimos 28 Dias)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Clique em um dia para ver o raio-x exato daquela sessão.
            </p>
          </div>

          {selectedDayKey && (
            <button
              type="button"
              onClick={() => setSelectedDayKey(null)}
              className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              Ver Média Histórica
            </button>
          )}
        </div>

        {/* Grade de Dias */}
        <div className="grid grid-cols-7 gap-1.5 pt-2">
          {daysGrid.map(({ dateKey, dayNum, dayLabel, record }) => {
            const hasActivity = record && record.totalAnswered > 0;
            const isSelected = selectedDayKey === dateKey;

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => setSelectedDayKey(isSelected ? null : dateKey)}
                className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 bg-emerald-500/25 border-emerald-400'
                    : hasActivity
                    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800 text-slate-500'
                }`}
                title={`${dateKey}: ${record ? `${record.totalAnswered} questões (${record.overallAccuracy}%)` : 'Sem treino'}`}
              >
                <span className="text-[10px] uppercase font-bold opacity-75">{dayLabel}</span>
                <span className="text-xs font-black">{dayNum}</span>
                {hasActivity && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filtro e Detalhamento por Exercício */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {selectedDayKey
                  ? `Desempenho no Dia ${selectedDayKey}`
                  : 'Desempenho Isolado por Exercício'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Acompanhe sua acurácia em cada treino sem que um exercício difícil afete a nota do outro!
            </p>
          </div>

          {/* Filtro por Exercício */}
          <select
            value={selectedExerciseFilter}
            onChange={(e) => setSelectedExerciseFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Exercícios</option>
            <option value="direction">Subiu ou Desceu?</option>
            <option value="notes_duel">Duelo de 2 Notas</option>
            <option value="notes_quiz">Quiz de 4 Notas</option>
            <option value="notes_board">Tabuleiro de Notas</option>
            <option value="chords_duel">Duelo Maior vs Menor</option>
            <option value="chords_quiz">Quiz de 4 Acordes</option>
            <option value="chords_board">Tabuleiro de Acordes</option>
          </select>
        </div>

        {/* Lista de Cards Detalhados de Cada Exercício */}
        <div className="grid grid-cols-1 gap-3">
          {filteredExercises.map((exKey) => {
            const meta = exerciseMeta[exKey];

            // Se um dia específico estiver selecionado, usa os dados daquele dia; caso contrário, os acumulados
            let attempts = 0;
            let correct = 0;
            let accuracy = 0;
            let bestStreak = 0;

            if (selectedDayRecord) {
              const exDaily = selectedDayRecord.byExercise[exKey];
              if (exDaily) {
                attempts = exDaily.total;
                correct = exDaily.correct;
                accuracy = exDaily.accuracy;
                bestStreak = exDaily.bestStreak;
              }
            } else {
              const mastery = stats.masteryByExercise[exKey];
              if (mastery) {
                attempts = mastery.lifetimeTotal;
                correct = mastery.lifetimeCorrect;
                accuracy = mastery.accuracy;
                bestStreak = mastery.bestStreak;
              }
            }

            // Status formatado
            let statusBadge = { label: 'Não Iniciado', color: 'bg-slate-800 text-slate-400' };
            if (attempts > 0) {
              if (accuracy >= 85) {
                statusBadge = { label: '🌟 Dominado', color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' };
              } else if (accuracy >= 70) {
                statusBadge = { label: '🔥 Ótima Evolução', color: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' };
              } else if (accuracy >= 50) {
                statusBadge = { label: '🌱 Em Construção', color: 'bg-amber-500/20 text-amber-300 border border-amber-500/40' };
              } else {
                statusBadge = { label: '🎯 Ponto de Foco', color: 'bg-rose-500/20 text-rose-300 border border-rose-500/40' };
              }
            }

            return (
              <div
                key={exKey}
                className="p-4 rounded-2xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                    {meta.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-white block">
                        {meta.title}
                      </strong>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Categoria: {meta.category}
                    </span>

                    {/* Barra de Progresso de Precisão */}
                    <div className="w-36 sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Métricas e Botão */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 block">
                        {accuracy}%
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Precisão</span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-200 block">
                        {correct}/{attempts}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Acertos</span>
                    </div>

                    {bestStreak > 0 && (
                      <div className="hidden sm:block">
                        <span className="text-xs font-bold text-amber-400 block">
                          {bestStreak}x
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Recorde</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartExercise(exKey)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700 hover:border-emerald-500 shrink-0"
                  >
                    <span>Treinar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
