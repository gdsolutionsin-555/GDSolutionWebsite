import { useEffect, useRef, useState } from 'react';

interface Props {
  size?: number;
  /** Floating, waving hand and eyes that follow the cursor. */
  animated?: boolean;
  /** Eyes squint into a "thinking" shape. */
  thinking?: boolean;
  className?: string;
}

export default function RobotAvatar({ size = 64, animated = true, thinking = false, className = '' }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  // Pupils follow the pointer (clamped, throttled with rAF).
  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.max(Math.hypot(dx, dy), 1);
        const k = Math.min(d / 160, 1) * 3.2;
        setLook({ x: (dx / d) * k, y: (dy / d) * k });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [animated]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Lucky the robot assistant"
      className={`${animated ? 'robot-float' : ''} ${className}`}
    >
      <defs>
        <linearGradient id="rb-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="rb-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#022c22" />
        </linearGradient>
        <radialGradient id="rb-eye" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#10b981" />
        </radialGradient>
      </defs>

      {/* antenna */}
      <line x1="50" y1="20" x2="50" y2="9" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <circle className={animated ? 'robot-antenna' : ''} cx="50" cy="7" r="4.5" fill="#34d399" />

      {/* ears */}
      <rect x="9" y="42" width="8" height="20" rx="4" fill="#10b981" />
      <rect x="83" y="42" width="8" height="20" rx="4" fill="#10b981" />

      {/* head */}
      <rect x="14" y="20" width="72" height="60" rx="22" fill="url(#rb-head)" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* face screen */}
      <rect x="22" y="30" width="56" height="38" rx="15" fill="url(#rb-face)" />
      <path d="M28 36 Q50 30 72 36" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* eyes */}
      <g transform={`translate(${look.x} ${look.y})`}>
        {thinking ? (
          <>
            <path d="M33 49 Q38 43 43 49" stroke="#6ee7b7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M57 49 Q62 43 67 49" stroke="#6ee7b7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse className={animated ? 'robot-eye' : ''} cx="38" cy="48" rx="5.5" ry="7" fill="url(#rb-eye)" />
            <ellipse className={animated ? 'robot-eye' : ''} cx="62" cy="48" rx="5.5" ry="7" fill="url(#rb-eye)" />
            <circle cx="36.5" cy="45.5" r="1.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="60.5" cy="45.5" r="1.6" fill="#ffffff" fillOpacity="0.9" />
          </>
        )}
      </g>

      {/* smile */}
      <path d="M43 59 Q50 64 57 59" stroke="#34d399" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* cheeks */}
      <circle cx="29" cy="58" r="2.6" fill="#34d399" fillOpacity="0.35" />
      <circle cx="71" cy="58" r="2.6" fill="#34d399" fillOpacity="0.35" />

      {/* waving hand */}
      <g className={animated ? 'robot-hand' : ''}>
        <circle cx="90" cy="84" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <circle cx="90" cy="84" r="2.2" fill="#ecfdf5" />
      </g>

      {/* chin / body hint */}
      <rect x="36" y="82" width="28" height="8" rx="4" fill="#cbd5e1" />
      <circle cx="50" cy="86" r="2" fill="#10b981" />
    </svg>
  );
}
