"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface GameContextType {
  health: number;
  armor: number;
  money: number;
  wantedLevel: number;
  theme: "day" | "night";
  activeSection: string;
  radioStation: string;
  isRadioPlaying: boolean;
  isSaving: boolean;
  missionPassedName: string | null;
  missionPassedReward: string | null;
  toggleTheme: () => void;
  setHealth: (h: number) => void;
  setArmor: (a: number) => void;
  setMoney: (m: number) => void;
  setWantedLevel: (w: number) => void;
  setActiveSection: (section: string) => void;
  setRadioStation: (station: string) => void;
  setIsRadioPlaying: (playing: boolean) => void;
  triggerSaveGame: () => void;
  triggerMissionPassed: (name: string, reward: string) => void;
  clearMissionPassed: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [health, setHealthState] = useState(100);
  const [armor, setArmorState] = useState(50);
  const [money, setMoneyState] = useState(15000);
  const [wantedLevel, setWantedLevelState] = useState(1);
  const [theme, setTheme] = useState<"day" | "night">("night");
  const [activeSection, setActiveSection] = useState("safehouse");
  const [radioStation, setRadioStation] = useState("Wave 103");
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [missionPassedName, setMissionPassedName] = useState<string | null>(null);
  const [missionPassedReward, setMissionPassedReward] = useState<string | null>(null);

  // Apply theme class to document body
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Set initial scroll values
  useEffect(() => {
    // Health is always 100 initially, armor increases, wanted stars increase
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPos = window.scrollY;
      const scrollFraction = scrollPos / scrollHeight;

      // Money increases dynamically as we scroll
      // Max out money at $999999 when scrolled to the bottom
      const maxMoney = 999999;
      const baseMoney = 15000;
      const currentMoney = Math.min(maxMoney, Math.floor(baseMoney + scrollFraction * (maxMoney - baseMoney)));
      setMoneyState(currentMoney);

      // Wanted level changes based on scroll height (starts at 1, goes up to 5 stars)
      const currentWanted = Math.min(5, Math.max(1, Math.floor(1 + scrollFraction * 5)));
      setWantedLevelState(currentWanted);

      // Armor goes from 50 to 100 as we scroll
      const currentArmor = Math.min(100, Math.floor(50 + scrollFraction * 50));
      setArmorState(currentArmor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "night" ? "day" : "night"));
  };

  const setHealth = (h: number) => setHealthState(Math.min(100, Math.max(0, h)));
  const setArmor = (a: number) => setArmorState(Math.min(100, Math.max(0, a)));
  const setMoney = (m: number) => setMoneyState(m);
  const setWantedLevel = (w: number) => setWantedLevelState(Math.min(5, Math.max(0, w)));

  const triggerSaveGame = () => {
    setIsSaving(true);
    // Simulate save duration
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  const triggerMissionPassed = (name: string, reward: string) => {
    setMissionPassedName(name);
    setMissionPassedReward(reward);
  };

  const clearMissionPassed = () => {
    setMissionPassedName(null);
    setMissionPassedReward(null);
  };

  return (
    <GameContext.Provider
      value={{
        health,
        armor,
        money,
        wantedLevel,
        theme,
        activeSection,
        radioStation,
        isRadioPlaying,
        isSaving,
        missionPassedName,
        missionPassedReward,
        toggleTheme,
        setHealth,
        setArmor,
        setMoney,
        setWantedLevel,
        setActiveSection,
        setRadioStation,
        setIsRadioPlaying,
        triggerSaveGame,
        triggerMissionPassed,
        clearMissionPassed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
