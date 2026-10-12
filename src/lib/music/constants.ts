import { ChordDefinition, NoteDefinition, NoteName, NoteNamePt } from '@/types/music';

// Mapeamento de Notação Anglo-Saxônica para Latina
export const NOTE_NAME_MAP: Record<NoteName, NoteNamePt> = {
  'C': 'Dó',
  'C#': 'Dó#',
  'D': 'Ré',
  'D#': 'Ré#',
  'E': 'Mi',
  'F': 'Fá',
  'F#': 'Fá#',
  'G': 'Sol',
  'G#': 'Sol#',
  'A': 'Lá',
  'A#': 'Lá#',
  'B': 'Si',
};

// Frequências padrão das notas (extensão do violão: corda 6 solta E2 até casa 12 corda 1 E5)
export const GUITAR_NOTES: NoteDefinition[] = [
  // Oitava 2 (Graves do Violão)
  { id: 'E2', name: 'E', namePt: 'Mi', octave: 2, frequency: 82.41 },
  { id: 'F2', name: 'F', namePt: 'Fá', octave: 2, frequency: 87.31 },
  { id: 'F#2', name: 'F#', namePt: 'Fá#', octave: 2, frequency: 92.50 },
  { id: 'G2', name: 'G', namePt: 'Sol', octave: 2, frequency: 98.00 },
  { id: 'G#2', name: 'G#', namePt: 'Sol#', octave: 2, frequency: 103.83 },
  { id: 'A2', name: 'A', namePt: 'Lá', octave: 2, frequency: 110.00 },
  { id: 'A#2', name: 'A#', namePt: 'Lá#', octave: 2, frequency: 116.54 },
  { id: 'B2', name: 'B', namePt: 'Si', octave: 2, frequency: 123.47 },

  // Oitava 3 (Médios-Graves)
  { id: 'C3', name: 'C', namePt: 'Dó', octave: 3, frequency: 130.81 },
  { id: 'C#3', name: 'C#', namePt: 'Dó#', octave: 3, frequency: 138.59 },
  { id: 'D3', name: 'D', namePt: 'Ré', octave: 3, frequency: 146.83 },
  { id: 'D#3', name: 'D#', namePt: 'Ré#', octave: 3, frequency: 155.56 },
  { id: 'E3', name: 'E', namePt: 'Mi', octave: 3, frequency: 164.81 },
  { id: 'F3', name: 'F', namePt: 'Fá', octave: 3, frequency: 174.61 },
  { id: 'F#3', name: 'F#', namePt: 'Fá#', octave: 3, frequency: 185.00 },
  { id: 'G3', name: 'G', namePt: 'Sol', octave: 3, frequency: 196.00 },
  { id: 'G#3', name: 'G#', namePt: 'Sol#', octave: 3, frequency: 207.65 },
  { id: 'A3', name: 'A', namePt: 'Lá', octave: 3, frequency: 220.00 },
  { id: 'A#3', name: 'A#', namePt: 'Lá#', octave: 3, frequency: 233.08 },
  { id: 'B3', name: 'B', namePt: 'Si', octave: 3, frequency: 246.94 },

  // Oitava 4 (Médios-Agudos)
  { id: 'C4', name: 'C', namePt: 'Dó', octave: 4, frequency: 261.63 },
  { id: 'C#4', name: 'C#', namePt: 'Dó#', octave: 4, frequency: 277.18 },
  { id: 'D4', name: 'D', namePt: 'Ré', octave: 4, frequency: 293.66 },
  { id: 'D#4', name: 'D#', namePt: 'Ré#', octave: 4, frequency: 311.13 },
  { id: 'E4', name: 'E', namePt: 'Mi', octave: 4, frequency: 329.63 },
  { id: 'F4', name: 'F', namePt: 'Fá', octave: 4, frequency: 349.23 },
  { id: 'F#4', name: 'F#', namePt: 'Fá#', octave: 4, frequency: 369.99 },
  { id: 'G4', name: 'G', namePt: 'Sol', octave: 4, frequency: 392.00 },
  { id: 'G#4', name: 'G#', namePt: 'Sol#', octave: 4, frequency: 415.30 },
  { id: 'A4', name: 'A', namePt: 'Lá', octave: 4, frequency: 440.00 },
  { id: 'A#4', name: 'A#', namePt: 'Lá#', octave: 4, frequency: 466.16 },
  { id: 'B4', name: 'B', namePt: 'Si', octave: 4, frequency: 493.88 },
];

