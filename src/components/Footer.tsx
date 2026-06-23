"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const { isSaving } = useGame();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Banner Passed */}
        <div className={styles.respectBanner}>
          <span className={styles.passedText}>MISSION PASSED!</span>
          <span className={styles.respectText}>RESPECT +</span>
        </div>

        {/* copyright and save details */}
        <div className={styles.metaRow}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} NITHIN KUMAR. ALL RIGHTS RESERVED.
          </p>

          <div className={styles.savingIndicator}>
            {/* Blinking floppy drive logo */}
            <span className={`${styles.floppyIcon} ${isSaving ? styles.savingFloppy : ""}`}>
              💾
            </span>
            <span className={styles.savingText}>
              {isSaving ? "SAVING GAME..." : "AUTO-SAVING..."}
            </span>
          </div>
        </div>
      </div>
      
      {/* VCPD monitor frame border lines */}
      <div className={styles.bottomBorderLine} />
    </footer>
  );
};
