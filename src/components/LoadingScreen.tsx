"use client";

import React, { useState, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingArtworks = [
  {
    title: "NITHIN MANCHEELA",
    subtitle: "AI ENGINEER",
    color: "#ff0080",
    gradient: "linear-gradient(135deg, #2b004f 0%, #ff0080 100%)",
    role: "AI & Machine Learning Specialist",
    asset: "🌴"
  },
  {
    title: "VICE CITY",
    subtitle: "MIAMI PORTFOLIO",
    color: "#00ffff",
    gradient: "linear-gradient(135deg, #120024 0%, #00ffff 100%)",
    role: "Next.js & TypeScript Expert",
    asset: "🏎️"
  },
  {
    title: "MISSION PASSED",
    subtitle: "RESPECT +",
    color: "#ffd60a",
    gradient: "linear-gradient(135deg, #5a189a 0%, #ffd60a 100%)",
    role: "Full Stack Web Developer",
    asset: "🚁"
  }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [artIndex, setArtIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Animate Progress Bar
  useEffect(() => {
    const duration = 3000; // 3 seconds
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait 300ms, then trigger fade out
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 800); // Allow fade animation to complete
          }, 300);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Cycle artworks every 1s
  useEffect(() => {
    const artTimer = setInterval(() => {
      setArtIndex((prev) => (prev + 1) % loadingArtworks.length);
    }, 1000);

    return () => clearInterval(artTimer);
  }, []);

  if (!visible) return null;

  const currentArt = loadingArtworks[artIndex];

  return (
    <div className={`${styles.loadingWrapper} ${!visible ? styles.fadeOut : ""}`}>
      {/* Background artwork */}
      <div 
        className={styles.loadingBackground} 
        style={{ background: currentArt.gradient }}
      />
      
      {/* Dynamic 80s Grid lines */}
      <div className={styles.gridOverlay} />

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.artShowcase}>
          <span className={styles.pixelEmoji}>{currentArt.asset}</span>
          <h1 className="pricedown-title" style={{ fontSize: "5rem", margin: "0" }}>
            {currentArt.title}
          </h1>
          <p className={styles.subtitle} style={{ color: currentArt.color }}>
            {currentArt.subtitle}
          </p>
          <div className={styles.roleBadge} style={{ borderColor: currentArt.color }}>
            {currentArt.role}
          </div>
        </div>

        {/* Loading details */}
        <div className={styles.loadingBarContainer}>
          <div className={styles.statusText}>
            <span>LOADING MISSION CONTENT...</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className={styles.loadingBarOutline}>
            <div 
              className={styles.loadingBarFill} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className={styles.hintText}>
            HINT: SCROLL TO ACQUIRE PROPERTIES AND INCREASE WANTED LEVEL
          </div>
        </div>
      </div>
      
      {/* VCR scanlines overlay */}
      <div className="crt-overlay" />
    </div>
  );
};
