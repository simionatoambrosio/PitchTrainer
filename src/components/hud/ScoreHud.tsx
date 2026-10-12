'use client';

import React from 'react';
import { Flame, Trophy, Target, Zap } from 'lucide-react';
import { UserStats } from '@/types/quiz';

interface ScoreHudProps {
  stats: UserStats;
}

export const ScoreHud: React.FC<ScoreHudProps> = ({ stats }) => {
  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100)
    : 0;

  const isHighStreak = stats.currentStreak >= 5;

  return (
    <div className="w-full max-w-xl mx-auto flex items-center justify-between gap-2 px-3 py-2 bg-[#131C2D]/80 backdrop-blur-md rounded-2xl border border-[#22314A]">
      {/* Streak Atual */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
          isHighStreak
            ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
            : 'text-amber-500'
        }`}
        title="Sua sequência atual de acertos sem errar"
      >
        <Flame
          className={`w-5 h-5 ${isHighStreak ? 'animate-flame fill-amber-500 text-amber-400' : 'text-amber-500'}`}
        />
        <span className="font-extrabold text-base tracking-tight">
          {stats.currentStreak}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-bold hidden sm:inline">
          Streak
        </span>
      </div>

      {/* Recorde (Best Streak) */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-400 hover:text-slate-300 transition-colors"
        title="Melhor sequência de acertos alcançada"
      >
        <Trophy className="w-4 h-4 text-yellow-500/80" />
        <span className="text-xs font-semibold">
          Recorde: <strong className="text-slate-200">{stats.bestStreak}</strong>
        </span>
      </div>

      {/* Taxa de Precisão */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-emerald-400"
        title="Taxa de acertos da sessão"
      >
        <Target className="w-4 h-4" />
        <span className="text-xs font-semibold">
          {accuracy}%
        </span>
      </div>

      {/* Total Respondido */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-400 hidden sm:flex"
        title="Total de perguntas respondidas"
      >
        <Zap className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-medium text-slate-300">
          {stats.correctAnswers}/{stats.totalAnswered}
        </span>
      </div>
    </div>
  );
};
