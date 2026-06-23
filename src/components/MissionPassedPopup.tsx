"use client";

import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import styles from "./MissionPassedPopup.module.css";

export const MissionPassedPopup: React.FC = () => {
  const { missionPassedName, missionPassedReward, clearMissionPassed } = useGame();

  useEffect(() => {
    if (!missionPassedName) return;

    // Trigger canvas confetti explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff0080", "#00ffff", "#ffd60a", "#ff6d00"],
    });

    // Play retro victory chime
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Synth Fanfare Progression
      // C3 (130Hz) -> E3 (164Hz) -> G3 (196Hz) -> C4 (261Hz) -> E4 (329Hz)
      const notes = [130.8, 164.8, 196.0, 261.6, 329.6];
      const durations = [0.15, 0.15, 0.15, 0.15, 0.5];

      let startTime = now;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Authentic 80s arcade triangle synth sound
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + durations[idx]);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + durations[idx] + 0.1);

        startTime += 0.14; // spacing between notes
      });
    } catch (e) {
      console.warn("Failed to play audio victory chime", e);
    }

    // Auto clear after 4 seconds
    const timer = setTimeout(() => {
      clearMissionPassed();
    }, 4000);

    return () => clearTimeout(timer);
  }, [missionPassedName, clearMissionPassed, missionPassedReward]);

  if (!missionPassedName) return null;

  return (
    <div className={styles.overlay} onClick={clearMissionPassed}>
      <div className={styles.popupBox}>
        {/* Banner with skewed letters */}
        <h2 className={styles.passedHeader}>MISSION PASSED!</h2>
        
        <div className={styles.divider} />
        
        <h3 className={styles.missionTitle}>{missionPassedName}</h3>
        
        <div className={styles.rewardContainer}>
          <span className={styles.rewardLabel}>REWARD:</span>
          <span className={styles.rewardValue}>{missionPassedReward || "$5,000"}</span>
        </div>

        <div className={styles.respectText}>RESPECT +</div>
        
        <div className={styles.clickHint}>[ CLICK ANYWHERE TO CLOSE ]</div>
      </div>
    </div>
  );
};
