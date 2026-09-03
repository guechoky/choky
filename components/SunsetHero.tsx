import React, { ReactNode } from "react";

interface SunsetHeroProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * SunsetHero — animated sunset-over-the-sea hero background.
 * Pure SVG + CSS (no video, no images), loops seamlessly.
 */
export default function SunsetHero({
  title = "Karimunjawa Tours",
  subtitle = "Susuri senja di gugusan pulau Karimunjawa",
  children,
}: SunsetHeroProps) {
  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden">
      <style>{`
        @keyframes sh-sunGlow {
          0%, 100% { opacity: .88; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.035); }
        }
        @keyframes sh-waveMoveSlow {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes sh-waveMoveFast {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes sh-shimmer {
          0%, 100% { opacity: .12; }
          50%      { opacity: .38; }
        }
        @keyframes sh-birdFly {
          0%   { transform: translate(-8%, 4%);  opacity: 0; }
          8%   { opacity: .55; }
          50%  { transform: translate(55%, -6%); }
          92%  { opacity: .55; }
          100% { transform: translate(118%, -14%); opacity: 0; }
        }
        .sh-sun        { animation: sh-sunGlow 6s ease-in-out infinite; transform-origin: center; }
        .sh-wave-back  { animation: sh-waveMoveSlow 22s linear infinite; }
        .sh-wave-front { animation: sh-waveMoveFast 14s linear infinite; }
        .sh-shimmer-a  { animation: sh-shimmer 4.5s ease-in-out infinite; }
        .sh-shimmer-b  { animation: sh-shimmer 5.5s ease-in-out infinite 1.2s; }
        .sh-shimmer-c  { animation: sh-shimmer 3.8s ease-in-out infinite 2.1s; }
        .sh-bird       { animation: sh-birdFly 17s linear infinite; }
        .sh-bird-delay { animation-delay: 6s; }

        @media (prefers-reduced-motion: reduce) {
          .sh-sun, .sh-wave-back, .sh-wave-front,
          .sh-shimmer-a, .sh-shimmer-b, .sh-shimmer-c,
          .sh-bird { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Animasi matahari terbenam di pantai"
      >
        <defs>
          <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#2b1150" />
            <stop offset="35%" stopColor="#8a3a63" />
            <stop offset="62%" stopColor="#f0764a" />
            <stop offset="82%" stopColor="#ffc46b" />
            <stop offset="100%" stopColor="#ffe1a0" />
          </linearGradient>

          <radialGradient id="sh-sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#fff3cf" stopOpacity="1" />
            <stop offset="35%" stopColor="#ffd27a" stopOpacity=".85" />
            <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="sh-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0e8c86" />
            <stop offset="45%" stopColor="#0a6a68" />
            <stop offset="100%" stopColor="#063836" />
          </linearGradient>

          <linearGradient id="sh-reflection" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#ffdf9e" stopOpacity=".55" />
            <stop offset="100%" stopColor="#ffdf9e" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="sh-islandFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1c1030" stopOpacity=".8" />
            <stop offset="100%" stopColor="#1c1030" stopOpacity=".5" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1600" height="900" fill="url(#sh-sky)" />

        <path
          d="M980,560 Q1040,500 1110,525 Q1180,505 1230,555 Q1300,545 1340,570 L1340,600 L980,600 Z"
          fill="url(#sh-islandFade)"
        />

        <g className="sh-sun">
          <circle cx="800" cy="560" r="230" fill="url(#sh-sunGlow)" />
          <circle cx="800" cy="560" r="92" fill="#fff3d6" />
        </g>

        <g className="sh-bird" stroke="#3a2038" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0">
          <path d="M300,230 q14,-16 28,0 q14,-16 28,0" />
        </g>
        <g className="sh-bird sh-bird-delay" stroke="#3a2038" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0">
          <path d="M420,190 q11,-13 22,0 q11,-13 22,0" />
        </g>

        <rect x="0" y="560" width="1600" height="340" fill="url(#sh-sea)" />

        <polygon points="740,560 860,560 920,900 680,900" fill="url(#sh-reflection)" />
        <g fill="#ffe6b0">
          <rect className="sh-shimmer-a" x="770" y="600" width="70" height="6" rx="3" opacity=".2" />
          <rect className="sh-shimmer-b" x="750" y="660" width="110" height="7" rx="3" opacity=".2" />
          <rect className="sh-shimmer-c" x="785" y="730" width="55" height="6" rx="3" opacity=".2" />
          <rect className="sh-shimmer-a" x="740" y="800" width="140" height="9" rx="4" opacity=".2" />
        </g>

        <g className="sh-wave-back" opacity=".55">
          <path d="M0,650 Q100,630 200,650 T400,650 T600,650 T800,650 V900 H0 Z" fill="#0a6a68" />
          <path d="M800,650 Q900,630 1000,650 T1200,650 T1400,650 T1600,650 V900 H800 Z" fill="#0a6a68" />
        </g>
        <g className="sh-wave-front" opacity=".8">
          <path d="M0,700 Q120,675 240,700 T480,700 T720,700 V900 H0 Z" fill="#063836" />
          <path d="M720,700 Q840,675 960,700 T1200,700 T1440,700 V900 H720 Z" fill="#063836" />
        </g>

        <path d="M0,860 Q400,830 800,858 T1600,850 V900 H0 Z" fill="#f4e0b3" opacity=".92" />
      </svg>

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        {children ?? (
          <>
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
              {title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-white/90 drop-shadow">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
