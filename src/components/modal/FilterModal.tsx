'use client';

import React from 'react';
import { X, Check, RotateCcw, Sliders, Volume2, Music, Layers, LayoutGrid, Compass } from 'lucide-react';
import { FilterSettings, OptionCountSetting } from '@/types/quiz';
import { ChordQuality } from '@/types/music';

interface FilterModalProps {
  isOpen: boolean;
  filters: FilterSettings;
  onClose: () => void;
  onUpdateFilters: (partial: Partial<FilterSettings>) => void;
  onResetStats: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  filters,
  onClose,
  onUpdateFilters,
  onResetStats,
}) => {
  if (!isOpen) return null;

  const toggleChordQuality = (quality: ChordQuality) => {
    const current = [...filters.selectedQualities];
    const index = current.indexOf(quality);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
        onUpdateFilters({ selectedQualities: current });
      }
    } else {
      current.push(quality);
      onUpdateFilters({ selectedQualities: current });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#23334D] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold font-display">Configurações & Filtros</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-6">
          {/* 1. Quantidade de Alternativas (Escadinha de Dificuldade) */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Quantidade de Alternativas por Pergunta
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 2 as OptionCountSetting, label: '2 Opções', desc: 'Duelo (50%)' },
                { count: 4 as OptionCountSetting, label: '4 Opções', desc: 'Quiz Padrão' },
                { count: 'all' as OptionCountSetting, label: 'Todas', desc: 'Tabuleiro' },
              ].map(({ count, label, desc }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => onUpdateFilters({ optionCount: count })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    filters.optionCount === count
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <strong className="block text-xs font-black">{label}</strong>
                  <span className="text-[10px] opacity-75">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Estilo de Notação */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Notação Musical
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateFilters({ notationStyle: 'anglo' })}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  filters.notationStyle === 'anglo'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                }`}
              >
                <span>Cifras (C, D, Em, G...)</span>
                {filters.notationStyle === 'anglo' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateFilters({ notationStyle: 'latin' })}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  filters.notationStyle === 'latin'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                }`}
              >
                <span>Latina (Dó, Ré, Mi...)</span>
                {filters.notationStyle === 'latin' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* 3. Filtros da Trilha de Notas */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-indigo-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Filtros de Notas
              </label>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-slate-200 font-medium">Incluir Acidentes (# Sustenidos e ♭ Bemóis)</span>
                <input
                  type="checkbox"
                  checked={filters.includeAccidentals}
                  onChange={(e) => onUpdateFilters({ includeAccidentals: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* 4. Filtros da Trilha de Acordes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Acordes Ativos
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {[
                { id: 'major', label: 'Tríades Maiores' },
                { id: 'minor', label: 'Tríades Menores' },
                { id: 'dominant7', label: 'Com Sétima (7)' },
                { id: 'major7', label: 'Sétima Maior (7M)' },
              ].map(({ id, label }) => {
                const isActive = filters.selectedQualities.includes(id as ChordQuality);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleChordQuality(id as ChordQuality)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Reprodução Automática */}
          <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <label className="flex items-center justify-between text-xs cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-medium">Tocar som automaticamente na próxima</span>
              </div>
              <input
                type="checkbox"
                checked={filters.autoPlayNext}
                onChange={(e) => onUpdateFilters({ autoPlayNext: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Rodapé */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Deseja zerar suas estatísticas e histórico de treinos?')) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Histórico</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_3px_0_#047857] active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            Salvar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
