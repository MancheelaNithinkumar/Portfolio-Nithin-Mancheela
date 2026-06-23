"use client";

import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import styles from "./Navbar.module.css";

const menuItems = [
  { id: "safehouse", label: "Safehouse" },
  { id: "missions", label: "Missions" },
  { id: "properties", label: "Properties" },
  { id: "stats", label: "Stats" },
  { id: "contact-tommy", label: "Contact Tommy" },
];

export const Navbar: React.FC = () => {
  const { activeSection, setActiveSection, theme, toggleTheme, triggerSaveGame, isSaving } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scrolling to highlight the active section
  useEffect(() => {
    const sections = menuItems.map((item) => document.getElementById(item.id));

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [setActiveSection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for navbar height
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
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo / Title */}
        <a href="#safehouse" onClick={(e) => handleLinkClick(e, "safehouse")} className={styles.navLogo}>
          NITHIN KUMAR
        </a>

        {/* Hamburger Menu Icon */}
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links list */}
        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksActive : ""}`}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`${styles.navLink} ${
                  activeSection === item.id ? styles.activeLink : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}

          {/* Quick Action Buttons */}
          <li className={styles.navActions}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={styles.themeBtn}
              title={`Switch to ${theme === "night" ? "Day" : "Night"} Mode`}
            >
              {theme === "night" ? "☀️" : "🌙"}
            </button>

            {/* Save Button */}
            <button
              onClick={triggerSaveGame}
              disabled={isSaving}
              className={styles.saveBtn}
              title="Save Portfolio Game"
            >
              {isSaving ? "SAVING..." : "💾 SAVE"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
