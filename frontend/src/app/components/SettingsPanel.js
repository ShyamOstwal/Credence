"use client";

import { useSettings } from "../context/SettingsContext";

/* ---- Reusable sub-components ---- */

function Toggle({ checked, onChange, id }) {
  return (
    <label className="settings-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="settings-toggle-input"
      />
      <span className="settings-toggle-track">
        <span className="settings-toggle-thumb" />
      </span>
    </label>
  );
}

function Select({ value, onChange, options, id }) {
  return (
    <select
      id={id}
      className="settings-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="setting-row">
      <div className="setting-info">
        <span className="setting-label">{label}</span>
        {description && (
          <span className="setting-description">{description}</span>
        )}
      </div>
      <div className="setting-control">{children}</div>
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="settings-section-header">
      <span className="settings-section-icon">{icon}</span>
      <span className="settings-section-title">{title}</span>
    </div>
  );
}

/* ---- Main Panel ---- */

export default function SettingsPanel({ open, onClose }) {
  const { settings, update, reset } = useSettings();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`settings-backdrop ${open ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`settings-drawer ${open ? "open" : ""}`} role="dialog" aria-label="Settings">
        {/* Header */}
        <div className="settings-header">
          <div className="settings-header-left">
            <span className="settings-header-icon">⚙️</span>
            <div>
              <h2 className="settings-title">Settings</h2>
              <p className="settings-subtitle">Customize your experience</p>
            </div>
          </div>
          <button className="settings-close" onClick={onClose} aria-label="Close settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="settings-body">

          {/* ── Appearance ── */}
          <section className="settings-section">
            <SectionHeader icon="🎨" title="Appearance" />

            <SettingRow
              label="Dark Mode"
              description="Switch to a darker color palette"
            >
              <Toggle
                id="dark-mode"
                checked={settings.darkMode}
                onChange={(v) => update("darkMode", v)}
              />
            </SettingRow>

            <SettingRow
              label="Font Size"
              description="Adjust the base text size"
            >
              <Select
                id="font-size"
                value={settings.fontSize}
                onChange={(v) => update("fontSize", v)}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
              />
            </SettingRow>

            <SettingRow
              label="Compact Mode"
              description="Reduce padding for a denser layout"
            >
              <Toggle
                id="compact-mode"
                checked={settings.compactMode}
                onChange={(v) => update("compactMode", v)}
              />
            </SettingRow>

            <SettingRow
              label="Animations"
              description="Enable smooth transitions and micro-animations"
            >
              <Toggle
                id="animations"
                checked={settings.animationsEnabled}
                onChange={(v) => update("animationsEnabled", v)}
              />
            </SettingRow>
          </section>

          {/* ── Network ── */}
          <section className="settings-section">
            <SectionHeader icon="🌐" title="Network" />

            <SettingRow
              label="Network Display"
              description="Which network label to show in the UI"
            >
              <Select
                id="network-display"
                value={settings.networkDisplay}
                onChange={(v) => update("networkDisplay", v)}
                options={[
                  { value: "mainnet", label: "Mainnet" },
                  { value: "testnet", label: "Sepolia Testnet" },
                  { value: "local", label: "Local (Hardhat)" },
                ]}
              />
            </SettingRow>
          </section>

          {/* ── Verification ── */}
          <section className="settings-section">
            <SectionHeader icon="🔒" title="Verification" />

            <SettingRow
              label="Auto-Verify on Upload"
              description="Automatically query blockchain when a file is dropped"
            >
              <Toggle
                id="auto-verify"
                checked={settings.autoVerify}
                onChange={(v) => update("autoVerify", v)}
              />
            </SettingRow>

            <SettingRow
              label="Show Certificate Hashes"
              description="Display raw SHA-256 hashes in verification results"
            >
              <Toggle
                id="show-hashes"
                checked={settings.showHashes}
                onChange={(v) => update("showHashes", v)}
              />
            </SettingRow>
          </section>

          {/* ── About ── */}
          <section className="settings-section">
            <SectionHeader icon="ℹ️" title="About" />
            <div className="settings-about">
              <div className="settings-about-logo">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3L5 10v10c0 9.38 6.4 18.16 15 20.36C28.6 38.16 35 29.38 35 20V10L20 3z"
                    fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="settings-app-name">Credence</p>
                <p className="settings-app-version">Blockchain Certificate Verification</p>
                <p className="settings-app-version">Secured by Ethereum &amp; IPFS</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <button className="settings-reset-btn" onClick={reset}>
            Reset to Defaults
          </button>
          <button className="settings-save-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>
    </>
  );
}
