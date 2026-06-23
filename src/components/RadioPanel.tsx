"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGame } from "@/context/GameContext";
import styles from "./RadioPanel.module.css";

const stations = [
  { name: "Wave 103", frequency: "103.7", genre: "Synthwave / New Wave" },
  { name: "Flash FM", frequency: "105.1", genre: "Pop / 80s Dance" },
  { name: "V-Rock", frequency: "107.5", genre: "Hard Rock / Metal" },
  { name: "Emotion 98.3", frequency: "98.3", genre: "Soft Ballads / Soul" },
];

export const RadioPanel: React.FC = () => {
  const { radioStation, setRadioStation, isRadioPlaying, setIsRadioPlaying } = useGame();
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sequencerIntervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Stop sound on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
    };
  }, []);

  // Sync synthesizer state when station or play/pause state changes
  useEffect(() => {
    if (isRadioPlaying) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }
  }, [isRadioPlaying, radioStation]);

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Draw frequency visualizer
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const bufferLength = analyserRef.current?.frequencyBinCount || 32;
      const dataArray = new Uint8Array(bufferLength);

      if (isRadioPlaying && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Flatline visualizer when paused
        dataArray.fill(0);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Add random jitter to simulate radio noise if playing
        let barHeight = dataArray[i];
        if (isRadioPlaying && barHeight === 0) {
          barHeight = Math.floor(Math.random() * 8);
        }

        const normalizedHeight = (barHeight / 255) * canvas.height;
        ctx.fillStyle = `hsl(${(i * 360) / bufferLength}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - normalizedHeight, barWidth - 1, normalizedHeight);
        x += barWidth;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRadioPlaying]);

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;

      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;

      analyserRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  const startSynthesizer = () => {
    initAudio();
    stopSynthesizer(); // Clear current loops

    const ctx = audioContextRef.current;
    const dest = analyserRef.current;
    if (!ctx || !dest) return;

    let beat = 0;

    // Define different synth behaviors per channel
    const playStep = () => {
      if (!ctx || ctx.state === "suspended") return;
      const time = ctx.currentTime;

      if (radioStation === "Wave 103") {
        // Dark Synthwave Bassline: Sawtooth arpeggio
        // Notes: A1 (55Hz), C2 (65Hz), E2 (82Hz), G2 (98Hz)
        const bassNotes = [55.0, 55.0, 65.4, 65.4, 82.4, 82.4, 98.0, 73.4];
        const freq = bassNotes[beat % bassNotes.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(time);
        osc.stop(time + 0.25);

        // Hi-hat sound
        if (beat % 2 === 1) {
          const noise = ctx.createOscillator();
          const noiseGain = ctx.createGain();
          noise.type = "triangle";
          noise.frequency.setValueAtTime(10000, time);
          noiseGain.gain.setValueAtTime(0.02, time);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

          noise.connect(noiseGain);
          noiseGain.connect(dest);
          noise.start(time);
          noise.stop(time + 0.06);
        }
      } else if (radioStation === "Flash FM") {
        // Pop Dance: Square wave happy chords
        // A minor progress: Am, G, F, E
        const chordRoots = [220, 220, 196, 196, 174, 174, 164, 164];
        const root = chordRoots[Math.floor(beat / 2) % chordRoots.length];
        
        // Root and Third
        [root, root * 1.25].forEach((freqVal, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "square";
          osc.frequency.setValueAtTime(freqVal, time);

          gain.gain.setValueAtTime(0.05, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(time);
          osc.stop(time + 0.4);
        });

        // Simulating kick drum
        if (beat % 4 === 0) {
          const kick = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kick.frequency.setValueAtTime(150, time);
          kick.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);
          kickGain.gain.setValueAtTime(0.3, time);
          kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

          kick.connect(kickGain);
          kickGain.connect(dest);
          kick.start(time);
          kick.stop(time + 0.2);
        }
      } else if (radioStation === "V-Rock") {
        // Hard Rock: Aggressive low frequency power chords
        // D (146Hz), F (174Hz), C (130Hz)
        const metalNotes = [146.8, 146.8, 174.6, 174.6, 130.8, 130.8, 110.0, 110.0];
        const freq = metalNotes[beat % metalNotes.length];

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(freq, time);
        
        // Fifth interval to make a power chord
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(freq * 1.5, time);

        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(dest);
        
        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 0.25);
        osc2.stop(time + 0.25);

        // Crash cymbal on beat 0
        if (beat % 8 === 0) {
          const cymbal = ctx.createOscillator();
          const cymbalGain = ctx.createGain();
          cymbal.type = "sawtooth";
          cymbal.frequency.setValueAtTime(8000, time);
          cymbalGain.gain.setValueAtTime(0.03, time);
          cymbalGain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
          cymbal.connect(cymbalGain);
          cymbalGain.connect(dest);
          cymbal.start(time);
          cymbal.stop(time + 0.65);
        }
      } else if (radioStation === "Emotion 98.3") {
        // Soft Ballads: Smooth sine waves, slow progression
        const balladNotes = [293.6, 329.6, 349.2, 392.0];
        const root = balladNotes[Math.floor(beat / 4) % balladNotes.length];

        // Soft pad chords
        [root, root * 1.2, root * 1.5].forEach((freqVal) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          // Add low frequency vibrato
          osc.frequency.setValueAtTime(freqVal, time);

          gain.gain.setValueAtTime(0.06, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.75);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(time);
          osc.stop(time + 0.85);
        });
      }

      beat++;
    };

    // Run sequencer every 250ms (120 BPM)
    sequencerIntervalRef.current = window.setInterval(playStep, 250);
  };

  const stopSynthesizer = () => {
    if (sequencerIntervalRef.current) {
      clearInterval(sequencerIntervalRef.current);
      sequencerIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    setIsRadioPlaying(!isRadioPlaying);
  };

  const selectStation = (stationName: string) => {
    setRadioStation(stationName);
    if (!isRadioPlaying) {
      setIsRadioPlaying(true);
    }
  };

  const activeStationData = stations.find((s) => s.name === radioStation) || stations[0];

  return (
    <div className={styles.radioWrapper}>
      {/* Visualizer Display screen */}
      <div className={styles.radioScreen}>
        <div className={styles.screenRow}>
          <span className={styles.stationLabel}>TUNE</span>
          <span className={styles.stationFreq}>{activeStationData.frequency} FM</span>
        </div>
        <div className={styles.stationName}>{activeStationData.name}</div>
        <div className={styles.genreText}>{activeStationData.genre}</div>

        {/* Audio canvas visualizer */}
        <canvas ref={canvasRef} className={styles.visualizer} width={180} height={35} />
      </div>

      {/* Button Controls */}
      <div className={styles.controlsRow}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {isRadioPlaying ? "⏸ PAUSE" : "▶ PLAY"}
        </button>

        {/* Volume slider */}
        <div className={styles.volumeBox}>
          <span className={styles.volIcon}>🔊</span>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={styles.volumeSlider}
          />
        </div>
      </div>

      {/* Station Buttons Grid */}
      <div className={styles.stationsGrid}>
        {stations.map((station) => (
          <button
            key={station.name}
            onClick={() => selectStation(station.name)}
            className={`${styles.stationBtn} ${
              radioStation === station.name ? styles.activeStationBtn : ""
            }`}
          >
            {station.name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
};
