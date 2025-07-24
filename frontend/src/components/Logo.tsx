import React from "react";

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "100%", height: "auto" }}
      aria-label="Airoam Logo"
    >
      <defs>
        <radialGradient id="mystic" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="60%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#mystic)" />
      <ellipse cx="32" cy="32" rx="18" ry="8" fill="url(#glow)" opacity="0.4">
        <animate attributeName="rx" values="18;24;18" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M20 44 Q32 20 44 44" stroke="#38bdf8" strokeWidth="3" fill="none" filter="url(#shadow)"/>
      <circle cx="32" cy="32" r="6" fill="#fff" opacity="0.7">
        <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="32" r="2" fill="#38bdf8" />
      <path d="M32 26 Q36 32 32 38 Q28 32 32 26" fill="#38bdf8" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
} 