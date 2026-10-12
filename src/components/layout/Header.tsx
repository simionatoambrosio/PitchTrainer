'use client';

import React from 'react';
import { Music, SlidersHorizontal, HelpCircle, Compass, Play, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'journey' | 'arcade' | 'evolution';
  onSelectTab: (tab: 'journey' | 'arcade' | 'evolution') => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings,
  onOpenHelp,
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo PitchTrainer */}
        <div
          onClick={() => onSelectTab('journey')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.35)] shrink-0">
            <Music className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display">
                Pitch<span className="text-emerald-400">Trainer</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Treino de Ouvido no Violão
            </p>
          </div>
        </div>

        {/* Seletor de Telas Centrais: Jornada / Arcade / Evolução */}
        <nav aria-label="Navegação Principal" className="flex items-center p-1 bg-[#141C2B] rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => onSelectTab('journey')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'journey'
                ? 'bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.35)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Jornada</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('arcade')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'arcade'
                ? 'bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.35)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Prática</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('evolution')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'evolution'
                ? 'bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.35)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Evolução</span>
          </button>
        </nav>

        {/* Botões de Ação Direita: Ajuda / Configurações */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenHelp}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Como Funciona (Método)"
            aria-label="Abrir guia de como funciona o método"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Filtros e Configurações"
            aria-label="Abrir filtros de treino"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
