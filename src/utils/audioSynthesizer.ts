// Web Audio API Sound Generator for Sleep Relaxing Sounds
class SleepAudioSynthesizer {
  private audioCtx: AudioContext | null = null;
  private currentSources: AudioNode[] = [];
  private activeOscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;
  private currentSoundType: string | null = null;
  private gainNode: GainNode | null = null;
  private fadeInterval: any = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playSound(type: 'white' | 'pink' | 'brown' | 'green' | 'rain' | 'ocean' | 'binaural', volume: number = 0.3) {
    this.stopSound();
    this.initCtx();

    if (!this.audioCtx) return;

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);

    this.currentSoundType = type;
    this.isPlaying = true;

    if (type === 'white') {
      this.createWhiteNoise();
    } else if (type === 'pink') {
      this.createPinkNoise();
    } else if (type === 'brown') {
      this.createBrownNoise();
    } else if (type === 'green') {
      this.createGreenNoise();
    } else if (type === 'rain') {
      this.createRainSound();
    } else if (type === 'ocean') {
      this.createOceanSound();
    } else if (type === 'binaural') {
      this.createDeltaBinaural();
    }
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.audioCtx.currentTime);
    }
  }

  public fadeAndStop(durationSecs: number = 5, onComplete?: () => void) {
    if (!this.gainNode || !this.audioCtx || !this.isPlaying) {
      this.stopSound();
      if (onComplete) onComplete();
      return;
    }

    const startVol = this.gainNode.gain.value;
    const steps = 20;
    const stepTime = (durationSecs * 1000) / steps;
    let currentStep = 0;

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    this.fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const newVol = Math.max(0, startVol * (1 - progress));
      if (this.gainNode && this.audioCtx) {
        this.gainNode.gain.setValueAtTime(newVol, this.audioCtx.currentTime);
      }

      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        this.stopSound();
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  public stopSound() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    this.currentSources.forEach((src) => {
      try {
        (src as any).stop?.();
        src.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.currentSources = [];

    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];

    this.isPlaying = false;
    this.currentSoundType = null;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentType: this.currentSoundType
    };
  }

  private createWhiteNoise() {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.connect(this.gainNode);
    whiteNoise.start();
    this.currentSources.push(whiteNoise);
  }

  private createPinkNoise() {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const pinkNoise = this.audioCtx.createBufferSource();
    pinkNoise.buffer = noiseBuffer;
    pinkNoise.loop = true;
    pinkNoise.connect(this.gainNode);
    pinkNoise.start();
    this.currentSources.push(pinkNoise);
  }

  private createBrownNoise() {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // boost volume for rich deep bass
    }

    const brownNoise = this.audioCtx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;
    brownNoise.connect(this.gainNode);
    brownNoise.start();
    this.currentSources.push(brownNoise);
  }

  private createGreenNoise() {
    if (!this.audioCtx || !this.gainNode) return;
    // Green noise is ambient noise centered around ~500Hz with bandpass filter
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

    noiseSource.connect(filter);
    filter.connect(this.gainNode);
    noiseSource.start();
    this.currentSources.push(noiseSource);
  }

  private createRainSound() {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const rainSource = this.audioCtx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, this.audioCtx.currentTime);

    rainSource.connect(filter);
    filter.connect(this.gainNode);
    rainSource.start();
    this.currentSources.push(rainSource);
  }

  private createOceanSound() {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = 4 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const oceanSource = this.audioCtx.createBufferSource();
    oceanSource.buffer = noiseBuffer;
    oceanSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.audioCtx.currentTime);

    // LFO for wave swelling
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.value = 0.12; // wave every ~8 seconds
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 280;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.activeOscillators.push(lfo);

    oceanSource.connect(filter);
    filter.connect(this.gainNode);
    oceanSource.start();
    this.currentSources.push(oceanSource);
  }

  private createDeltaBinaural() {
    if (!this.audioCtx || !this.gainNode) return;
    // 200Hz left, 202.5Hz right (Delta wave beat 2.5Hz)
    const merger = this.audioCtx.createChannelMerger(2);

    const oscLeft = this.audioCtx.createOscillator();
    oscLeft.frequency.value = 200;
    oscLeft.connect(merger, 0, 0);

    const oscRight = this.audioCtx.createOscillator();
    oscRight.frequency.value = 202.5; // 2.5Hz delta beat
    oscRight.connect(merger, 0, 1);

    merger.connect(this.gainNode);
    oscLeft.start();
    oscRight.start();

    this.activeOscillators.push(oscLeft, oscRight);
    this.currentSources.push(oscLeft as any);
  }
}

export const sleepAudio = new SleepAudioSynthesizer();
