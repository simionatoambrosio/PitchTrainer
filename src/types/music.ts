export type NoteName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export type NoteNamePt = 'Dó' | 'Dó#' | 'Ré' | 'Ré#' | 'Mi' | 'Fá' | 'Fá#' | 'Sol' | 'Sol#' | 'Lá' | 'Lá#' | 'Si';

export type NotationStyle = 'anglo' | 'latin';

export type ChordQuality = 'major' | 'minor' | 'dominant7' | 'major7' | 'minor7';

export interface NoteDefinition {
  id: string; // e.g. "C4", "A2"
  name: NoteName;
  namePt: NoteNamePt;
  octave: number;
  frequency: number;
}

export interface GuitarStringPluck {
  stringNumber: number; // 1 to 6 (1 = high E, 6 = low E)
  frequency: number;
  delayMs: number; // micro delay in milliseconds for strumming
}

export interface ChordDefinition {
  id: string; // e.g. "C_major", "Am", "G7"
  root: NoteName;
  rootPt: NoteNamePt;
  quality: ChordQuality;
  symbol: string; // e.g. "C", "Am", "G7", "Cmaj7"
  namePt: string; // e.g. "Dó Maior", "Lá Menor", "Sol com Sétima"
  category: 'triad' | 'tetrad';
  // Array of string frequencies for acoustic guitar strumming (low to high string)
  voicingFrequencies: number[];
}
