"use client";

import React from "react";
import { Property } from "@/lib/markdown";
import { useGame } from "@/context/GameContext";
import styles from "./PropertiesList.module.css";

interface PropertiesListProps {
  properties: Property[];
}

export const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
  const { triggerSaveGame } = useGame();

  const handlePropertyClick = (property: Property) => {
    // Play buying/save sound and show save indicator
    triggerSaveGame();
    
    // Play buying chime via browser Web Audio API
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // retro coin/buy sound: high pitch synth bleeps
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880.00, now + 0.08); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn("Failed to play property sound chime", e);
    }
  };

  return (
    <section id="properties" className="game-section">
      <div className="section-container">
        {/* Section Header */}
        <h2 className="pricedown-title font-heading" style={{ fontSize: "3.5rem", marginBottom: "40px", textAlign: "center" }}>
          PROPERTIES
        </h2>

        {/* List of properties */}
        <div className={styles.propertiesGrid}>
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => handlePropertyClick(property)}
              className={`pixel-border ${styles.propertyCard}`}
            >
              {/* Acquired Stamp */}
              <div className={styles.stampHeader}>
                <span className={styles.acquiredText}>PROPERTY ACQUIRED</span>
                <span className={styles.propertyValue} style={{ color: "var(--yellow)" }}>
                  VALUE: {property.rewardValue}
                </span>
              </div>

              {/* Pixel Art Building Icon (pure CSS/HTML) */}
              <div className={styles.iconContainer}>
                <div className={styles.pixelHouse}>
                  <div className={styles.roof} />
                  <div className={styles.houseBody}>
                    <div className={styles.door} />
                    <div className={styles.window} />
                  </div>
                </div>
              </div>

              {/* Title & Role */}
              <div className={styles.cardContent}>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <h4 className={styles.propertyRole} style={{ color: "var(--pink)" }}>
                  {property.role}
                </h4>

                <p className={styles.propertyDesc}>{property.content}</p>

                {/* Acquired Skills listing */}
                <div className={styles.skillsBox}>
                  <span className={styles.skillsLabel}>ASSETS DEPLOYED:</span>
                  <p className={styles.skillsText}>{property.skills}</p>
                </div>
              </div>

              {/* Bottom Status Banner */}
              <div className={styles.statusFooter}>
                <span>STATUS:</span>
                <span className={styles.statusCompleted}>{property.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
