"use client";

import React, { useEffect, useRef, useState } from "react";

interface SunsetHeroEnhancedProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Enhanced SunsetHero — advanced animated sunset with:
 * - Particle system (dust motes, sparkles)
 * - Mouse parallax on sun/layers
 * - Dynamic star field appearing at dusk
 * - Fog/cloud layers with depth
 * - Wave physics with foam
 * - Performance optimized with RAF
 * - Respects prefers-reduced-motion
 */
export default function SunsetHeroEnhanced({
  title = "Karimunjawa Tours",
  subtitle = "Susuri senja di gugusan pulau Karimunjawa",
  children,
  className = "",
}: SunsetHeroEnhancedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
    const forceUpdateRef = useRef<React.Dispatch<React.SetStateAction<number>>>();

    // Force re-render state for animation loop
    const [, forceUpdate] = useState(0);
    forceUpdateRef.current = forceUpdate;

  // Particle system
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    phase: number;
    type: "dust" | "sparkle";
  }>>([]);

  // Stars for night transition
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    brightness: number;
    twinklePhase: number;
    twinkleSpeed: number;
  }>>([]);

  // Initialize particles and stars
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Create particles
    particlesRef.current = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 1600,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.1 - Math.random() * 0.3,
      size: 1 + Math.random() * 2.5,
      opacity: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      type: Math.random() > 0.7 ? "sparkle" : "dust",
    }));

    // Create stars (initially invisible, fade in as sun sets)
    starsRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * 1600,
      y: Math.random() * 400, // Upper portion only
      size: 0.5 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
    }));

    return () => {
      mediaQuery.removeEventListener("change", handler);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Mouse parallax handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => containerRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
    useEffect(() => {
      if (prefersReducedMotion) return;

      const animate = (timestamp: number) => {
        timeRef.current = timestamp * 0.001; // seconds
              forceUpdateRef.current?.(n => n + 1);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [prefersReducedMotion]);

  const t = timeRef.current;

  // Parallax offsets based on mouse
  const parallaxStrength = 30;
  const sunParallaxX = (mousePos.x - 0.5) * parallaxStrength * 0.5;
  const sunParallaxY = (mousePos.y - 0.5) * parallaxStrength * 0.3;
  const cloudParallaxX = (mousePos.x - 0.5) * parallaxStrength;
  const cloudParallaxY = (mousePos.y - 0.5) * parallaxStrength * 0.4;
  const starParallaxX = (mousePos.x - 0.5) * parallaxStrength * 0.2;
  const starParallaxY = (mousePos.y - 0.5) * parallaxStrength * 0.15;

  // Sun position with gentle bob
  const sunBobY = Math.sin(t * 0.4) * 8;
  const sunGlowScale = 1 + Math.sin(t * 0.6) * 0.05;
  const sunGlowOpacity = 0.85 + Math.sin(t * 0.6) * 0.1;

  // Wave animations
  const waveBackOffset = (t * 15) % 1600;
  const waveMidOffset = (t * 22) % 1600;
  const waveFrontOffset = (t * 35) % 1600;

  // Reflection shimmer
  const shimmer1 = 0.15 + Math.sin(t * 1.2) * 0.1;
  const shimmer2 = 0.1 + Math.cos(t * 1.5 + 1) * 0.08;
  const shimmer3 = 0.12 + Math.sin(t * 0.9 + 2) * 0.09;

  // Star visibility (fade in as "sun sets" - based on time)
  // For demo, we'll use a slow cycle: stars appear when sun is lower
  const starVisibility = Math.max(0, Math.sin(t * 0.05) * 0.5 + 0.3);

  // Fog/cloud positions
  const fog1X = ((t * 8) % 1600) + cloudParallaxX * 0.5;
  const fog2X = ((t * 5 + 800) % 1600) + cloudParallaxX * 0.3;
  const fog3X = ((t * 3 + 400) % 1600) + cloudParallaxX * 0.2;

  if (prefersReducedMotion) {
    // Static fallback
    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full min-h-[420px] overflow-hidden ${className}`}
        role="img"
        aria-label="Illustrasi matahari terbenam di pantai Karimunjawa"
      >
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a0d2e" />
              <stop offset="30%" stopColor="#5c2a4a" />
              <stop offset="55%" stopColor="#c85a3a" />
              <stop offset="75%" stopColor="#ffb85c" />
              <stop offset="100%" stopColor="#ffe8b8" />
            </linearGradient>
            <radialGradient id="sh-sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5d6" stopOpacity="1" />
              <stop offset="40%" stopColor="#ffd880" stopOpacity=".7" />
              <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sh-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d7a76" />
              <stop offset="50%" stopColor="#085856" />
              <stop offset="100%" stopColor="#042826" />
            </linearGradient>
            <linearGradient id="sh-reflection" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe8a0" stopOpacity=".5" />
              <stop offset="100%" stopColor="#ffe8a0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sh-islandFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#150c28" stopOpacity=".9" />
              <stop offset="100%" stopColor="#150c28" stopOpacity=".4" />
            </linearGradient>
            <radialGradient id="sh-fog1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3a254a" stopOpacity=".15" />
              <stop offset="100%" stopColor="#3a254a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sh-fog2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a305a" stopOpacity=".1" />
              <stop offset="100%" stopColor="#4a305a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="1600" height="900" fill="url(#sh-sky)" />

          {/* Far islands */}
          <path
            d="M100,580 Q180,520 270,550 Q340,530 400,570 L400,600 L100,600 Z"
            fill="url(#sh-islandFade)"
          />
          <path
            d="M1200,590 Q1300,540 1380,565 Q1440,550 1500,580 L1500,600 L1200,600 Z"
            fill="url(#sh-islandFade)"
            opacity="0.6"
          />

          {/* Fog layers */}
          <ellipse cx={800} cy={300} rx={600} ry={120} fill="url(#sh-fog1)" opacity="0.4" />
          <ellipse cx={800} cy={380} rx={700} ry={100} fill="url(#sh-fog2)" opacity="0.3" />

          {/* Sun */}
          <g transform="translate(800, 560)">
            <circle r="240" fill="url(#sh-sunGlow)" />
            <circle r="100" fill="#fff5d6" />
          </g>

          {/* Sea */}
          <rect x="0" y="560" width="1600" height="340" fill="url(#sh-sea)" />

          {/* Sun reflection */}
          <polygon points="720,560 880,560 950,900 650,900" fill="url(#sh-reflection)" />
          <g fill="#ffe8b0">
            <rect x="760" y="600" width="80" height="6" rx="3" opacity="0.25" />
            <rect x="740" y="660" width="120" height="7" rx="3" opacity="0.2" />
            <rect x="775" y="730" width="60" height="6" rx="3" opacity="0.22" />
            <rect x="730" y="800" width="150" height="9" rx="4" opacity="0.18" />
          </g>

          {/* Waves - static */}
          <g opacity="0.5">
            <path d="M0,650 Q100,630 200,650 T400,650 T600,650 T800,650 T1000,650 T1200,650 T1400,650 T1600,650 V900 H0 Z" fill="#085856" />
          </g>
          <g opacity="0.7">
            <path d="M0,700 Q120,675 240,700 T480,700 T720,700 T960,700 T1200,700 T1440,700 V900 H0 Z" fill="#042826" />
          </g>

          {/* Beach foam */}
          <path d="M0,860 Q400,830 800,858 T1600,850 V900 H0 Z" fill="#f4e0b3" opacity="0.9" />

          {/* Birds */}
          <g stroke="#2a1530" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6">
            <path d="M250,220 q16,-18 32,0 q16,-18 32,0" />
            <path d="M400,180 q13,-15 26,0 q13,-15 26,0" opacity="0.4" />
            <path d="M1100,200 q14,-17 28,0 q14,-17 28,0" opacity="0.5" />
          </g>
        </svg>

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
          {children ?? (
            <>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
                {title}
              </h1>
              <p className="mt-3 text-base md:text-lg text-white/90 drop-shadow max-w-2xl">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] overflow-hidden ${className}`}
      role="img"
      aria-label="Animasi matahari terbenam di pantai Karimunjawa dengan efek partikel dan paralaks"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Sky gradient - deep twilight */}
          <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d081a" />
            <stop offset="20%" stopColor="#2a1238" />
            <stop offset="40%" stopColor="#6b2a4a" />
            <stop offset="60%" stopColor="#d45a3a" />
            <stop offset="80%" stopColor="#ffbc4a" />
            <stop offset="100%" stopColor="#fff0c8" />
          </linearGradient>

          {/* Sun glow radial */}
          <radialGradient id="sh-sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e0" stopOpacity="1" />
            <stop offset="30%" stopColor="#ffe080" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ffb050" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff8030" stopOpacity="0" />
          </radialGradient>

          {/* Sea gradient */}
          <linearGradient id="sh-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a6e6a" />
            <stop offset="40%" stopColor="#074d4a" />
            <stop offset="70%" stopColor="#04302e" />
            <stop offset="100%" stopColor="#021816" />
          </linearGradient>

          {/* Sun reflection on water */}
          <linearGradient id="sh-reflection" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe8a0" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#ffd060" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffb840" stopOpacity="0" />
          </linearGradient>

          {/* Island silhouette fade */}
          <linearGradient id="sh-islandFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0618" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0a0618" stopOpacity="0.4" />
          </linearGradient>

          {/* Fog/cloud gradients */}
          <radialGradient id="sh-fog1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a3058" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#4a3058" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4a3058" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="sh-fog2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5a3a6a" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#5a3a6a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#5a3a6a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="sh-fog3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6a4a7a" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#6a4a7a" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#6a4a7a" stopOpacity="0" />
          </radialGradient>

          {/* Wave foam gradient */}
          <linearGradient id="sh-foam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffe8d0" stopOpacity="0.1" />
          </linearGradient>

          {/* Particle sparkle */}
          <radialGradient id="sh-sparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffd880" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ===== BACKGROUND SKY ===== */}
        <rect x="0" y="0" width="1600" height="900" fill="url(#sh-sky)" />

        {/* ===== STAR FIELD (fade in at dusk) ===== */}
        <g opacity={starVisibility}>
          {starsRef.current.map((star, i) => (
            <circle
              key={i}
              cx={star.x + starParallaxX}
              cy={star.y + starParallaxY}
              r={star.size}
              fill="#fff"
              opacity={star.brightness * (0.5 + Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.5)}
            />
          ))}

          {/* Shooting star - rare */}
          {Math.sin(t * 0.1) > 0.95 && (
            <line
              x1={1600 + Math.sin(t * 5) * 200}
              y1={-100 + Math.sin(t * 5) * 200}
              x2={1400 + Math.sin(t * 5) * 200}
              y2={100 + Math.sin(t * 5) * 200}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.8}
              filter="url(#sh-sparkle)"
            />
          )}
        </g>

        {/* ===== DISTANT ISLANDS ===== */}
        <path
          d="M80,580 Q160,510 250,545 Q320,525 390,565 L390,600 L80,600 Z"
          fill="url(#sh-islandFade)"
        />
        <path
          d="M1180,590 Q1280,535 1360,560 Q1420,545 1480,575 L1480,600 L1180,600 Z"
          fill="url(#sh-islandFade)"
          opacity="0.55"
        />
        <path
          d="M1400,585 Q1460,555 1500,570 L1500,600 L1400,600 Z"
          fill="url(#sh-islandFade)"
          opacity="0.4"
        />

        {/* ===== FOG / CLOUD LAYERS (parallax) ===== */}
        <ellipse
          cx={800 + cloudParallaxX * 0.3}
          cy={280 + cloudParallaxY * 0.2}
          rx={650}
          ry={130}
          fill="url(#sh-fog1)"
          opacity={0.35 + Math.sin(t * 0.08) * 0.05}
        />
        <ellipse
          cx={800 + cloudParallaxX * 0.2}
          cy={360 + cloudParallaxY * 0.15}
          rx={750}
          ry={110}
          fill="url(#sh-fog2)"
          opacity={0.28 + Math.cos(t * 0.06 + 1) * 0.04}
        />
        <ellipse
          cx={800 + cloudParallaxX * 0.15}
          cy={420 + cloudParallaxY * 0.1}
          rx={800}
          ry={90}
          fill="url(#sh-fog3)"
          opacity={0.22 + Math.sin(t * 0.05 + 2) * 0.03}
        />

        {/* ===== SUN WITH GLOW & PARALLAX ===== */}
        <g
          className="sh-sun"
          transform={`translate(${800 + sunParallaxX}, ${560 + sunParallaxY + sunBobY}) scale(${sunGlowScale})`}
          style={{ transformOrigin: "center" }}
        >
          {/* Outer glow */}
          <circle r="260" fill="url(#sh-sunGlow)" opacity={sunGlowOpacity} />
          {/* Mid glow */}
          <circle r="180" fill="url(#sh-sunGlow)" opacity={sunGlowOpacity * 0.6} />
          {/* Core */}
          <circle r="105" fill="#fff8e0" />
          {/* Inner core */}
          <circle r="55" fill="#fffde0" opacity="0.9" />
        </g>

        {/* ===== SEA ===== */}
        <rect x="0" y="560" width="1600" height="340" fill="url(#sh-sea)" />

        {/* ===== SUN REFLECTION ON WATER ===== */}
        <polygon
          points={`700,560 900,560 980,900 620,900`}
          fill="url(#sh-reflection)"
        />

        {/* Animated reflection shimmers */}
        <g fill="#ffe8b0">
          <rect x="750" y="600" width="100" height="8" rx="4" opacity={shimmer1} />
          <rect x="720" y="670" width="160" height="10" rx="5" opacity={shimmer2} />
          <rect x="770" y="740" width="70" height="8" rx="4" opacity={shimmer3} />
          <rect x="700" y="820" width="200" height="12" rx="6" opacity={0.1 + Math.sin(t * 0.7) * 0.05} />
          <rect x="780" y="780" width="50" height="6" rx="3" opacity={0.15 + Math.cos(t * 1.1) * 0.07} />
        </g>

        {/* ===== WAVE LAYERS (multiple depths) ===== */}
        {/* Far back wave */}
        <g opacity="0.35" transform={`translate(${-waveBackOffset}, 0)`}>
          <path
            d="M0,640 Q80,615 160,640 T320,640 T480,640 T640,640 T800,640 T960,640 T1120,640 T1280,640 T1440,640 T1600,640 V900 H0 Z"
            fill="#064a48"
          />
          <path
            d="M1600,640 Q1680,615 1760,640 T1920,640 T2080,640 T2240,640 T2400,640 T2560,640 T2720,640 T2880,640 T3040,640 T3200,640 V900 H1600 Z"
            fill="#064a48"
          />
        </g>

        {/* Mid wave */}
        <g opacity="0.55" transform={`translate(${-waveMidOffset}, 0)`}>
          <path
            d="M0,680 Q100,650 200,680 T400,680 T600,680 T800,680 T1000,680 T1200,680 T1400,680 T1600,680 V900 H0 Z"
            fill="#085856"
          />
          <path
            d="M1600,680 Q1700,650 1800,680 T2000,680 T2200,680 T2400,680 T2600,680 T2800,680 T3000,680 T3200,680 V900 H1600 Z"
            fill="#085856"
          />
        </g>

        {/* Front wave with foam */}
        <g opacity="0.8" transform={`translate(${-waveFrontOffset}, 0)`}>
          <path
            d="M0,720 Q120,685 240,720 T480,720 T720,720 T960,720 T1200,720 T1440,720 T1600,720 V900 H0 Z"
            fill="#032826"
          />
          <path
            d="M1600,720 Q1720,685 1840,720 T2080,720 T2320,720 T2560,720 T2800,720 T3040,720 T3200,720 V900 H1600 Z"
            fill="#032826"
          />
          {/* Foam on wave crests */}
          <g fill="url(#sh-foam)">
            <ellipse cx={240} cy={715} rx={30} ry={4} opacity={0.4 + Math.sin(t * 2) * 0.2} />
            <ellipse cx={720} cy={715} rx={40} ry={5} opacity={0.35 + Math.cos(t * 1.8 + 1) * 0.15} />
            <ellipse cx={1200} cy={715} rx={25} ry={4} opacity={0.3 + Math.sin(t * 2.2 + 2) * 0.1} />
            <ellipse cx={1680} cy={715} rx={35} ry={5} opacity={0.4 + Math.sin(t * 2 + 0.5) * 0.2} />
            <ellipse cx={2160} cy={715} rx={30} ry={4} opacity={0.35 + Math.cos(t * 1.8 + 1.5) * 0.15} />
          </g>
        </g>

        {/* ===== SHORELINE FOAM ===== */}
        <path
          d="M0,860 Q300,820 600,845 Q900,830 1200,855 Q1400,840 1600,850 V900 H0 Z"
          fill="#f0e8d8"
          opacity="0.92"
        />
        <path
          d="M0,870 Q250,835 500,855 Q750,840 1000,860 Q1250,845 1500,855 Q1600,850 1600,870 V900 H0 Z"
          fill="#fff"
          opacity={0.3 + Math.sin(t * 1.5) * 0.1}
        />

        {/* ===== PARTICLES (dust motes & sparkles) ===== */}
        <g filter="url(#sh-sparkle)">
          {particlesRef.current.map((p, i) => {
            // Update particle position (done in render for simplicity)
            const px = p.x + Math.sin(t * 0.5 + p.phase) * 20;
            const py = (p.y - t * 20 * Math.abs(p.vy)) % 900;
            const opacity = p.type === "sparkle"
              ? p.opacity * (0.5 + Math.sin(t * 3 + p.phase) * 0.5)
              : p.opacity;

            return (
              <circle
                key={i}
                cx={px}
                cy={py < 0 ? py + 900 : py}
                r={p.size}
                fill={p.type === "sparkle" ? "#ffe8a0" : "#fff"}
                opacity={opacity}
              />
            );
          })}
        </g>

        {/* ===== BIRDS ===== */}
        <g
          stroke="#1a0d28"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        >
          {/* Bird 1 */}
          <path
            d={`M${200 + Math.sin(t * 0.8) * 50},${200 + Math.cos(t * 0.6) * 20} q16,-18 32,0 q16,-18 32,0`}
            opacity={0.5 + Math.sin(t * 0.7) * 0.3}
          />
          {/* Bird 2 */}
          <path
            d={`M${350 + Math.sin(t * 0.7 + 1) * 40},${170 + Math.cos(t * 0.5 + 1) * 15} q13,-15 26,0 q13,-15 26,0`}
            opacity={0.4 + Math.cos(t * 0.6 + 2) * 0.25}
            strokeWidth="3"
          />
          {/* Bird 3 */}
          <path
            d={`M${1000 + Math.sin(t * 0.9 + 2) * 60},${220 + Math.cos(t * 0.7 + 2) * 25} q15,-17 30,0 q15,-17 30,0`}
            opacity={0.45 + Math.sin(t * 0.8 + 1) * 0.3}
          />
          {/* Bird 4 - smaller, higher */}
          <path
            d={`M${600 + Math.sin(t * 0.6 + 3) * 30},${140 + Math.cos(t * 0.4 + 3) * 10} q10,-12 20,0 q10,-12 20,0`}
            opacity={0.35 + Math.cos(t * 0.5 + 0.5) * 0.2}
            strokeWidth="2.5"
          />
          {/* Bird 5 - far right */}
          <path
            d={`M${1300 + Math.sin(t * 0.85 + 4) * 45},${190 + Math.cos(t * 0.65 + 4) * 20} q14,-16 28,0 q14,-16 28,0`}
            opacity={0.4 + Math.sin(t * 0.75 + 2.5) * 0.25}
            strokeWidth="3"
          />
        </g>

        {/* ===== SUBTLE VIGNETTE ===== */}
        <radialGradient id="sh-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="70%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
        <rect x="0" y="0" width="1600" height="900" fill="url(#sh-vignette)" pointerEvents="none" />
      </svg>

      {/* ===== FOREGROUND CONTENT ===== */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        {children ?? (
          <>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-fade-rise">
              {title}
            </h1>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] max-w-3xl animate-fade-rise delay-200">
              {subtitle}
            </p>
          </>
        )}
      </div>

      {/* Reduced motion notice (screen reader only) */}
      {prefersReducedMotion && (
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .sh-sun, .sh-wave-back, .sh-wave-front,
            .sh-shimmer-a, .sh-shimmer-b, .sh-shimmer-c,
            .sh-bird { animation: none !important; }
          }
        `}</style>
      )}
    </div>
  );
}