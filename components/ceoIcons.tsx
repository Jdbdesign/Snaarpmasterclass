import type { CSSProperties, ReactNode } from "react";

type IconProps = { size?: number; sw?: number; style?: CSSProperties; className?: string };

// Same icon language as the other pages (24px grid, round caps/joins, currentColor outline). AI-Powered CEO page only.
const make = (children: ReactNode) =>
  function Icon({ size = 24, sw = 1.8, style, className }: IconProps) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", ...style }}>
        {children}
      </svg>
    );
  };

// Circled checklist (curriculum card 5)
export const IcChecklistCircle = make(
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m7.6 9.4 1 1 1.8-1.9M7.6 14.6l1 1 1.8-1.9M13 9.6h3.6M13 14.8h3.6" />
  </>,
);
// Envelope (Mail app tile)
export const IcMail = make(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </>,
);
// 2x2 app grid (Apps sidebar item)
export const IcGrid = make(
  <>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </>,
);
// Sparkle (assistant avatar)
export const IcSpark = make(
  <>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7L4.5 10.9 10.1 9 12 3.5Z" />
    <path d="M19 3v3M17.5 4.5h3" />
  </>,
);
