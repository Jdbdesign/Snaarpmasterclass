// Inline-SVG fallbacks for the two photos in the design (hero: gavel + scales of justice, closing band: classical
// building). When public/contracts/hero-bg.jpg or cta-bg.jpg exists, the page uses the photo instead (see page.tsx).

const BOOKS: [number, number, number, string][] = [
  // x, height, width, colour
  [318, 190, 26, "#2a1d3c"], [346, 230, 22, "#3a2630"], [370, 170, 28, "#1c1838"], [400, 215, 24, "#44302a"],
  [426, 185, 30, "#231b40"], [458, 240, 22, "#3c2a2c"], [482, 200, 26, "#2c2048"], [510, 175, 24, "#4a3428"],
  [536, 225, 28, "#201a3a"], [566, 195, 26, "#3a2a32"], [594, 235, 30, "#2a1f44"],
];

export function HeroArt() {
  return (
    <svg viewBox="0 0 640 460" width="640" height="460" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dcGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8E3A3" />
          <stop offset=".45" stopColor="#D9A441" />
          <stop offset="1" stopColor="#8E5F1B" />
        </linearGradient>
        <linearGradient id="dcGoldV" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8E5F1B" />
          <stop offset=".5" stopColor="#F4D98F" />
          <stop offset="1" stopColor="#9A6A1E" />
        </linearGradient>
        <linearGradient id="dcWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B2F24" />
          <stop offset=".55" stopColor="#3A1B16" />
          <stop offset="1" stopColor="#1F0E0B" />
        </linearGradient>
        <linearGradient id="dcDesk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E4128" stopOpacity=".9" />
          <stop offset="1" stopColor="#1A0E10" />
        </linearGradient>
        <radialGradient id="dcGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFD08A" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFD08A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dcBlue" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#8EA2FF" stopOpacity=".35" />
          <stop offset="1" stopColor="#8EA2FF" stopOpacity="0" />
        </radialGradient>
        <filter id="dcBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id="dcSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* shelves of law books, slightly out of focus */}
      <g filter="url(#dcBlur)" opacity=".9">
        <rect x="300" y="40" width="340" height="300" fill="#0C0F33" opacity=".55" />
        {BOOKS.map(([x, h, w, c], i) => (
          <g key={i}>
            <rect x={x} y={330 - h} width={w} height={h} rx="2" fill={c} />
            <rect x={x} y={330 - h + 18} width={w} height="3" fill="#C99A4B" opacity=".7" />
            <rect x={x} y={330 - h + 26} width={w} height="2" fill="#C99A4B" opacity=".45" />
          </g>
        ))}
        <rect x="300" y="326" width="340" height="8" fill="#120C22" />
      </g>

      {/* warm bokeh */}
      <circle cx="470" cy="70" r="46" fill="url(#dcGlow)" />
      <circle cx="570" cy="36" r="30" fill="url(#dcGlow)" />
      <circle cx="372" cy="46" r="22" fill="url(#dcGlow)" />
      <circle cx="120" cy="70" r="80" fill="url(#dcBlue)" />

      {/* stack of books under the scales */}
      <g>
        <rect x="150" y="372" width="230" height="22" rx="3" fill="#251A38" />
        <rect x="150" y="372" width="230" height="4" fill="#C99A4B" opacity=".6" />
        <rect x="165" y="350" width="200" height="22" rx="3" fill="#33211F" />
        <rect x="165" y="350" width="200" height="4" fill="#C99A4B" opacity=".5" />
      </g>

      {/* scales of justice */}
      <g>
        <ellipse cx="215" cy="346" rx="58" ry="9" fill="url(#dcGold)" />
        <rect x="190" y="334" width="50" height="14" rx="5" fill="url(#dcGold)" />
        <rect x="209" y="112" width="12" height="226" rx="4" fill="url(#dcGoldV)" />
        <circle cx="215" cy="104" r="11" fill="url(#dcGold)" />
        <path d="M82 136 Q215 112 348 140 L348 148 Q215 124 82 144 Z" fill="url(#dcGold)" />
        {/* left pan (higher) */}
        <path d="M86 142 L40 246 M86 142 L132 246" stroke="#D9A441" strokeWidth="2" />
        <path d="M34 246 H138 Q132 282 86 286 Q40 282 34 246 Z" fill="url(#dcGold)" />
        <path d="M34 246 H138" stroke="#F8E3A3" strokeWidth="2" />
        {/* right pan (lower) */}
        <path d="M344 148 L298 262 M344 148 L390 262" stroke="#D9A441" strokeWidth="2" />
        <path d="M292 262 H396 Q390 298 344 302 Q298 298 292 262 Z" fill="url(#dcGold)" />
        <path d="M292 262 H396" stroke="#F8E3A3" strokeWidth="2" />
      </g>

      {/* desk */}
      <rect x="0" y="414" width="640" height="46" fill="url(#dcDesk)" />
      <ellipse cx="330" cy="418" rx="260" ry="10" fill="#E9A862" opacity=".18" filter="url(#dcSoft)" />

      {/* gavel and sound block */}
      <ellipse cx="340" cy="438" rx="150" ry="22" fill="#1E0F0C" />
      <ellipse cx="340" cy="428" rx="150" ry="22" fill="url(#dcWood)" />
      <ellipse cx="340" cy="420" rx="118" ry="14" fill="#5A3022" opacity=".8" />
      <g transform="rotate(-24 250 360)">
        <rect x="150" y="318" width="190" height="84" rx="20" fill="url(#dcWood)" />
        <rect x="214" y="318" width="22" height="84" fill="url(#dcGold)" />
        <rect x="254" y="318" width="12" height="84" fill="url(#dcGold)" />
        <rect x="156" y="326" width="170" height="8" rx="4" fill="#8A5240" opacity=".5" />
        <rect x="330" y="350" width="290" height="20" rx="10" fill="url(#dcWood)" />
        <rect x="330" y="353" width="290" height="4" rx="2" fill="#8A5240" opacity=".5" />
      </g>
    </svg>
  );
}

