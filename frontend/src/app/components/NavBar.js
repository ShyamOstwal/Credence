"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import { useSettings } from "../context/SettingsContext";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { settings } = useSettings();

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Dashboard" },
    { href: "/verify", label: "Verify" },
    { href: "/student", label: "Student" },
  ];

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shield body */}
              <path
                d="M20 3L5 10v10c0 9.38 6.4 18.16 15 20.36C28.6 38.16 35 29.38 35 20V10L20 3z"
                fill="currentColor"
                opacity="0.12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Checkmark */}
              <path
                d="M14 20l4 4 8-8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="navbar-title">Credence</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Settings button */}
          <button
            className={`nav-settings-btn ${settingsOpen ? "active" : ""}`}
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
            title="Settings"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            {/* Dark mode indicator dot */}
            {settings.darkMode && <span className="nav-settings-dot" />}
          </button>
        </div>
      </nav>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
