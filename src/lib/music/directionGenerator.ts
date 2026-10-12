import { DirectionQuestion, QuizOption } from '@/types/quiz';
import { GUITAR_NOTES } from './constants';

/**
 * Gera um desafio de Direção Melódica (Subiu ou Desceu?)
 */
export function generateDirectionQuestion(): DirectionQuestion {
  // Pega um subconjunto de notas audíveis e confortáveis no violão (E2 a E4)
  const availableNotes = GUITAR_NOTES.filter((n) => n.octave >= 2 && n.octave <= 4);

  // Sorteia a primeira nota (evitando os extremos para poder subir ou descer)
  const minIdx = 2;
  const maxIdx = availableNotes.length - 3;
  const idx1 = Math.floor(Math.random() * (maxIdx - minIdx + 1)) + minIdx;
  const note1 = availableNotes[idx1];

  // Decide aleatoriamente se a segunda nota sobe ou desce
  const shouldGoHigher = Math.random() >= 0.5;

  let idx2: number;
  if (shouldGoHigher) {
    // Sorteia uma nota mais aguda (entre 2 e 7 semitons acima para contraste claro)
    const step = Math.floor(Math.random() * 5) + 2;
    idx2 = Math.min(availableNotes.length - 1, idx1 + step);
  } else {
    // Sorteia uma nota mais grave (entre 2 e 7 semitons abaixo)
    const step = Math.floor(Math.random() * 5) + 2;
    idx2 = Math.max(0, idx1 - step);
  }

  // Garante que não sejam uníssonos
  if (idx1 === idx2) {
    idx2 = shouldGoHigher ? idx1 + 2 : idx1 - 2;
  }

  const note2 = availableNotes[idx2];
  const isActuallyHigher = note2.frequency > note1.frequency;
  const directionTarget: 'higher' | 'lower' = isActuallyHigher ? 'higher' : 'lower';

  const options: QuizOption[] = [
    {
      id: 'higher',
      label: '⬆️ Subiu',
      subLabel: 'O 2º som foi mais agudo',
      shortcutNumber: 1,
      isCorrect: directionTarget === 'higher',
    },
    {
      id: 'lower',
      label: '⬇️ Desceu',
      subLabel: 'O 2º som foi mais grave',
      shortcutNumber: 2,
      isCorrect: directionTarget === 'lower',
    },
  ];

  return {
    id: `dir_${Date.now()}`,
    mode: 'direction',
    exerciseType: 'direction',
    targetId: directionTarget,
    targetLabel: directionTarget === 'higher' ? 'Subiu (Mais Agudo)' : 'Desceu (Mais Grave)',
    targetSubLabel: `De ${note1.namePt} (${note1.name}${note1.octave}) para ${note2.namePt} (${note2.name}${note2.octave})`,
    frequencies: [note1.frequency, note2.frequency],
    isSequence: true,
    sequenceNotes: [
      { name: `${note1.namePt} (${note1.name})`, frequency: note1.frequency },
      { name: `${note2.namePt} (${note2.name})`, frequency: note2.frequency },
    ],
    directionTarget,
    note1Freq: note1.frequency,
    note2Freq: note2.frequency,
    note1Label: `${note1.namePt} (${note1.name})`,
    note2Label: `${note2.namePt} (${note2.name})`,
    options,
  };
}
