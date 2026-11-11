import type { CSSProperties, ReactNode } from "react";

type IconProps = { size?: number; sw?: number; style?: CSSProperties; className?: string };

// Same icon language as the first page: 24px grid, round caps/joins, currentColor outline.
const make = (children: ReactNode) =>
  function Icon({ size = 24, sw = 1.8, style, className }: IconProps) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flex: "none", ...style }}
      >
        {children}
      </svg>
    );
  };

export const IcScales = make(
  <>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </>,
);
export const IcLayers = make(
  <>
    <path d="m12 2 9 4.5-9 4.5-9-4.5L12 2Z" />
    <path d="m3 11.5 9 4.5 9-4.5" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </>,
);
export const IcDoc = make(
  <>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4M9 13h6M9 17h6M9 9h2" />
  </>,
);
export const IcShieldCheck = make(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
export const IcGavel = make(
  <>
    <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
    <path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8" />
  </>,
);
export const IcScreenPlay = make(
  <>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="m10 8.5 5 2.5-5 2.5v-5ZM8 21h8M12 17v4" />
  </>,
);
export const IcUsers = make(
  <>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
    <path d="M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-5.6" />
  </>,
);
export const IcClipboard = make(
  <>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </>,
);
export const IcFileSign = make(
  <>
    <path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7.5V9" />
    <path d="M14 2v6h6" />
    <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
  </>,
);
export const IcCalendar = make(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </>,
);
export const IcClock = make(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </>,
);
export const IcLaptop = make(
  <>
    <rect x="3" y="4" width="18" height="12" rx="1" />
    <path d="M1 20h22" />
  </>,
);
export const IcAward = make(
  <>
    <circle cx="12" cy="9" r="6" />
    <circle cx="12" cy="9" r="3" />
    <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
  </>,
);
export const IcArrow = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const IcCheck = make(<path d="M20 6 9 17l-5-5" />);
export const IcShield = make(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />);
export const IcHome = make(
  <>
    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-6h6v6" />
  </>,
);
export const IcList = make(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 7h8M8 12h8M8 17h5" />
  </>,
);
export const IcPen = make(
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </>,
);
export const IcBars = make(
  <>
    <path d="M3 3v18h18" />
    <path d="M7 15v3M12 10v8M17 6v12" />
  </>,
);
export const IcSearch = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);
