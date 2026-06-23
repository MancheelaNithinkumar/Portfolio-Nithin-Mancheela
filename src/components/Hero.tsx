"use client";

import React from "react";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="safehouse" className={styles.heroSection}>
      {/* Background Pixel-art Sunset Sky */}
      <div className="sunset-sky">
        {/* Animated Sun */}
        <div className="retro-sun" />

        {/* Small Birds flying */}
        <div className={styles.bird} style={{ top: "10%", animationDelay: "0s", animationDuration: "14s" }} />
        <div className={styles.bird} style={{ top: "18%", animationDelay: "4s", animationDuration: "18s" }} />
        <div className={styles.bird} style={{ top: "25%", animationDelay: "8s", animationDuration: "16s" }} />

        {/* Flying Helicopter */}
        <div className="helicopter-container">
          <div className="pixel-heli">
            <div className="heli-rotor-mast" />
            <div className="heli-rotor-main" />
            <div className="heli-body">
              <div className="heli-cockpit" />
            </div>
            <div className="heli-tail" />
            <div className="heli-tail-fin" />
            <div className="heli-skid-strut" />
            <div className="heli-skid-strut back" />
            <div className="heli-skid" />
          </div>
        </div>

        {/* Buildings silhouette */}
        <div className="buildings-silhouette" />

        {/* Ocean Horizon */}
        <div className="ocean-horizon" />
      </div>

      {/* Swaying Palm Trees */}
      <div className="palm-tree left">
        <div className="palm-leaves">
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
        </div>
        <div className="palm-trunk" />
      </div>

      <div className="palm-tree right">
        <div className="palm-leaves">
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
          <div className="palm-leaf" />
        </div>
        <div className="palm-trunk" />
      </div>

      {/* Moving sports car */}
      <div className="sports-car-container">
        <div className="pixel-car">
          <div className="car-cabin" />
          <div className="car-spoiler" />
          <div className="car-body" />
          <div className="car-wheel back">
            <div className="car-wheel-hub" />
          </div>
          <div className="car-wheel front">
            <div className="car-wheel-hub" />
          </div>
          <div className="car-glow-under" />
        </div>
      </div>

      {/* Neon grid floor */}
      <div className="neon-grid-floor" />

      {/* Center content overlay */}
      <div className={styles.heroContent}>
        <div className={styles.titleContainer}>
          <div className={styles.preTitle}>GTA</div>
          <h1 className="pricedown-title font-heading" style={{ fontSize: "5.5rem" }}>
            NITHIN MANCHEELA
          </h1>
          <div className={`${styles.subTitle} flicker-slow`}>
            AI Engineer | ML Enthusiast | Full Stack Developer
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button
            onClick={() => handleScrollTo("missions")}
            className="retro-btn"
            style={{ fontSize: "0.9rem", padding: "16px 32px" }}
          >
            [ START MISSION ]
          </button>
          <button
            onClick={() => handleScrollTo("contact-tommy")}
            className="retro-btn"
            style={{
              fontSize: "0.9rem",
              padding: "16px 32px",
              borderColor: "var(--orange)",
            }}
          >
            [ CONTACT TOMMY ]
          </button>
        </div>
      </div>
    </section>
  );
};
