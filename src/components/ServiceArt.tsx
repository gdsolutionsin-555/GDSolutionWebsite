import type { ReactNode } from 'react';

/**
 * Line-art illustrations shown faintly behind each service card.
 * They inherit the card's colour (currentColor), so they follow your brand theme.
 * To use a real photo instead, set `image` on a service in Services.tsx.
 */
function Art({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <svg
      viewBox={wide ? '0 0 360 220' : '0 0 320 220'}
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMax meet"
    >
      {children}
    </svg>
  );
}

const TINT = { fill: 'currentColor', fillOpacity: 0.12 } as const;
const SOLID = { fill: 'currentColor', fillOpacity: 0.55 } as const;

/* 01 Website design: browser window with page layout */
function WebArt() {
  return (
    <Art>
      <rect x="50" y="30" width="220" height="150" rx="12" {...TINT} />
      <line x1="50" y1="56" x2="270" y2="56" />
      {[68, 82, 96].map((x) => (
        <circle key={x} cx={x} cy="43" r="3" fill="currentColor" stroke="none" />
      ))}
      <rect x="68" y="72" width="110" height="14" rx="4" {...SOLID} stroke="none" />
      <rect x="68" y="94" width="84" height="8" rx="4" />
      <rect x="68" y="112" width="52" height="18" rx="9" {...SOLID} stroke="none" />
      <rect x="190" y="72" width="62" height="58" rx="8" {...TINT} />
      <polyline points="198,122 218,98 232,112 242,102 250,122" />
      {[68, 122, 176].map((x) => (
        <rect key={x} x={x} y="142" width="46" height="26" rx="6" {...TINT} />
      ))}
      <path d="M236 150 v26 l7 -7 l6 12 l5 -2 l-6 -12 h10 z" fill="currentColor" stroke="none" />
    </Art>
  );
}

/* 02 Hosting & business email: cloud + envelope */
function HostingArt() {
  return (
    <Art>
      <path d="M88 120 C66 120 62 92 84 88 C84 66 118 58 130 78 C148 66 172 80 164 100 C186 100 186 120 164 120 Z" {...TINT} />
      <circle cx="108" cy="104" r="3" fill="currentColor" stroke="none" />
      <circle cx="124" cy="104" r="3" fill="currentColor" stroke="none" />
      <path d="M140 124 L176 146" strokeDasharray="4 6" />
      <rect x="170" y="130" width="110" height="68" rx="8" {...TINT} />
      <path d="M170 138 L225 172 L280 138" />
      <circle cx="268" cy="124" r="15" {...SOLID} stroke="none" />
      <path d="M261 124 l5 5 l9 -10" stroke="#fff" />
    </Art>
  );
}

/* 03 AI automation & voice bots: chat bubbles with waveform */
function AiArt() {
  const bars = [10, 24, 40, 26, 44, 30, 16, 34, 12];
  return (
    <Art>
      <rect x="56" y="36" width="156" height="76" rx="16" {...TINT} />
      <path d="M88 112 L80 134 L114 112" {...TINT} />
      {bars.map((h, i) => (
        <line key={i} x1={80 + i * 13} y1={74 - h / 2} x2={80 + i * 13} y2={74 + h / 2} strokeWidth={5} />
      ))}
      <rect x="170" y="134" width="104" height="52" rx="14" {...SOLID} stroke="none" />
      {[200, 222, 244].map((x) => (
        <circle key={x} cx={x} cy="160" r="4.5" fill="#fff" stroke="none" />
      ))}
      <path d="M252 34 L256 47 L269 51 L256 55 L252 68 L248 55 L235 51 L248 47 Z" {...SOLID} stroke="none" />
    </Art>
  );
}

/* 04 CCTV: camera with signal and field of view */
function CctvArt() {
  return (
    <Art>
      <rect x="34" y="36" width="14" height="120" rx="5" {...TINT} />
      <path d="M48 96 H92" strokeWidth={6} />
      <rect x="92" y="72" width="116" height="46" rx="14" {...TINT} />
      <path d="M88 66 H200" strokeWidth={5} />
      <circle cx="208" cy="95" r="22" {...TINT} />
      <circle cx="208" cy="95" r="10" {...SOLID} stroke="none" />
      <circle cx="112" cy="86" r="3.5" fill="currentColor" stroke="none" />
      <path d="M232 95 L300 58" strokeDasharray="5 7" />
      <path d="M232 95 L300 134" strokeDasharray="5 7" />
      <path d="M244 72 a36 36 0 0 1 0 46" />
      <path d="M258 60 a54 54 0 0 1 0 70" />
    </Art>
  );
}

