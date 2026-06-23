"use client";

import React, { useState } from "react";
import styles from "./PayphoneContact.module.css";

export const PayphoneContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const playPayphoneSounds = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Play 2 short dial beeps, then a long tone (beep)
      const beep1 = ctx.createOscillator();
      const beep2 = ctx.createOscillator();
      const tone = ctx.createOscillator();
      const gain = ctx.createGain();

      beep1.type = "sine";
      beep1.frequency.setValueAtTime(350, now);
      beep1.frequency.setValueAtTime(440, now + 0.1);

      tone.type = "sine";
      tone.frequency.setValueAtTime(1000, now + 0.3); // "the beep"

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      beep1.connect(gain);
      tone.connect(gain);
      gain.connect(ctx.destination);

      beep1.start(now);
      beep1.stop(now + 0.25);
      
      tone.start(now + 0.3);
      tone.stop(now + 0.85);
    } catch (e) {
      console.warn("Audio Context block", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playPayphoneSounds();
    setStatus("TRANSMITTING...");

    // Simulate sending message
    setTimeout(() => {
      setStatus("TRANSMISSION SUCCESS! Tommy will call back soon.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact-tommy" className="game-section">
      <div className="section-container">
        {/* Section Title */}
        <h2 className="pricedown-title font-heading" style={{ fontSize: "3.5rem", marginBottom: "40px", textAlign: "center" }}>
          CONTACT TOMMY
        </h2>

        <div className={styles.payphoneGrid}>
          {/* Ringing Payphone (CSS Pixel Art) */}
          <div className={styles.payphoneVisual}>
            <div className={styles.phoneBooth}>
              <div className={styles.boothHeader}>
                <span className={styles.neonText}>TELEPHONE</span>
              </div>
              <div className={styles.boothBody}>
                {/* Ringing Phone receiver */}
                <div className={`${styles.phoneBase} ${styles.ringingPhone}`}>
                  <div className={styles.cradle} />
                  <div className={styles.receiver} />
                  <div className={styles.dialPad} />
                </div>
              </div>
            </div>

            {/* Social/Links Contacts */}
            <div className={styles.contactsCard}>
              <h3 className={styles.contactTitle}>CONTACT INFO:</h3>
              <ul className={styles.linksList}>
                <li>
                  <span className={styles.linkIcon}>✉️</span>
                  <a href="mailto:nithin@example.com" className={styles.contactLink}>
                    nithin@example.com
                  </a>
                </li>
                <li>
                  <span className={styles.linkIcon}>🔗</span>
                  <a href="https://linkedin.com/in/nithin-mancheela" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    linkedin.com/in/nithin-mancheela
                  </a>
                </li>
                <li>
                  <span className={styles.linkIcon}>📁</span>
                  <a href="https://github.com/MancheelaNithinkumar" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    github.com/MancheelaNithinkumar
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form dossier box */}
          <div className={`pixel-border ${styles.formBox}`}>
            <div className={styles.formHeader}>
              <span>PAYPHONE MESSAGE INTERACTIVE RECEIVER</span>
            </div>

            <form onSubmit={handleSubmit} className={styles.payphoneForm}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>CALLER NAME:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Insert Quarter / Type Name..."
                  className={styles.retroInput}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>CALLER EMAIL:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Contact Waveband..."
                  className={styles.retroInput}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>TRANSMISSION DETAIL:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Leave a message after the beep..."
                  rows={4}
                  className={`${styles.retroInput} ${styles.retroTextArea}`}
                  required
                />
              </div>

              {/* Status indicators */}
              {status && (
                <div className={styles.statusDisplay} style={{ color: status.includes("SUCCESS") ? "var(--cyan)" : "var(--yellow)" }}>
                  {status}
                </div>
              )}

              <button type="submit" className="retro-btn" style={{ width: "100%", marginTop: "10px" }}>
                [ SEND TRANSMISSION ]
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
