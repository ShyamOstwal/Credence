"use client";

import { ToastProvider } from "./Toast";
import { SettingsProvider } from "../context/SettingsContext";

export default function Providers({ children }) {
  return (
    <SettingsProvider>
      <ToastProvider>{children}</ToastProvider>
    </SettingsProvider>
  );
}