/* 05 IT infrastructure: server rack + network nodes */
function InfraArt() {
  return (
    <Art>
      <rect x="64" y="24" width="140" height="176" rx="10" {...TINT} />
      {[38, 84, 130].map((y) => (
        <g key={y}>
          <rect x="76" y={y} width="116" height="38" rx="6" />
          <circle cx="94" cy={y + 19} r="4.5" fill="currentColor" stroke="none" />
          <circle cx="110" cy={y + 19} r="4.5" {...SOLID} stroke="none" />
          <line x1="128" y1={y + 19} x2="178" y2={y + 19} />
        </g>
      ))}
      <path d="M204 58 L252 56" strokeDasharray="4 6" />
      <path d="M204 104 L270 116" strokeDasharray="4 6" />
      <path d="M204 150 L244 172" strokeDasharray="4 6" />
      <circle cx="258" cy="56" r="11" {...TINT} />
      <circle cx="278" cy="118" r="11" {...TINT} />
      <circle cx="250" cy="176" r="11" {...TINT} />
    </Art>
  );
}

/* 06 IT support & AMC: monitor with gear + headset */
function SupportArt() {
  return (
    <Art>
      <rect x="50" y="40" width="150" height="100" rx="10" {...TINT} />
      <path d="M125 140 V164 M95 166 H155" />
      <circle cx="125" cy="90" r="18" />
      <circle cx="125" cy="90" r="7" {...SOLID} stroke="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="125" y1="62" x2="125" y2="68" strokeWidth={4} transform={`rotate(${a} 125 90)`} />
      ))}
      <path d="M226 118 a32 32 0 0 1 64 0" />
      <rect x="219" y="114" width="14" height="30" rx="6" {...SOLID} stroke="none" />
      <rect x="283" y="114" width="14" height="30" rx="6" {...SOLID} stroke="none" />
      <path d="M290 144 q0 22 -30 22" />
      <circle cx="256" cy="166" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="214" cy="52" r="15" {...SOLID} stroke="none" />
      <path d="M207 52 l5 5 l9 -10" stroke="#fff" />
    </Art>
  );
}

/* 07 SEO & digital marketing: growth chart + magnifier */
function SeoArt() {
  return (
    <Art>
      <rect x="56" y="14" width="150" height="20" rx="10" {...TINT} />
      <circle cx="72" cy="24" r="4" />
      <path d="M52 156 H196" />
      {[60, 92, 124, 156].map((x, i) => (
        <rect key={x} x={x} y={150 - [30, 50, 72, 92][i]} width="22" height={[30, 50, 72, 92][i]} rx="4" {...TINT} />
      ))}
      <polyline points="66,116 98,98 130,76 170,52" />
      <path d="M170 52 l-12 2 M170 52 l-2 12" />
      <circle cx="238" cy="108" r="34" {...TINT} />
      <path d="M262 133 L290 161" strokeWidth={8} />
      <polyline points="220,116 232,102 242,110 256,92" />
    </Art>
  );
}

/* 08 Audio-video & unified communication: video call + headset + IP phone */
function CommsArt() {
  const tiles = [
    [52, 42],
    [132, 42],
    [52, 92],
    [132, 92],
  ];
  return (
    <Art wide>
      <rect x="40" y="28" width="180" height="116" rx="12" {...TINT} />
      {tiles.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="76" height="42" rx="6" {...TINT} />
          <circle cx={x + 38} cy={y + 16} r="7" {...SOLID} stroke="none" />
          <path d={`M${x + 24} ${y + 38} q14 -16 28 0`} />
        </g>
      ))}
      <path d="M130 144 V166 M98 168 H162" />
      <path d="M250 98 a46 46 0 0 1 92 0" />
      <rect x="242" y="92" width="18" height="44" rx="8" {...SOLID} stroke="none" />
      <rect x="332" y="92" width="18" height="44" rx="8" {...SOLID} stroke="none" />
      <path d="M341 136 q0 28 -36 28" />
      <circle cx="302" cy="164" r="5" fill="currentColor" stroke="none" />
      <rect x="238" y="176" width="110" height="34" rx="8" {...TINT} />
      {[258, 280, 302, 324].map((x) => (
        <circle key={x} cx={x} cy="193" r="3.5" fill="currentColor" stroke="none" />
      ))}
    </Art>
  );
}

export const SERVICE_ART = {
  web: WebArt,
  hosting: HostingArt,
  ai: AiArt,
  cctv: CctvArt,
  infra: InfraArt,
  support: SupportArt,
  seo: SeoArt,
  comms: CommsArt,
} as const;

export type ServiceArtKey = keyof typeof SERVICE_ART;
