'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

interface FeedbackBannerProps {
  isAnswered: boolean;
  isCorrect: boolean | null;
  question: QuizQuestion | null;
  currentStreak: number;
  onContinue: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  isAnswered,
  isCorrect,
  question,
  currentStreak,
  onContinue,
}) => {
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  // Foco automático no botão de continuar ao responder para navegação rápida via Enter
  useEffect(() => {
    if (isAnswered && continueButtonRef.current) {
      continueButtonRef.current.focus();
    }
  }, [isAnswered]);

  if (!isAnswered || !question) return null;

  const isSuccess = isCorrect === true;

  return (
    <aside
      aria-label="Resultado da resposta"
      className={`fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 transition-all duration-300 transform translate-y-0 shadow-2xl backdrop-blur-xl ${
        isSuccess
          ? 'bg-[#064E3B]/95 border-t-2 border-[#059669]'
          : 'bg-[#450A0A]/95 border-t-2 border-[#991B1B]'
      }`}
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Lado Esquerdo: Mensagem e Explicação */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              isSuccess ? 'bg-[#059669] text-white' : 'bg-[#DC2626] text-white'
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-7 h-7" />
            ) : (
              <AlertCircle className="w-7 h-7" />
            )}
          </div>

          <div className="flex flex-col">
            <h2 className={`text-lg sm:text-xl font-black tracking-tight ${
              isSuccess ? 'text-white' : 'text-red-200'
            }`}>
              {isSuccess ? 'Na mosca! Muito bem!' : 'Quase lá!'}
            </h2>
            <p className={`text-xs sm:text-sm font-medium ${
              isSuccess ? 'text-emerald-200' : 'text-red-300'
            }`}>
              {isSuccess
                ? `Você identificou corretamente: ${question.targetLabel} (${question.targetSubLabel}).`
                : `A resposta correta era ${question.targetLabel} (${question.targetSubLabel}).`}
            </p>
            {isSuccess && currentStreak >= 3 && (
              <span className="text-[11px] font-bold text-amber-300 mt-0.5">
                🔥 Sequência incrível de {currentStreak} acertos seguidos!
              </span>
            )}
          </div>
        </div>

        {/* Lado Direito: Botão Continuar com Atalho [Enter] */}
        <button
          ref={continueButtonRef}
          id="btn-continue-quiz"
          type="button"
          onClick={onContinue}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm tracking-wide uppercase transition-all duration-100 flex items-center justify-center gap-2 select-none cursor-pointer ${
            isSuccess
              ? 'bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_5px_0_#047857] active:shadow-none active:translate-y-1'
              : 'bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-[0_5px_0_#991B1B] active:shadow-none active:translate-y-1'
          }`}
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/30 rounded font-mono lowercase">
            enter
          </kbd>
        </button>
      </div>
    </aside>
  );
};
