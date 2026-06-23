"use client";

import React, { useState } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { LoadingScreen } from "./LoadingScreen";
import { HUD } from "./HUD";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { AboutPoliceFile } from "./AboutPoliceFile";
import { MissionsList } from "./MissionsList";
import { PropertiesList } from "./PropertiesList";
import { Stats } from "./Stats";
import { PayphoneContact } from "./PayphoneContact";
import { RadioPanel } from "./RadioPanel";
import { Footer } from "./Footer";
import { MissionPassedPopup } from "./MissionPassedPopup";
import { Mission, Property } from "@/lib/markdown";
import styles from "./PortfolioContainer.module.css";

interface PortfolioContainerProps {
  missions: Mission[];
  properties: Property[];
}

const PortfolioAppContent: React.FC<PortfolioContainerProps> = ({ missions, properties }) => {
  const [loading, setLoading] = useState(true);
  const { isSaving } = useGame();

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={styles.mainLayout}>
      {/* VCR scanlines overlay */}
      <div className="crt-overlay" />

      {/* FIXED UI ELEMENTS */}
      <Navbar />
      <HUD />
      <RadioPanel />

      {/* GAME SCROLL SECTIONS */}
      <main className={styles.scrollContainer}>
        {/* Safehouse section: Hero */}
        <div id="safehouse">
          <Hero />
        </div>

        {/* About Dossier */}
        <AboutPoliceFile />

        {/* Missions section: Projects */}
        <MissionsList missions={missions} />

        {/* Properties section: Experience */}
        <PropertiesList properties={properties} />

        {/* Stats section: Skills */}
        <Stats />

        {/* Contact Tommy section: Contact form */}
        <PayphoneContact />

        {/* Footer */}
        <Footer />
      </main>

      {/* POPUP NOTIFICATIONS */}
      <MissionPassedPopup />

      {/* Save Game Overlay visual indicator */}
      {isSaving && (
        <div className={styles.saveOverlay}>
          <div className={styles.savePopup}>
            <div className={styles.saveIcon}>💾</div>
            <h2 className={styles.saveTitle}>GAME SAVED</h2>
            <p className={styles.saveSub}>ALL PROGRESS SECURED IN SAFEHOUSE</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const PortfolioContainer: React.FC<PortfolioContainerProps> = ({ missions, properties }) => {
  return (
    <GameProvider>
      <PortfolioAppContent missions={missions} properties={properties} />
    </GameProvider>
  );
};
