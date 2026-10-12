'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Compass, Ear, Mic, Zap, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLevel0: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartLevel0,
}) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      badge: 'Boas-vindas ao PitchTrainer',
      title: 'Chega de jogar adivinhação musical!',
      description:
        'A maioria dos aplicativos joga você direto em testes de 4 ou 12 notas sem preparar seu cérebro. Sem uma referência gravada, você fica apenas chutando. Aqui você vai aprender a ouvir de verdade.',
      icon: <Ear className="w-10 h-10 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10',
      tips: [
        'Treinar ouvido é como musculação: exige estímulos graduais.',
        'Sons autênticos de violão acústico em vez de sintetizadores frios.',
        'Zero cobrança: você evolui no seu ritmo sem perder vidas.',
      ],
    },
    {
      badge: 'O Método Científico em 4 Degraus',
      title: 'A Escadinha da Percepção Musical',
      description:
        'Para o cérebro memorizar uma frequência, ele precisa passar por estas etapas naturais comprovadas pela pedagogia musical:',
      icon: <Compass className="w-10 h-10 text-indigo-400" />,
      color: 'from-indigo-500/20 to-purple-500/10',
      steps: [
        {
          num: '1',
          name: 'Sentir a Direção',
          desc: 'Perceber se o segundo som subiu (⬆️ mais agudo) ou desceu (⬇️ mais grave).',
        },
        {
          num: '2',
          name: 'Afinar com a Voz',
          desc: 'Aprender o Zumbido (Humming) para travar a sensação física da nota.',
        },
        {
          num: '3',
          name: 'Duelos 50/50',
          desc: 'Começar com apenas 2 opções contrastantes antes de arriscar 4.',
        },
        {
          num: '4',
          name: 'Maestria Completa',
          desc: 'Identificar qualquer nota ou acorde no tabuleiro completo.',
        },
      ],
    },
    {
      badge: 'Seu Ponto de Partida',
      title: 'Comece pelo Nível 0: Subiu ou Desceu?',
      description:
        'Em menos de 2 minutos você vai calibrar seu ouvido para reconhecer a direção dos sons do violão. Esse é o alicerce para nunca mais chutar.',
      icon: <Zap className="w-10 h-10 text-amber-400" />,
      color: 'from-amber-500/20 to-orange-500/10',
      actionPrompt: 'Pronto para começar seu primeiro treino?',
    },
  ];

  const currentSlide = slides[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#23334D] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[460px]">
        {/* Botão Fechar no canto superior */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conteúdo do Slide Atual */}
        <div>
          {/* Badge & Ícone */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${currentSlide.color} border border-slate-700/50`}>
              {currentSlide.icon}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {currentSlide.badge}
              </span>
              <p className="text-xs text-slate-400 mt-1 font-medium">Passo {step + 1} de {slides.length}</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight mb-2">
            {currentSlide.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {currentSlide.description}
          </p>

          {/* Dicas do Slide 0 */}
          {currentSlide.tips && (
            <div className="space-y-2 mb-4">
              {currentSlide.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          )}

          {/* Degraus do Slide 1 */}
          {currentSlide.steps && (
            <div className="grid grid-cols-1 gap-2 mb-4">
              {currentSlide.steps.map((st) => (
                <div
                  key={st.num}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0">
                    {st.num}
                  </span>
                  <div>
                    <strong className="text-slate-200 block">{st.name}</strong>
                    <span className="text-slate-400 text-[11px]">{st.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé com Navegação */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-4">
          {/* Indicadores de bolinha */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === step ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step < slides.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_3px_0_#047857] active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <span>Avançar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartLevel0();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_0_#047857] active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Começar pelo Nível 0</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
