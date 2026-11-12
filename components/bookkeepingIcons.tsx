import type { CSSProperties, ReactNode } from "react";

type IconProps = { size?: number; sw?: number; style?: CSSProperties; className?: string };

// Same icon language as the other pages (24px grid, round caps/joins, currentColor outline). Beyond Bookkeeping page only.
const make = (children: ReactNode) =>
  function Icon({ size = 24, sw = 1.8, style, className }: IconProps) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", ...style }}>
        {children}
      </svg>
    );
  };

export const IcBrainCircuit = make(
  <>
    <path d="M12 4.5v15" />
    <path d="M12 5.5A3 3 0 0 0 6.7 4 3.3 3.3 0 0 0 4.2 8.2 3.4 3.4 0 0 0 4.6 13.6 3.2 3.2 0 0 0 7 18.6 3 3 0 0 0 12 19.5" />
    <path d="M12 5.5A3 3 0 0 1 17.3 4a3.3 3.3 0 0 1 2.5 4.2 3.4 3.4 0 0 1-.4 5.4 3.2 3.2 0 0 1-2.4 5 3 3 0 0 1-5 .9" />
    <path d="M12 9H9.5L8 7.5M12 13H9.2L8 14.4M12 11h3l1.3-1.3M12 15.2h2.6l1.4 1.3" />
    <circle cx="7.4" cy="7" r=".9" />
    <circle cx="7.4" cy="15" r=".9" />
    <circle cx="16.9" cy="9.2" r=".9" />
    <circle cx="16.9" cy="17" r=".9" />
  </>,
);
export const IcCoins = make(
  <>
    <ellipse cx="9" cy="5.5" rx="6" ry="2.5" />
    <path d="M3 5.5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    <path d="M3 9.5v4c0 1.4 2.7 2.5 6 2.5 1 0 1.9-.1 2.8-.3" />
    <path d="M3 13.5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-1.5" />
    <ellipse cx="16" cy="11.5" rx="5.2" ry="2.2" />
    <path d="M10.8 11.5v4c0 1.2 2.3 2.2 5.2 2.2s5.2-1 5.2-2.2v-4" />
    <path d="M10.8 15.5v4c0 1.2 2.3 2.2 5.2 2.2s5.2-1 5.2-2.2v-4" />
  </>,
);
export const IcDocCalc = make(
  <>
    <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H11" />
    <path d="M14 3l5 5v3" />
    <path d="M14 3v5h5" />
    <path d="M8 11h5M8 14h3" />
    <rect x="12" y="13" width="9" height="8.5" rx="1.2" />
    <path d="M14 15.5h5M14.5 18h.01M16.5 18h.01M18.5 18h.01M14.5 20h.01M16.5 20h.01M18.5 20h.01" />
  </>,
);
export const IcDbStack = make(
  <>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
    <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13" />
    <path d="M5 10c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8M5 14.3c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
  </>,
);
export const IcNetwork = make(
  <>
    <circle cx="12" cy="7" r="3" />
    <path d="M6.8 14.8c.8-1.2 2.9-1.9 5.2-1.9s4.4.7 5.2 1.9" />
    <circle cx="4.6" cy="18.2" r="2" />
    <circle cx="19.4" cy="18.2" r="2" />
    <circle cx="12" cy="20.4" r="1.6" />
    <path d="M6 16.6 8.8 14.4M18 16.6l-2.8-2.2M12 15.6v3.2" />
  </>,
);
export const IcCloud = make(<path d="M7 19a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.8 8.6 5 5 0 0 1 17.5 19Z" />);
