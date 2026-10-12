import { ExerciseType, FilterSettings, QuizOption, QuizQuestion } from '@/types/quiz';
import { ACCIDENTAL_NOTE_NAMES, GUITAR_CHORDS, GUITAR_NOTES, NATURAL_NOTE_NAMES, NOTE_NAME_MAP } from './constants';
import { ChordDefinition, NoteDefinition, NoteName } from '@/types/music';
import { generateDirectionQuestion } from './directionGenerator';

/**
 * Embaralha array com algoritmo de Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Gera uma nova pergunta para a Trilha de Notas (com suporte a 2 opções, 4 opções ou Tabuleiro Total)
 */
export function generateNoteQuestion(filters: FilterSettings): QuizQuestion {
  let pool = GUITAR_NOTES;

  if (!filters.includeAccidentals) {
    pool = pool.filter((n) => NATURAL_NOTE_NAMES.includes(n.name));
  }

  if (filters.noteOctave === 'mid') {
    pool = pool.filter((n) => n.octave === 3 || n.octave === 4);
  } else if (filters.noteOctave === 'low') {
    pool = pool.filter((n) => n.octave === 2 || n.octave === 3);
  }

  if (pool.length < 4) {
    pool = GUITAR_NOTES;
  }

  // Sorteia nota alvo
  const targetIndex = Math.floor(Math.random() * pool.length);
  const target = pool[targetIndex];

  const isLatin = filters.notationStyle === 'latin';
  const targetLabel = isLatin ? `${target.namePt}` : `${target.name}`;
  const targetSubLabel = isLatin ? `${target.name} (Oitava ${target.octave})` : `${target.namePt} (Oitava ${target.octave})`;

  let options: QuizOption[] = [];

  // Se for o Tabuleiro Completo ('all'): mostra todas as notas naturais ou disponíveis em ordem
  if (filters.optionCount === 'all') {
    const uniqueBaseNotes: NoteName[] = filters.includeAccidentals
      ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      : ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    options = uniqueBaseNotes.map((name, index) => {
      const isCorrect = name === target.name;
      const ptName = NOTE_NAME_MAP[name];
      return {
        id: `note_board_${name}`,
        label: isLatin ? ptName : name,
        subLabel: isLatin ? name : ptName,
        shortcutNumber: index < 9 ? index + 1 : 0,
        isCorrect,
      };
    });
  } else {
    // Quantidade de opções: 2 (Duelo) ou 4 (Quiz)
    const count = filters.optionCount === 2 ? 2 : 4;
    const otherNotes = pool.filter((n) => n.name !== target.name);
    const shuffledOthers = shuffleArray(otherNotes);

    const selectedDistractors: NoteDefinition[] = [];
    const usedNames = new Set<string>([target.name]);

    for (const candidate of shuffledOthers) {
      if (!usedNames.has(candidate.name)) {
        selectedDistractors.push(candidate);
        usedNames.add(candidate.name);
        if (selectedDistractors.length === count - 1) break;
      }
    }

    const allItems = shuffleArray([target, ...selectedDistractors]);

    options = allItems.map((item, index) => {
      const isCorrect = item.id === target.id || item.name === target.name;
      const label = isLatin ? item.namePt : item.name;
      const subLabel = isLatin ? item.name : item.namePt;

      return {
        id: item.id,
        label,
        subLabel,
        shortcutNumber: index + 1,
        isCorrect,
      };
    });
  }

  const exerciseType: ExerciseType =
    filters.optionCount === 2
      ? 'notes_duel'
      : filters.optionCount === 'all'
      ? 'notes_board'
      : 'notes_quiz';

  return {
    id: `note_${target.id}_${Date.now()}`,
    mode: 'notes',
    exerciseType,
    targetId: target.id,
    targetLabel,
    targetSubLabel,
    frequencies: [target.frequency],
    options,
  };
}

/**
 * Gera uma nova pergunta para a Trilha de Acordes
 */
export function generateChordQuestion(filters: FilterSettings): QuizQuestion {
  let pool = GUITAR_CHORDS;

  if (filters.selectedQualities && filters.selectedQualities.length > 0) {
    const filtered = pool.filter((c) => filters.selectedQualities.includes(c.quality));
    if (filtered.length >= 2) {
      pool = filtered;
    }
  }

  const targetIndex = Math.floor(Math.random() * pool.length);
  const target = pool[targetIndex];

  const isLatin = filters.notationStyle === 'latin';
  const targetLabel = target.symbol;
  const targetSubLabel = target.namePt;

  let options: QuizOption[] = [];

  if (filters.optionCount === 'all') {
    // Tabuleiro completo de acordes da seleção atual
    const uniqueChords = pool.slice(0, 10);
    options = uniqueChords.map((item, index) => {
      return {
        id: item.id,
        label: item.symbol,
        subLabel: isLatin ? item.namePt : undefined,
        shortcutNumber: index < 9 ? index + 1 : 0,
        isCorrect: item.id === target.id,
      };
    });
  } else {
    const count = filters.optionCount === 2 ? 2 : 4;
    const otherChords = pool.filter((c) => c.id !== target.id);
    const shuffledOthers = shuffleArray(otherChords);

    const selectedDistractors: ChordDefinition[] = [];
    const usedSymbols = new Set<string>([target.symbol]);

    for (const candidate of shuffledOthers) {
      if (!usedSymbols.has(candidate.symbol)) {
        selectedDistractors.push(candidate);
        usedSymbols.add(candidate.symbol);
        if (selectedDistractors.length === count - 1) break;
      }
    }

    const allItems = shuffleArray([target, ...selectedDistractors]);

    options = allItems.map((item, index) => {
      return {
        id: item.id,
        label: item.symbol,
        subLabel: isLatin ? item.namePt : undefined,
        shortcutNumber: index + 1,
        isCorrect: item.id === target.id,
      };
    });
  }

  const exerciseType: ExerciseType =
    filters.optionCount === 2
      ? 'chords_duel'
      : filters.optionCount === 'all'
      ? 'chords_board'
      : 'chords_quiz';

  return {
    id: `chord_${target.id}_${Date.now()}`,
    mode: 'chords',
    exerciseType,
    targetId: target.id,
    targetLabel,
    targetSubLabel,
    frequencies: target.voicingFrequencies,
    options,
  };
}

/**
 * Função unificada que gera um desafio baseado no modo e tipo de exercício ativo
 */
export function generateNextQuizQuestion(filters: FilterSettings): QuizQuestion {
  if (filters.mode === 'direction' || filters.activeExercise === 'direction') {
    return generateDirectionQuestion();
  }

  if (filters.mode === 'notes') {
    return generateNoteQuestion(filters);
  }

  return generateChordQuestion(filters);
}