export function BuildingArt() {
  const cols = [38, 60, 82, 104, 126, 148];
  return (
    <svg viewBox="0 0 240 150" width="240" height="150" preserveAspectRatio="xMinYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C5BD6" />
          <stop offset="1" stopColor="#B9A4EE" />
        </linearGradient>
        <linearGradient id="dcStone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B7AFD3" />
          <stop offset=".5" stopColor="#E7E2F6" />
          <stop offset="1" stopColor="#A59CC6" />
        </linearGradient>
        <linearGradient id="dcStoneD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9D3EE" />
          <stop offset="1" stopColor="#9F95C4" />
        </linearGradient>
      </defs>
      <rect width="240" height="150" fill="url(#dcSky)" />
      {/* bare trees */}
      <g stroke="#3E2A86" strokeWidth="1.4" fill="none" opacity=".55">
        <path d="M14 150 V96 M14 118 l-10 -14 M14 108 l11 -16 M14 98 l-6 -12" />
        <path d="M230 150 V104 M230 124 l9 -12 M230 114 l-10 -14" />
      </g>
      {/* wings */}
      <rect x="6" y="84" width="186" height="52" fill="url(#dcStoneD)" />
      <g fill="#6A5CA8" opacity=".75">
        {[14, 34, 54, 154, 174].map((x) => (
          <g key={x}>
            <rect x={x} y="94" width="9" height="14" rx="1.5" />
            <rect x={x} y="116" width="9" height="12" rx="1.5" />
          </g>
        ))}
      </g>
      <rect x="6" y="80" width="186" height="5" fill="#EFEBFA" />
      {/* portico */}
      <path d="M26 56 L99 24 L172 56 Z" fill="url(#dcStone)" />
      <path d="M36 54 L99 29 L162 54" stroke="#8D83B5" strokeWidth="1.5" fill="none" />
      <rect x="28" y="56" width="142" height="10" fill="#EFEBFA" />
      {cols.map((x) => (
        <g key={x}>
          <rect x={x} y="66" width="10" height="60" fill="url(#dcStone)" />
          <rect x={x - 2} y="64" width="14" height="4" fill="#F4F1FC" />
          <rect x={x - 2} y="124" width="14" height="4" fill="#F4F1FC" />
        </g>
      ))}
      <rect x="40" y="70" width="118" height="56" fill="#5B4D9A" opacity=".35" />
      {/* steps */}
      <rect x="22" y="128" width="154" height="5" fill="#E1DBF3" />
      <rect x="16" y="133" width="166" height="5" fill="#CFC7E8" />
      <rect x="10" y="138" width="178" height="12" fill="#B9B0DA" />
    </svg>
  );
}
