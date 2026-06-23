"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.css";

interface SkillItem {
  name: string;
  percentage: number;
  category: "Languages" | "AI & ML" | "Web Development";
}

const skillsData: SkillItem[] = [
  { name: "PYTHON", percentage: 95, category: "Languages" },
  { name: "SQL & C++", percentage: 75, category: "Languages" },
  { name: "MACHINE LEARNING", percentage: 88, category: "AI & ML" },
  { name: "PYTORCH & SLMs", percentage: 92, category: "AI & ML" },
  { name: "FASTAPI", percentage: 90, category: "Web Development" },
  { name: "REACT & NEXT.JS", percentage: 80, category: "Web Development" },
];

export const Stats: React.FC = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const renderBlocks = (pct: number) => {
    // 10 blocks total
    const filledCount = Math.round(pct / 10);
    const emptyCount = 10 - filledCount;
    return (
      <span className={styles.blockText}>
        {"█".repeat(filledCount)}
        <span className={styles.emptyBlocks}>{"░".repeat(emptyCount)}</span>
      </span>
    );
  };

  return (
    <section id="stats" className="game-section" style={{ backgroundColor: "rgba(18, 0, 36, 0.4)" }}>
      <div className="section-container" ref={containerRef}>
        {/* Section Header */}
        <h2 className="pricedown-title font-heading" style={{ fontSize: "3.5rem", marginBottom: "40px", textAlign: "center" }}>
          SKILLS & STATS
        </h2>

        {/* CRT Box Grid */}
        <div className={`pixel-border ${styles.statsContainer}`}>
          {/* Top Title Bar */}
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>PLAYER SKILLS SUMMARY</span>
            <span className={styles.panelRatio}>RESPECT LEVEL: AI SPECIALIST</span>
          </div>

          <div className={styles.panelBody}>
            {["Languages", "AI & ML", "Web Development"].map((category) => (
              <div key={category} className={styles.categoryBlock}>
                <h3 className={styles.categoryTitle} style={{ color: "var(--yellow)" }}>
                  {category.toUpperCase()}
                </h3>

                <div className={styles.skillsList}>
                  {skillsData
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name} className={styles.skillRow}>
                        <div className={styles.skillInfo}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillPct}>{skill.percentage}%</span>
                        </div>

                        <div className={styles.barWrapper}>
                          {/* Animated block bar fill */}
                          <div
                            className={styles.barFill}
                            style={{
                              width: inView ? `${skill.percentage}%` : "0%",
                              transitionDelay: `${inView ? 0.2 : 0}s`,
                            }}
                          >
                            {/* Graphical neon line */}
                            <div className={styles.neonSegment} />
                          </div>

                          {/* Block representation overlay */}
                          <div className={styles.blocksOverlay}>
                            {renderBlocks(skill.percentage)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
