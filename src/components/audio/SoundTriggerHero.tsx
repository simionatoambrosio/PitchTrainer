'use client';

import React from 'react';
import { Volume2, Sparkles, RefreshCw, Compass } from 'lucide-react';
import { QuizMode } from '@/types/quiz';

interface SoundTriggerHeroProps {
  mode: QuizMode;
  isPlaying: boolean;
  hasUnlocked: boolean;
  onPlay: () => void;
}

export const SoundTriggerHero: React.FC<SoundTriggerHeroProps> = ({
  mode,
  isPlaying,
  hasUnlocked,
  onPlay,
}) => {
  const modePrompt =
    mode === 'direction'
      ? 'Ouça os 2 sons: o segundo foi mais agudo (subiu) ou mais grave (desceu)?'
      : mode === 'notes'
      ? 'Qual nota foi tocada no violão?'
      : 'Qual acorde foi tocado no violão?';

  return (
    <div className="w-full max-w-md mx-auto my-4 sm:my-6 flex flex-col items-center justify-center">
      {/* Indicador de Tipo de Pergunta */}
      <div className="flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300 text-center max-w-sm">
        {mode === 'direction' ? (
          <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        )}
        <span>{modePrompt}</span>
      </div>

      {/* Botão Hero Central com Efeito de Ondas Sonoras */}
      <div className="relative flex items-center justify-center p-3">
        {isPlaying && (
          <>
            <div className="absolute w-36 h-36 rounded-full border-2 border-emerald-500/40 animate-ripple pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full border border-emerald-400/20 animate-ripple pointer-events-none [animation-delay:0.4s]" />
          </>
        )}

        <button
          id="btn-play-sound"
          type="button"
          onClick={onPlay}
          className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-150 select-none cursor-pointer ${
            isPlaying
              ? 'bg-emerald-500 text-white scale-95 shadow-[0_0_24px_rgba(16,185,129,0.5)] border-4 border-emerald-400'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 shadow-[0_8px_0_#047857] hover:shadow-[0_10px_0_#047857] active:shadow-[0_2px_0_#047857] active:translate-y-1.5 border-2 border-emerald-400/50'
          }`}
          aria-label="Tocar som de violão do desafio"
        >
          <Volume2 className={`w-10 h-10 sm:w-12 sm:h-12 transition-transform ${isPlaying ? 'scale-110' : ''}`} />
          <span className="text-[11px] font-bold mt-1 tracking-wide uppercase opacity-90">
            {isPlaying ? 'Tocando...' : mode === 'direction' ? 'Ouvir Sons' : 'Ouvir Som'}
          </span>
        </button>
      </div>

      {/* Botão de Repetição com Atalho [Espaço] */}
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onPlay}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Ouvir Novamente</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-900 border border-slate-700 rounded text-slate-400 font-mono">
            Espaço
          </kbd>
        </button>
      </div>

      {!hasUnlocked && (
        <p className="text-[11px] text-emerald-400/80 mt-2 text-center animate-pulse">
          Toque para ativar o áudio do violão no navegador
        </p>
      )}
    </div>
  );
};
