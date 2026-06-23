"use client";

import React from "react";
import { Mission } from "@/lib/markdown";
import { useGame } from "@/context/GameContext";
import styles from "./MissionsList.module.css";

interface MissionsListProps {
  missions: Mission[];
}

export const MissionsList: React.FC<MissionsListProps> = ({ missions }) => {
  const { triggerMissionPassed } = useGame();

  const handleStartMission = (mission: Mission) => {
    // Trigger "Mission Passed" victory screen
    triggerMissionPassed(mission.title, mission.reward);

    // Redirect to github after a short delay so they can see the effect
    if (mission.githubUrl || mission.demoUrl) {
      setTimeout(() => {
        window.open(mission.demoUrl || mission.githubUrl, "_blank");
      }, 1000);
    }
  };

  return (
    <section id="missions" className="game-section" style={{ backgroundColor: "rgba(18, 0, 36, 0.4)" }}>
      <div className="section-container">
        {/* Section Header */}
        <h2 className="pricedown-title font-heading" style={{ fontSize: "3.5rem", marginBottom: "40px", textAlign: "center" }}>
          MISSIONS
        </h2>

        {/* Grid of Missions */}
        <div className={styles.missionsGrid}>
          {missions.map((mission) => (
            <div key={mission.id} className={`pixel-border ${styles.missionCard}`}>
              {/* Mission Header Banner */}
              <div className={styles.missionHeader}>
                <span className={styles.missionNum}>MISSION #{mission.missionNumber}</span>
                <span className={styles.missionReward} style={{ color: "var(--cyan)" }}>
                  REWARD: {mission.reward}
                </span>
              </div>

              {/* Title */}
              <h3 className={styles.missionTitle}>{mission.title}</h3>

              {/* Description */}
              <p className={styles.missionDesc}>{mission.content}</p>

              {/* Meta Stats: Difficulty & Tech Stack */}
              <div className={styles.metaRow}>
                <div className={styles.difficultyCol}>
                  <span className={styles.metaLabel}>DIFFICULTY:</span>
                  <div className={styles.starsBox}>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <div
                        key={starIndex}
                        className={`pixel-star ${starIndex <= mission.difficulty ? "" : "empty"}`}
                        style={{ width: "14px", height: "14px" }}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.techCol}>
                  <span className={styles.metaLabel}>TECH STACK:</span>
                  <div className={styles.badgesBox}>
                    {mission.techStack.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className={styles.actionRow}>
                <button
                  onClick={() => handleStartMission(mission)}
                  className="retro-btn"
                  style={{ width: "100%" }}
                >
                  [ START MISSION ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
