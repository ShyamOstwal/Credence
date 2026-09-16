"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultSettings = {
  darkMode: false,
  fontSize: "medium",       // "small" | "medium" | "large"
  compactMode: false,
  animationsEnabled: true,
  networkDisplay: "mainnet", // "mainnet" | "testnet" | "local"
  autoVerify: false,
  showHashes: true,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("credence-settings");
      if (stored) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch (_) {}
    setLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("credence-settings", JSON.stringify(settings));
  }, [settings, loaded]);

  // Apply CSS classes / variables to <html>
  useEffect(() => {
    if (!loaded) return;
    const root = document.documentElement;

    // Dark mode
    if (settings.darkMode) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    // Font size
    const fontSizeMap = { small: "14px", medium: "16px", large: "18px" };
    root.style.fontSize = fontSizeMap[settings.fontSize] ?? "16px";

    // Compact mode
    if (settings.compactMode) {
      root.setAttribute("data-compact", "true");
    } else {
      root.removeAttribute("data-compact");
    }

    // Animations
    if (!settings.animationsEnabled) {
      root.setAttribute("data-no-animations", "true");
    } else {
      root.removeAttribute("data-no-animations");
    }
  }, [settings, loaded]);

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const reset = () => setSettings(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