export const NATURAL_NOTE_NAMES: NoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const ACCIDENTAL_NOTE_NAMES: NoteName[] = ['C#', 'D#', 'F#', 'G#', 'A#'];

// Dicionário de Acordes de Violão com Voicings reais de violão (frequências de cordas reais)
export const GUITAR_CHORDS: ChordDefinition[] = [
  // --- TRÍADES MAIORES ---
  {
    id: 'C_major',
    root: 'C',
    rootPt: 'Dó',
    quality: 'major',
    symbol: 'C',
    namePt: 'Dó Maior',
    category: 'triad',
    // Shape C aberto: x 3 2 0 1 0 (C3, E3, G3, C4, E4)
    voicingFrequencies: [130.81, 164.81, 196.00, 261.63, 329.63],
  },
  {
    id: 'D_major',
    root: 'D',
    rootPt: 'Ré',
    quality: 'major',
    symbol: 'D',
    namePt: 'Ré Maior',
    category: 'triad',
    // Shape D aberto: x x 0 2 3 2 (D3, A3, D4, F#4)
    voicingFrequencies: [146.83, 220.00, 293.66, 369.99],
  },
  {
    id: 'E_major',
    root: 'E',
    rootPt: 'Mi',
    quality: 'major',
    symbol: 'E',
    namePt: 'Mi Maior',
    category: 'triad',
    // Shape E aberto: 0 2 2 1 0 0 (E2, B2, E3, G#3, B3, E4)
    voicingFrequencies: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],
  },
  {
    id: 'F_major',
    root: 'F',
    rootPt: 'Fá',
    quality: 'major',
    symbol: 'F',
    namePt: 'Fá Maior',
    category: 'triad',
    // Shape F pestana 1ª casa: 1 3 3 2 1 1 (F2, C3, F3, A3, C4, F4)
    voicingFrequencies: [87.31, 130.81, 174.61, 220.00, 261.63, 349.23],
  },
  {
    id: 'G_major',
    root: 'G',
    rootPt: 'Sol',
    quality: 'major',
    symbol: 'G',
    namePt: 'Sol Maior',
    category: 'triad',
    // Shape G aberto: 3 2 0 0 0 3 (G2, B2, D3, G3, B3, G4)
    voicingFrequencies: [98.00, 123.47, 146.83, 196.00, 246.94, 392.00],
  },
  {
    id: 'A_major',
    root: 'A',
    rootPt: 'Lá',
    quality: 'major',
    symbol: 'A',
    namePt: 'Lá Maior',
    category: 'triad',
    // Shape A aberto: x 0 2 2 2 0 (A2, E3, A3, C#4, E4)
    voicingFrequencies: [110.00, 164.81, 220.00, 277.18, 329.63],
  },
  {
    id: 'B_major',
    root: 'B',
    rootPt: 'Si',
    quality: 'major',
    symbol: 'B',
    namePt: 'Si Maior',
    category: 'triad',
    // Shape B pestana 2ª casa: x 2 4 4 4 2 (B2, F#3, B3, D#4, F#4)
    voicingFrequencies: [123.47, 185.00, 246.94, 311.13, 369.99],
  },

  // --- TRÍADES MENORES ---
  {
    id: 'Am_minor',
    root: 'A',
    rootPt: 'Lá',
    quality: 'minor',
    symbol: 'Am',
    namePt: 'Lá Menor',
    category: 'triad',
    // Shape Am aberto: x 0 2 2 1 0 (A2, E3, A3, C4, E4)
    voicingFrequencies: [110.00, 164.81, 220.00, 261.63, 329.63],
  },
  {
    id: 'Em_minor',
    root: 'E',
    rootPt: 'Mi',
    quality: 'minor',
    symbol: 'Em',
    namePt: 'Mi Menor',
    category: 'triad',
    // Shape Em aberto: 0 2 2 0 0 0 (E2, B2, E3, G3, B3, E4)
    voicingFrequencies: [82.41, 123.47, 164.81, 196.00, 246.94, 329.63],
  },
  {
    id: 'Dm_minor',
    root: 'D',
    rootPt: 'Ré',
    quality: 'minor',
    symbol: 'Dm',
    namePt: 'Ré Menor',
    category: 'triad',
    // Shape Dm aberto: x x 0 2 3 1 (D3, A3, D4, F4)
    voicingFrequencies: [146.83, 220.00, 293.66, 349.23],
  },
  {
    id: 'Cm_minor',
    root: 'C',
    rootPt: 'Dó',
    quality: 'minor',
    symbol: 'Cm',
    namePt: 'Dó Menor',
    category: 'triad',
    // Shape Cm pestana: x 3 5 5 4 3 (C3, G3, C4, D#4, G4)
    voicingFrequencies: [130.81, 196.00, 261.63, 311.13, 392.00],
  },
  {
    id: 'Gm_minor',
    root: 'G',
    rootPt: 'Sol',
    quality: 'minor',
    symbol: 'Gm',
    namePt: 'Sol Menor',
    category: 'triad',
    // Shape Gm pestana: 3 5 5 3 3 3 (G2, D3, G3, A#3, D4, G4)
    voicingFrequencies: [98.00, 146.83, 196.00, 233.08, 293.66, 392.00],
  },
  {
    id: 'Bm_minor',
    root: 'B',
    rootPt: 'Si',
    quality: 'minor',
    symbol: 'Bm',
    namePt: 'Si Menor',
    category: 'triad',
    // Shape Bm pestana: x 2 4 4 3 2 (B2, F#3, B3, D4, F#4)
    voicingFrequencies: [123.47, 185.00, 246.94, 293.66, 369.99],
  },
  {
    id: 'Fm_minor',
    root: 'F',
    rootPt: 'Fá',
    quality: 'minor',
    symbol: 'Fm',
    namePt: 'Fá Menor',
    category: 'triad',
    // Shape Fm pestana: 1 3 3 1 1 1 (F2, C3, F3, G#3, C4, F4)
    voicingFrequencies: [87.31, 130.81, 174.61, 207.65, 261.63, 349.23],
  },

  // --- TÉTRADES: DOMINANTES COM SÉTIMA (7) ---
  {
    id: 'G7_dominant',
    root: 'G',
    rootPt: 'Sol',
    quality: 'dominant7',
    symbol: 'G7',
    namePt: 'Sol com Sétima',
    category: 'tetrad',
    // Shape G7 aberto: 3 2 0 0 0 1 (G2, B2, D3, G3, B3, F4)
    voicingFrequencies: [98.00, 123.47, 146.83, 196.00, 246.94, 349.23],
  },
  {
    id: 'C7_dominant',
    root: 'C',
    rootPt: 'Dó',
    quality: 'dominant7',
    symbol: 'C7',
    namePt: 'Dó com Sétima',
    category: 'tetrad',
    // Shape C7 aberto: x 3 2 3 1 0 (C3, E3, A#3, C4, E4)
    voicingFrequencies: [130.81, 164.81, 233.08, 261.63, 329.63],
  },
  {
    id: 'D7_dominant',
    root: 'D',
    rootPt: 'Ré',
    quality: 'dominant7',
    symbol: 'D7',
    namePt: 'Ré com Sétima',
    category: 'tetrad',
    // Shape D7 aberto: x x 0 2 1 2 (D3, A3, C4, F#4)
    voicingFrequencies: [146.83, 220.00, 261.63, 369.99],
  },
  {
    id: 'E7_dominant',
    root: 'E',
    rootPt: 'Mi',
    quality: 'dominant7',
    symbol: 'E7',
    namePt: 'Mi com Sétima',
    category: 'tetrad',
    // Shape E7 aberto: 0 2 0 1 0 0 (E2, B2, D3, G#3, B3, E4)
    voicingFrequencies: [82.41, 123.47, 146.83, 207.65, 246.94, 329.63],
  },
  {
    id: 'A7_dominant',
    root: 'A',
    rootPt: 'Lá',
    quality: 'dominant7',
    symbol: 'A7',
    namePt: 'Lá com Sétima',
    category: 'tetrad',
    // Shape A7 aberto: x 0 2 0 2 0 (A2, E3, G3, C#4, E4)
    voicingFrequencies: [110.00, 164.81, 196.00, 277.18, 329.63],
  },

  // --- TÉTRADES: MAIORES COM SÉTIMA MAIOR (7M / Maj7) ---
  {
    id: 'Cmaj7',
    root: 'C',
    rootPt: 'Dó',
    quality: 'major7',
    symbol: 'C7M',
    namePt: 'Dó com Sétima Maior',
    category: 'tetrad',
    // Shape Cmaj7 aberto: x 3 2 0 0 0 (C3, E3, G3, B3, E4)
    voicingFrequencies: [130.81, 164.81, 196.00, 246.94, 329.63],
  },
  {
    id: 'Fmaj7',
    root: 'F',
    rootPt: 'Fá',
    quality: 'major7',
    symbol: 'F7M',
    namePt: 'Fá com Sétima Maior',
    category: 'tetrad',
    // Shape Fmaj7 aberto: x x 3 2 1 0 (F3, A3, C4, E4)
    voicingFrequencies: [174.61, 220.00, 261.63, 329.63],
  },
  {
    id: 'Amaj7',
    root: 'A',
    rootPt: 'Lá',
    quality: 'major7',
    symbol: 'A7M',
    namePt: 'Lá com Sétima Maior',
    category: 'tetrad',
    // Shape Amaj7: x 0 2 1 2 0 (A2, E3, G#3, C#4, E4)
    voicingFrequencies: [110.00, 164.81, 207.65, 277.18, 329.63],
  },

  // --- TÉTRADES: MENORES COM SÉTIMA (m7) ---
  {
    id: 'Am7_minor7',
    root: 'A',
    rootPt: 'Lá',
    quality: 'minor7',
    symbol: 'Am7',
    namePt: 'Lá Menor com Sétima',
    category: 'tetrad',
    // Shape Am7 aberto: x 0 2 0 1 0 (A2, E3, G3, C4, E4)
    voicingFrequencies: [110.00, 164.81, 196.00, 261.63, 329.63],
  },
  {
    id: 'Em7_minor7',
    root: 'E',
    rootPt: 'Mi',
    quality: 'minor7',
    symbol: 'Em7',
    namePt: 'Mi Menor com Sétima',
    category: 'tetrad',
    // Shape Em7 aberto: 0 2 0 0 0 0 (E2, B2, D3, G3, B3, E4)
    voicingFrequencies: [82.41, 123.47, 146.83, 196.00, 246.94, 329.63],
  },
  {
    id: 'Dm7_minor7',
    root: 'D',
    rootPt: 'Ré',
    quality: 'minor7',
    symbol: 'Dm7',
    namePt: 'Ré Menor com Sétima',
    category: 'tetrad',
    // Shape Dm7 aberto: x x 0 2 1 1 (D3, A3, C4, F4)
    voicingFrequencies: [146.83, 220.00, 261.63, 349.23],
  },
];
