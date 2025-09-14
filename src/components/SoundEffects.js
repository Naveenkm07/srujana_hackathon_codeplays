class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    
    // Initialize AudioContext on user interaction
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Resume audio context (needed for browsers that require user interaction)
  async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Generate beep sound
  generateBeep(frequency = 440, duration = 0.1, type = 'sine') {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Generate chord
  generateChord(frequencies, duration = 0.3) {
    if (!this.audioContext || !this.enabled) return;

    frequencies.forEach(freq => {
      this.generateBeep(freq, duration, 'sine');
    });
  }

  // Predefined sound effects
  playCorrect() {
    this.resumeAudioContext();
    // Happy ascending chord
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, index) => {
      setTimeout(() => this.generateBeep(freq, 0.2, 'sine'), index * 50);
    });
  }

  playIncorrect() {
    this.resumeAudioContext();
    // Descending minor chord
    const notes = [440, 369.99, 329.63]; // A4, F#4, E4
    notes.forEach((freq, index) => {
      setTimeout(() => this.generateBeep(freq, 0.15, 'sawtooth'), index * 80);
    });
  }

  playLevelUp() {
    this.resumeAudioContext();
    // Triumphant ascending scale
    const scale = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
    scale.forEach((freq, index) => {
      setTimeout(() => this.generateBeep(freq, 0.15, 'triangle'), index * 60);
    });
  }

  playAchievement() {
    this.resumeAudioContext();
    // Power chord with harmony
    const baseFreq = 220;
    const harmony = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 2.5];
    this.generateChord(harmony, 0.5);
  }

  playClick() {
    this.resumeAudioContext();
    this.generateBeep(800, 0.05, 'square');
  }

  playHover() {
    this.resumeAudioContext();
    this.generateBeep(600, 0.03, 'sine');
  }

  playStart() {
    this.resumeAudioContext();
    // Energetic startup sound
    const notes = [220, 277.18, 329.63, 440];
    notes.forEach((freq, index) => {
      setTimeout(() => this.generateBeep(freq, 0.1, 'triangle'), index * 25);
    });
  }

  playComplete() {
    this.resumeAudioContext();
    // Victory fanfare
    const melody = [523.25, 659.25, 783.99, 1046.5];
    melody.forEach((freq, index) => {
      setTimeout(() => {
        this.generateBeep(freq, 0.2, 'sine');
        // Add harmonic
        this.generateBeep(freq * 1.5, 0.2, 'sine');
      }, index * 100);
    });
  }

  playError() {
    this.resumeAudioContext();
    // Error buzz
    this.generateBeep(150, 0.3, 'sawtooth');
  }

  playTick() {
    this.resumeAudioContext();
    this.generateBeep(1000, 0.02, 'square');
  }

  // Control methods
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  // Generate typing sounds for code editor
  playTyping() {
    if (!this.enabled) return;
    
    const frequencies = [800, 850, 900, 950];
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    this.generateBeep(randomFreq, 0.02, 'square');
  }

  // Generate robot movement sounds
  playRobotMove() {
    this.resumeAudioContext();
    // Mechanical beep
    this.generateBeep(300 + Math.random() * 200, 0.1, 'square');
  }

  // Generate combo sound (for streaks)
  playCombo(comboLevel = 1) {
    this.resumeAudioContext();
    const baseFreq = 440;
    const multiplier = Math.min(comboLevel, 8);
    
    for (let i = 0; i < multiplier; i++) {
      setTimeout(() => {
        this.generateBeep(baseFreq + (i * 100), 0.08, 'sine');
      }, i * 30);
    }
  }
}

// Create singleton instance
const soundEffects = new SoundEffects();

export default soundEffects;
