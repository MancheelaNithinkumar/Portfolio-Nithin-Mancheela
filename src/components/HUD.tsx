"use client";

import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import styles from "./HUD.module.css";

export const HUD: React.FC = () => {
  const { health, armor, money, wantedLevel } = useGame();
  const [timeStr, setTimeStr] = useState("12:00");

  // Keep digital clock updated
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format money with leading zeros (e.g. $0099999)
  const formattedMoney = "$" + String(money).padStart(8, "0");

  return (
    <div className={styles.hudContainer}>
      {/* Clock */}
      <div className={styles.hudClock}>{timeStr}</div>

      {/* Wanted Stars */}
      <div className={styles.wantedContainer}>
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <div
            key={starIndex}
            className={`pixel-star ${starIndex <= wantedLevel ? "blink" : "empty"}`}
          />
        ))}
      </div>

      {/* Stats Indicators */}
      <div className={styles.barsContainer}>
        {/* Health Row */}
        <div className={styles.statRow}>
          <span className={styles.statLabel} style={{ color: "var(--pink)" }}>❤️</span>
          <div className={styles.barOutline}>
            <div
              className={styles.barFill}
              style={{
                width: `${health}%`,
                backgroundColor: "var(--pink)",
                boxShadow: "0 0 8px var(--pink)",
              }}
            />
          </div>
          <span className={styles.barValue}>{health}</span>
        </div>

        {/* Armor Row */}
        <div className={styles.statRow}>
          <span className={styles.statLabel} style={{ color: "var(--cyan)" }}>🛡️</span>
          <div className={styles.barOutline}>
            <div
              className={styles.barFill}
              style={{
                width: `${armor}%`,
                backgroundColor: "var(--cyan)",
                boxShadow: "0 0 8px var(--cyan)",
              }}
            />
          </div>
          <span className={styles.barValue}>{armor}</span>
        </div>
      </div>

      {/* Money Ticker */}
      <div className={styles.hudMoney}>{formattedMoney}</div>
    </div>
  );
};
