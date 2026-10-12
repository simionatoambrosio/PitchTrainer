'use client';

import React, { useState } from 'react';
import { X, Mic, Volume2, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { audioEngine } from '@/lib/audio/AudioEngine';

interface VoiceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceLabModal: React.FC<VoiceLabModalProps> = ({ isOpen, onClose }) => {
  const [selectedNote, setSelectedNote] = useState<{ name: string; namePt: string; freq: number; tip: string }>({
    name: 'A2',
    namePt: 'Lá (5ª corda)',
    freq: 110.0,
    tip: 'Vibração média confortável para quase qualquer voz.',
  });
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const notesList = [
    { name: 'E2', namePt: 'Mi grave (6ª corda)', freq: 82.41, tip: 'Sinta a vibração profunda na caixa torácica/peito.' },
    { name: 'A2', namePt: 'Lá (5ª corda)', freq: 110.0, tip: 'Excelente tom âncora confortável para começar.' },
    { name: 'D3', namePt: 'Ré (4ª corda)', freq: 146.83, tip: 'Tom médio bem presente no violão.' },
    { name: 'G3', namePt: 'Sol (3ª corda)', freq: 196.0, tip: 'Tom mais brilhante, vibra no palato/rosto.' },
  ];

  const handlePlayGuitarNote = async () => {
    setIsPlaying(true);
    await audioEngine.playNote(selectedNote.freq, 0.9);
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#23334D] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Laboratório de Voz & Zumbido</h2>
              <p className="text-xs text-slate-400 font-medium">Aprenda a encontrar e cantar a nota na prática</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* O Conceito de Humming */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-800/40">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>O Segredo: Não tente "Cantar", faça o Zumbido!</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você não precisa saber cantar nem ter afinação de cantor! O cérebro memoriza notas pela <strong>vibração física muscular</strong>.
              Fechando a boca e fazendo <em>"Hmmmm..."</em> (como o som de uma abelha ou quando concordamos com alguém), você ativa sua laringe sem esforço.
            </p>
          </div>

          {/* Passo a Passo Prático */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Passo a Passo (Exercício de 60 segundos)
            </h3>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0">1</span>
                <p className="text-slate-300">
                  <strong className="text-white">Toque a nota no violão abaixo</strong> e preste atenção no som com calma por 2 segundos.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0">2</span>
                <p className="text-slate-300">
                  <strong className="text-white">Feche a boca e faça 'Hmmmmm'</strong>. Deslize a voz devagarzinho para cima ou para baixo como uma sirene suave.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0">3</span>
                <p className="text-slate-300">
                  <strong className="text-emerald-400">O Momento do 'LOCK':</strong> Quando sua voz encontra a frequência do violão, uma sensação gostosa de alinhamento acontece — o som parece "ficar em paz", sem atrito ou ondulações ásperas.
                </p>
              </div>
            </div>
          </div>

          {/* Seletor de Notas Âncora do Violão */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Escolha uma corda do violão para praticar agora:
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {notesList.map((n) => (
                <button
                  key={n.name}
                  type="button"
                  onClick={() => setSelectedNote(n)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNote.name === n.name
                      ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <strong className="block text-sm">{n.namePt}</strong>
                  <span className="text-[11px] opacity-75">{n.name} • {Math.round(n.freq)} Hz</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-indigo-300/80 mt-2 font-medium">
              💡 {selectedNote.tip}
            </p>
          </div>

          {/* Botão de Tocar a Nota Selecionada */}
          <div className="pt-2 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={handlePlayGuitarNote}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-98'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_0_#3730A3] active:translate-y-1 active:shadow-none'
              }`}
            >
              <Volume2 className={`w-5 h-5 ${isPlaying ? 'scale-115 animate-bounce' : ''}`} />
              <span>{isPlaying ? 'Ouvindo Nota... Agora Zumbra!' : `Tocar ${selectedNote.namePt}`}</span>
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Entendi, vou praticar!
          </button>
        </div>
      </div>
    </div>
  );
};
