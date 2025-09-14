import React, { useState, useEffect } from 'react';
import { FaMusic, FaPlay, FaPause, FaStop, FaDownload, FaSave, FaVolumeUp } from 'react-icons/fa';
import soundEffects from './SoundEffects';

const CodeMusicGenerator = ({ onXPGained }) => {
  const [currentCode, setCurrentCode] = useState('');
  const [generatedMusic, setGeneratedMusic] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);
  const [musicTitle, setMusicTitle] = useState('');
  const [savedTracks, setSavedTracks] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState('piano');

  // Code to music mapping
  const codeToMusicMap = {
    // Keywords
    'function': { note: 'C4', duration: 0.5, instrument: 'piano' },
    'class': { note: 'G4', duration: 0.5, instrument: 'piano' },
    'if': { note: 'E4', duration: 0.25, instrument: 'violin' },
    'else': { note: 'F4', duration: 0.25, instrument: 'violin' },
    'for': { note: 'A4', duration: 0.3, instrument: 'drum' },
    'while': { note: 'B4', duration: 0.3, instrument: 'drum' },
    'return': { note: 'D5', duration: 0.4, instrument: 'flute' },
    'import': { note: 'C5', duration: 0.2, instrument: 'synth' },
    'export': { note: 'E5', duration: 0.2, instrument: 'synth' },
    'const': { note: 'F3', duration: 0.3, instrument: 'bass' },
    'let': { note: 'G3', duration: 0.3, instrument: 'bass' },
    'var': { note: 'A3', duration: 0.3, instrument: 'bass' },
    
    // Operators
    '=': { note: 'C4', duration: 0.1, instrument: 'click' },
    '==': { note: 'E4', duration: 0.15, instrument: 'click' },
    '===': { note: 'G4', duration: 0.2, instrument: 'click' },
    '+': { note: 'D4', duration: 0.1, instrument: 'bell' },
    '-': { note: 'B3', duration: 0.1, instrument: 'bell' },
    '*': { note: 'F4', duration: 0.1, instrument: 'bell' },
    '/': { note: 'A4', duration: 0.1, instrument: 'bell' },
    
    // Brackets and symbols
    '{': { note: 'C3', duration: 0.2, instrument: 'percussion' },
    '}': { note: 'C3', duration: 0.2, instrument: 'percussion' },
    '(': { note: 'E3', duration: 0.15, instrument: 'percussion' },
    ')': { note: 'E3', duration: 0.15, instrument: 'percussion' },
    '[': { note: 'G3', duration: 0.15, instrument: 'percussion' },
    ']': { note: 'G3', duration: 0.15, instrument: 'percussion' },
    ';': { note: 'F2', duration: 0.1, instrument: 'tick' },
    ',': { note: 'D2', duration: 0.05, instrument: 'tick' },
    
    // Common methods
    'console.log': { note: 'A5', duration: 0.4, instrument: 'echo' },
    'document': { note: 'F5', duration: 0.3, instrument: 'web' },
    'window': { note: 'D5', duration: 0.3, instrument: 'web' },
    'array': { note: 'B4', duration: 0.3, instrument: 'sequence' },
    'object': { note: 'G4', duration: 0.3, instrument: 'harmony' }
  };

  const instruments = [
    { id: 'piano', name: '🎹 Piano', color: '#2c3e50' },
    { id: 'violin', name: '🎻 Violin', color: '#8e44ad' },
    { id: 'guitar', name: '🎸 Guitar', color: '#e67e22' },
    { id: 'drums', name: '🥁 Drums', color: '#e74c3c' },
    { id: 'synth', name: '🎛️ Synthesizer', color: '#3498db' },
    { id: 'orchestral', name: '🎼 Orchestra', color: '#27ae60' }
  ];

  const codeTemplates = [
    {
      name: 'Hello World Function',
      code: `function sayHello() {
  console.log("Hello, World!");
  return "Hello!";
}`
    },
    {
      name: 'For Loop Melody',
      code: `for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  } else {
    console.log("odd");
  }
}`
    },
    {
      name: 'Class Definition Symphony',
      code: `class MusicPlayer {
  constructor(name) {
    this.name = name;
    this.isPlaying = false;
  }
  
  play() {
    this.isPlaying = true;
    return "Playing music";
  }
}`
    },
    {
      name: 'Array Processing Beat',
      code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = doubled.reduce((acc, n) => acc + n, 0);
console.log(sum);`
    }
  ];

  const generateMusicFromCode = (code) => {
    const music = [];
    let currentTime = 0;
    
    // Tokenize the code
    const tokens = code.match(/\w+|\S/g) || [];
    
    tokens.forEach((token, index) => {
      const mapping = codeToMusicMap[token.toLowerCase()] || codeToMusicMap[token];
      
      if (mapping) {
        music.push({
          ...mapping,
          time: currentTime,
          token: token,
          index: index
        });
        currentTime += mapping.duration;
      } else {
        // Generate notes based on character codes for unknown tokens
        if (token.match(/\w/)) {
          const charCode = token.charCodeAt(0);
          const noteIndex = (charCode % 12);
          const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
          const octave = Math.floor(charCode / 12) % 3 + 3;
          
          music.push({
            note: `${notes[noteIndex]}${octave}`,
            duration: 0.2,
            instrument: selectedInstrument,
            time: currentTime,
            token: token,
            index: index
          });
          currentTime += 0.2;
        }
      }
    });
    
    setGeneratedMusic(music);
    return music;
  };

  const playMusic = async (music = generatedMusic) => {
    setIsPlaying(true);
    setCurrentNote(-1);
    
    for (let i = 0; i < music.length; i++) {
      if (!isPlaying) break;
      
      setCurrentNote(i);
      const note = music[i];
      
      // Play the note using our sound system
      playNoteSound(note.note, note.duration, note.instrument);
      
      // Wait for the note duration
      await new Promise(resolve => setTimeout(resolve, note.duration * 1000));
    }
    
    setIsPlaying(false);
    setCurrentNote(-1);
  };

  const playNoteSound = (note, duration, instrument) => {
    // Convert note to frequency
    const noteFrequencies = {
      'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'F2': 87.31, 'D2': 73.42
    };
    
    const frequency = noteFrequencies[note] || 440;
    
    // Different sound types based on instrument
    switch (instrument) {
      case 'drum':
      case 'percussion':
        soundEffects.generateBeep(frequency * 0.5, duration, 'square');
        break;
      case 'bell':
        soundEffects.generateBeep(frequency, duration, 'sine');
        soundEffects.generateBeep(frequency * 2, duration * 0.5, 'sine');
        break;
      case 'bass':
        soundEffects.generateBeep(frequency * 0.5, duration, 'sawtooth');
        break;
      case 'click':
      case 'tick':
        soundEffects.generateBeep(frequency, duration * 0.5, 'square');
        break;
      default:
        soundEffects.generateBeep(frequency, duration, 'sine');
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    setCurrentNote(-1);
  };

  const saveTrack = () => {
    if (!musicTitle.trim() || generatedMusic.length === 0) return;
    
    const newTrack = {
      id: Date.now(),
      title: musicTitle,
      code: currentCode,
      music: generatedMusic,
      createdAt: new Date().toISOString(),
      duration: generatedMusic.reduce((acc, note) => acc + note.duration, 0)
    };
    
    setSavedTracks([...savedTracks, newTrack]);
    setMusicTitle('');
    onXPGained(25); // Reward for creating music!
    soundEffects.playAchievement();
  };

  const loadTemplate = (template) => {
    setCurrentCode(template.code);
    generateMusicFromCode(template.code);
  };

  const loadSavedTrack = (track) => {
    setCurrentCode(track.code);
    setGeneratedMusic(track.music);
    setMusicTitle(track.title);
  };

  return (
    <div className="code-music-generator">
      <div className="music-header">
        <h3>🎵 Code Music Generator</h3>
        <p>Transform your code into beautiful melodies! Each line creates unique musical patterns.</p>
      </div>

      <div className="music-workspace">
        {/* Code Input Section */}
        <div className="code-input-section">
          <div className="section-header">
            <h4>📝 Your Code</h4>
            <div className="instrument-selector">
              <label>🎛️ Instrument:</label>
              <select 
                value={selectedInstrument} 
                onChange={(e) => setSelectedInstrument(e.target.value)}
              >
                {instruments.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            className="code-textarea"
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            placeholder="Enter your code here to generate music..."
            rows={10}
          />

          <div className="code-actions">
            <button 
              className="generate-btn"
              onClick={() => generateMusicFromCode(currentCode)}
              disabled={!currentCode.trim()}
            >
              🎼 Generate Music
            </button>
            
            <div className="templates-dropdown">
              <select onChange={(e) => {
                if (e.target.value) {
                  const template = codeTemplates[parseInt(e.target.value)];
                  loadTemplate(template);
                }
              }}>
                <option value="">📋 Load Template...</option>
                {codeTemplates.map((template, index) => (
                  <option key={index} value={index}>{template.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Music Visualization */}
        <div className="music-visualization">
          <h4>🎹 Generated Music</h4>
          
          {generatedMusic.length > 0 ? (
            <div className="music-player">
              <div className="player-controls">
                <button 
                  className="play-btn"
                  onClick={() => playMusic()}
                  disabled={isPlaying}
                >
                  <FaPlay /> Play
                </button>
                <button 
                  className="stop-btn"
                  onClick={stopMusic}
                  disabled={!isPlaying}
                >
                  <FaStop /> Stop
                </button>
                
                <div className="track-info">
                  Duration: {Math.round(generatedMusic.reduce((acc, note) => acc + note.duration, 0))}s
                  | Notes: {generatedMusic.length}
                </div>
              </div>

              <div className="music-timeline">
                {generatedMusic.map((note, index) => (
                  <div 
                    key={index}
                    className={`music-note ${currentNote === index ? 'playing' : ''}`}
                    style={{
                      width: `${note.duration * 50}px`,
                      backgroundColor: getInstrumentColor(note.instrument),
                      height: `${getNoteHeight(note.note)}px`
                    }}
                    title={`${note.token} → ${note.note} (${note.instrument})`}
                  >
                    <span className="note-label">{note.token}</span>
                  </div>
                ))}
              </div>

              <div className="save-section">
                <input
                  type="text"
                  placeholder="Track title..."
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                />
                <button 
                  className="save-btn"
                  onClick={saveTrack}
                  disabled={!musicTitle.trim() || generatedMusic.length === 0}
                >
                  <FaSave /> Save Track (+25 XP)
                </button>
              </div>
            </div>
          ) : (
            <div className="no-music">
              <div className="music-placeholder">
                🎼 Your musical composition will appear here...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code-to-Music Legend */}
      <div className="music-legend">
        <h4>🎯 Code-to-Music Legend</h4>
        <div className="legend-grid">
          <div className="legend-category">
            <h5>Keywords</h5>
            <div className="legend-items">
              <span>function → 🎹 Piano chord</span>
              <span>if/else → 🎻 Violin notes</span>
              <span>for/while → 🥁 Drum beats</span>
              <span>return → 🪈 Flute melody</span>
            </div>
          </div>
          <div className="legend-category">
            <h5>Operators</h5>
            <div className="legend-items">
              <span>+, -, *, / → 🔔 Bell sounds</span>
              <span>=, ==, === → 🖱️ Click tones</span>
              <span>Brackets → 🎵 Percussion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Tracks */}
      {savedTracks.length > 0 && (
        <div className="saved-tracks">
          <h4>💾 Your Saved Tracks</h4>
          <div className="tracks-grid">
            {savedTracks.map(track => (
              <div key={track.id} className="track-card">
                <div className="track-info">
                  <h5>{track.title}</h5>
                  <p>{Math.round(track.duration)}s | {track.music.length} notes</p>
                  <small>{new Date(track.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="track-actions">
                  <button onClick={() => loadSavedTrack(track)}>
                    📂 Load
                  </button>
                  <button onClick={() => playMusic(track.music)}>
                    <FaPlay /> Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  function getInstrumentColor(instrument) {
    const colors = {
      piano: '#3498db',
      violin: '#9b59b6',
      drum: '#e74c3c',
      flute: '#2ecc71',
      synth: '#f39c12',
      bass: '#34495e',
      bell: '#f1c40f',
      click: '#95a5a6',
      percussion: '#e67e22',
      tick: '#bdc3c7'
    };
    return colors[instrument] || '#3498db';
  }

  function getNoteHeight(note) {
    const heights = {
      'C3': 20, 'D3': 25, 'E3': 30, 'F3': 35, 'G3': 40, 'A3': 45, 'B3': 50,
      'C4': 55, 'D4': 60, 'E4': 65, 'F4': 70, 'G4': 75, 'A4': 80, 'B4': 85,
      'C5': 90, 'D5': 95, 'E5': 100, 'F5': 105, 'G5': 110, 'A5': 115, 'B5': 120
    };
    return heights[note] || 60;
  }
};

export default CodeMusicGenerator;
