/**
 * AudioEngine — Web Audio API Singleton com Síntese Acústica Karplus-Strong
 * e suporte a reprodução de amostras com baixíssima latência (<20ms).
 */

class AudioEngine {
  private static instance: AudioEngine | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isUnlocked: boolean = false;

  private constructor() {
    // Inicialização preguiçosa no primeiro clique do usuário
  }

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  /**
   * Garante a inicialização e desbloqueio do AudioContext.
   * Atende às políticas de Autoplay do Chrome, Safari e iOS.
   */
  public async unlock(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // Toca um buffer silencioso para ativar o hardware de áudio no iOS
      if (!this.isUnlocked && this.ctx) {
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        this.isUnlocked = true;
      }

      return true;
    } catch (err) {
      console.warn('[AudioEngine] Falha ao desbloquear AudioContext:', err);
      return false;
    }
  }

  public getContext(): AudioContext | null {
    return this.ctx;
  }

  /**
   * Síntese Acústica Karplus-Strong para violão:
   * Modela fisicamente o comportamento de uma corda de violão dedilhada/palhetada.
   */
  public generateGuitarStringPluckBuffer(frequency: number, durationSeconds: number = 3.2): AudioBuffer | null {
    if (!this.ctx) return null;

    const sampleRate = this.ctx.sampleRate;
    const totalSamples = Math.floor(sampleRate * durationSeconds);
    const period = Math.round(sampleRate / frequency);

    if (period <= 0 || period >= totalSamples) return null;

    const buffer = this.ctx.createBuffer(1, totalSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    // 1. Excitação inicial (ruído filtrado representando o toque da palheta/unha na corda)
    for (let i = 0; i < period; i++) {
      const whiteNoise = Math.random() * 2 - 1;
      channelData[i] = whiteNoise * 0.9;
    }

    // 2. Loop de atraso com filtro passa-baixa e amortecimento de corda (Damping)
    const feedbackDecay = Math.pow(0.001, 1 / (frequency * 0.95 * durationSeconds));

    for (let i = period; i < totalSamples; i++) {
      const prev1 = channelData[i - period];
      const prev2 = channelData[i - period - 1] ?? prev1;
      const filtered = 0.5 * (prev1 + prev2);
      channelData[i] = filtered * feedbackDecay;
    }

    return buffer;
  }

  /**
   * Toca uma nota individual de violão
   */
  public async playNote(frequency: number, volume: number = 0.8): Promise<void> {
    await this.unlock();
    if (!this.ctx || !this.masterGain) return;

    try {
      const buffer = this.generateGuitarStringPluckBuffer(frequency, 3.0);
      if (!buffer) return;

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const bodyFilter = this.ctx.createBiquadFilter();
      bodyFilter.type = 'lowpass';
      bodyFilter.frequency.setValueAtTime(Math.min(frequency * 5.5, 4500), this.ctx.currentTime);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(volume, this.ctx.currentTime);

      source.connect(bodyFilter);
      bodyFilter.connect(noteGain);
      noteGain.connect(this.masterGain);

      source.start();
    } catch (err) {
      console.error('[AudioEngine] Erro ao reproduzir nota:', err);
    }
  }

  /**
   * Toca duas notas em sequência com intervalo configurável (usado no treino de direção/contorno)
   */
  public async playTwoNotesSequence(freq1: number, freq2: number, gapMs: number = 400, volume: number = 0.8): Promise<void> {
    await this.unlock();
    await this.playNote(freq1, volume);
    await new Promise((resolve) => setTimeout(resolve, gapMs));
    await this.playNote(freq2, volume);
  }

  /**
   * Toca um acorde de violão com dedilhado/batida realista (strumming micro-delay)
   */
  public async playChord(frequencies: number[], strumSpeedMs: number = 28, volume: number = 0.75): Promise<void> {
    await this.unlock();
    if (!this.ctx || !this.masterGain || !frequencies.length) return;

    try {
      const now = this.ctx.currentTime;

      frequencies.forEach((freq, index) => {
        if (!this.ctx || !this.masterGain) return;

        const buffer = this.generateGuitarStringPluckBuffer(freq, 3.5);
        if (!buffer) return;

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const stringVolume = volume * (0.85 + Math.random() * 0.15);

        const bodyFilter = this.ctx.createBiquadFilter();
        bodyFilter.type = 'lowpass';
        bodyFilter.frequency.setValueAtTime(Math.min(freq * 6, 5000), now);

        const stringGain = this.ctx.createGain();
        stringGain.gain.setValueAtTime(stringVolume, now);

        source.connect(bodyFilter);
        bodyFilter.connect(stringGain);
        stringGain.connect(this.masterGain);

        const strumOffsetSeconds = (index * strumSpeedMs) / 1000;
        source.start(now + strumOffsetSeconds);
      });
    } catch (err) {
      console.error('[AudioEngine] Erro ao reproduzir acorde:', err);
    }
  }

  /**
   * SFX de Sucesso estilo Duolingo (Acerto)
   */
  public async playSuccessSfx(): Promise<void> {
    await this.unlock();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.2, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.26);
    });
  }

  /**
   * SFX de Erro sutil e acolhedor (não punitivo)
   */
  public async playErrorSfx(): Promise<void> {
    await this.unlock();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * SFX de Marco de Streak
   */
  public async playStreakFanfare(): Promise<void> {
    await this.unlock();
    if (!this.ctx || !this.masterGain) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.22, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.42);
    });
  }
}

export const audioEngine = AudioEngine.getInstance();
