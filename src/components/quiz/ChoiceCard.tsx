'use client';

import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { QuizOption } from '@/types/quiz';

interface ChoiceCardProps {
  option: QuizOption;
  isSelected: boolean;
  isAnswered: boolean;
  isCompact?: boolean;
  onSelect: (optionId: string) => void;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  option,
  isSelected,
  isAnswered,
  isCompact = false,
  onSelect,
}) => {
  let stateStyles = 'bg-[#182234] hover:bg-[#223049] text-white border-b-4 border-[#2E3F5B] shadow-[0_4px_0_#172233]';

  if (isAnswered) {
    if (option.isCorrect) {
      stateStyles = 'bg-[#064E3B] text-[#34D399] border-b-4 border-[#059669] shadow-[0_4px_0_#065F46] ring-2 ring-emerald-400/40';
    } else if (isSelected && !option.isCorrect) {
      stateStyles = 'bg-[#7F1D1D] text-[#F87171] border-b-4 border-[#DC2626] shadow-[0_4px_0_#991B1B] animate-shake';
    } else {
      stateStyles = 'bg-[#121A28] opacity-50 text-slate-400 border-b-4 border-[#1E2B3E]';
    }
  }

  return (
    <button
      id={`choice-card-${option.id}`}
      type="button"
      disabled={isAnswered}
      onClick={() => onSelect(option.id)}
      className={`relative w-full ${
        isCompact ? 'min-h-[64px] p-3' : 'min-h-[80px] sm:min-h-[92px] p-4'
      } rounded-2xl flex items-center justify-between transition-all duration-100 select-none cursor-pointer text-left ${stateStyles} ${
        !isAnswered ? 'active:translate-y-1 active:border-b-0 active:shadow-none' : ''
      }`}
    >
      <div className="flex flex-col">
        <span className={`${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-extrabold tracking-tight font-display`}>
          {option.label}
        </span>
        {option.subLabel && (
          <span className="text-[11px] sm:text-xs font-medium opacity-80 mt-0.5">
            {option.subLabel}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isAnswered && option.isCorrect && (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
        )}
        {isAnswered && isSelected && !option.isCorrect && (
          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
        )}

        {option.shortcutNumber > 0 && option.shortcutNumber <= 4 && (
          <span className="w-6 h-6 rounded-md bg-slate-900/60 border border-slate-700/60 flex items-center justify-center text-[10px] font-mono font-bold text-slate-300 shrink-0">
            {option.shortcutNumber}
          </span>
        )}
      </div>
    </button>
  );
};
