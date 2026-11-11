import type { CSSProperties, ReactNode } from "react";

type IconProps = { size?: number; sw?: number; style?: CSSProperties; className?: string };

// Same icon language as the other pages (24px grid, round caps/joins, currentColor outline). Agile-page icons only.
const make = (children: ReactNode) =>
  function Icon({ size = 24, sw = 1.8, style, className }: IconProps) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", ...style }}>
        {children}
      </svg>
    );
  };

// Curved loop arrow over a straight arrow (Agile essentials)
export const IcLoopArrow = make(
  <>
    <path d="M4.5 12.5a7.5 7.5 0 1 1 15 0" />
    <path d="M4.5 12.5H3M4.5 12.5l1.8-2.2" />
    <path d="M4 20h16M16.5 16.8 20 20l-3.5 3.2" transform="translate(0 -2)" />
  </>,
);
// Kanban board: frame, header rule and card slots
export const IcKanban = make(
  <>
    <rect x="2.5" y="3.5" width="19" height="17" rx="1.6" />
    <path d="M2.5 8.5h19M9 3.5v17M15.5 3.5v17" />
    <path d="M4.6 11.5h2.3M4.6 14.5h2.3M11.2 11.5h2.3M17.6 11.5h2.3M17.6 14.5h2.3M11.2 14.5h2.3" />
  </>,
);
// Circle with a swirl check (Key Outcomes)
export const IcCheckSwirl = make(
  <>
    <path d="M20.4 12.6A8.6 8.6 0 1 1 15.6 4.3" />
    <path d="M7.6 12.2c1.2.2 2.1 1 2.7 2.4 2-4 4.4-6.6 8.9-8.7" />
    <path d="M17.7 3.4 19.6 5.6 21.9 4" />
  </>,
);
export const IcFlag = make(
  <>
    <path d="M5 21V4" />
    <path d="M5 4h12l-2.2 4L17 12H5" />
  </>,
);
export const IcRefresh = make(
  <>
    <path d="M20 11a8 8 0 0 0-14.5-3.8L3 10" />
    <path d="M3 4v6h6" />
    <path d="M4 13a8 8 0 0 0 14.5 3.8L21 14" />
    <path d="M21 20v-6h-6" />
  </>,
);
