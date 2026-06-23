"use client";

import React, { useEffect, useState } from "react";
import styles from "./AboutPoliceFile.module.css";

export const AboutPoliceFile: React.FC = () => {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "Initializing record access... DECLASSIFIED. Welcome to Vice City Police Department Database.";

  // Typewriter effect for top terminal text
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="safehouse-about" className="game-section">
      <div className="section-container">
        {/* Section Title */}
        <h2 className="pricedown-title font-heading" style={{ fontSize: "3.5rem", marginBottom: "40px", textAlign: "center" }}>
          POLICE RECORD
        </h2>

        {/* Dossier Card with Pixel Border */}
        <div className={`pixel-border ${styles.dossierCard}`}>
          {/* Top terminal bar */}
          <div className={styles.terminalBar}>
            <div className={styles.terminalDot} style={{ backgroundColor: "#ff0055" }} />
            <div className={styles.terminalDot} style={{ backgroundColor: "#ffcc00" }} />
            <div className={styles.terminalDot} style={{ backgroundColor: "#00ffcc" }} />
            <span className={styles.terminalTitle}>VCPD_DATABASE_V1.03.EXE</span>
          </div>

          <div className={styles.terminalContent}>
            <p className={styles.terminalIntro}>
              &gt; {terminalText}
              <span className={styles.cursor}>_</span>
            </p>

            <div className={styles.dossierGrid}>
              {/* Profile Image (CSS Pixel Art Mugshot) */}
              <div className={styles.mugshotContainer}>
                <div className={styles.pixelMugshot}>
                  {/* CSS Pixel Silhouette / Avatar */}
                  <div className={styles.mugshotHair} />
                  <div className={styles.mugshotFace} />
                  <div className={styles.mugshotSunglasses} />
                  <div className={styles.mugshotShirt} />
                </div>
                <div className={styles.mugshotPlate}>
                  <span>VCPD - 8675309</span>
                  <span>NITHIN KUMAR</span>
                </div>
              </div>

              {/* Police File Fields */}
              <div className={styles.fileFields}>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>NAME:</span>
                  <span className={styles.fieldValue} style={{ color: "var(--pink)" }}>NITHIN KUMAR</span>
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>PROFESSION:</span>
                  <span className={styles.fieldValue} style={{ color: "var(--cyan)" }}>AI ENGINEER</span>
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>SPECIALIZATION:</span>
                  <span className={styles.fieldValue} style={{ color: "var(--orange)" }}>AI & ML</span>
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>LOCATION:</span>
                  <span className={styles.fieldValue}>INDIA</span>
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>STATUS:</span>
                  <span className={`${styles.fieldValue} ${styles.activeStatus}`}>ACTIVE</span>
                </div>

                <div className={styles.divider} />

                {/* Additional VCPD details */}
                <div className={styles.recordLog}>
                  <h3 className={styles.logTitle}>SUBJECT REPORT & INTEL:</h3>
                  <p className={styles.logText}>
                    Subject is highly skilled in training deep neural networks, deploying scalable FastAPI
                    backends, and crafting pixel-perfect Next.js web applications. Often spotted writing
                    automated workflows, fine-tuning large language models, and developing agentic architectures.
                  </p>
                  <p className={styles.logText} style={{ marginTop: "10px" }}>
                    <span style={{ color: "var(--yellow)" }}>WARNING:</span> Known to optimize computational speed by over 25% and automate entire business workflows. Approach with highly challenging tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
