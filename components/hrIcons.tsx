import type { CSSProperties, ReactNode } from "react";

type IconProps = { size?: number; sw?: number; style?: CSSProperties; className?: string };

// Same icon language as the other pages (24px grid, round caps/joins, currentColor outline). HR-page icons only.
const make = (children: ReactNode) =>
  function Icon({ size = 24, sw = 1.8, style, className }: IconProps) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", ...style }}>
        {children}
      </svg>
    );
  };

export const IcGroup = make(
  <>
    <circle cx="12" cy="7" r="3.2" />
    <path d="M6.5 20c0-3.6 2.4-5.8 5.5-5.8s5.5 2.2 5.5 5.8" />
    <circle cx="4.6" cy="9.6" r="2.3" />
    <path d="M1.6 18.4c0-2.4 1.2-3.9 3-4.3" />
    <circle cx="19.4" cy="9.6" r="2.3" />
    <path d="M22.4 18.4c0-2.4-1.2-3.9-3-4.3" />
  </>,
);
export const IcTarget = make(
  <>
    <circle cx="11" cy="13" r="8.5" />
    <circle cx="11" cy="13" r="5" />
    <circle cx="11" cy="13" r="1.5" />
    <path d="m11 13 8.5-8.5M17 2.5v3.5h3.5" />
  </>,
);
export const IcGear = make(
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
export const IcLaptopAI = make(
  <>
    <rect x="3" y="4" width="18" height="12" rx="1" />
    <path d="M1 20h22" />
    <path d="m9.2 13 1.8-4.6 1.8 4.6M9.9 11.6h2.2M14.6 8.4V13" />
  </>,
);
export const IcChipAI = make(
  <>
    <rect x="5.5" y="5.5" width="13" height="13" rx="2" />
    <path d="M9 2v3.5M15 2v3.5M9 18.5V22M15 18.5V22M2 9h3.5M2 15h3.5M18.5 9H22M18.5 15H22" />
    <path d="m8.8 15 1.7-5 1.7 5M9.4 13.4h2.2M14.4 10v5" />
  </>,
);
export const IcCap = make(
  <>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12.2v4.6c0 1.4 2.7 2.7 6 2.7s6-1.3 6-2.7v-4.6M22 10v6" />
  </>,
);
export const IcTools = make(
  <>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z" />
    <path d="m3 3 5 5M2.5 5.5 5.5 2.5" />
  </>,
);
export const IcBarChart = make(
  <>
    <rect x="3" y="12" width="4.5" height="9" rx=".6" />
    <rect x="9.75" y="7" width="4.5" height="14" rx=".6" />
    <rect x="16.5" y="2.5" width="4.5" height="18.5" rx=".6" />
  </>,
);
export const IcTag = make(
  <>
    <path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.6" cy="7.6" r="1.2" />
  </>,
);

// Large outline illustration for the "Why This Training Matters" column: a group of people with a gear.
export function PeopleGearArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 108" width="120" height="108" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="44" cy="14" r="8.5" />
      <circle cx="82" cy="19" r="7.5" />
      <path d="M72.5 36.5c2-3.4 5.6-5.2 9.5-5.2 6 0 10.6 4.1 11.4 10.7" />
      <circle cx="16" cy="40" r="6.5" />
      <path d="M3 70c0-9.5 5.2-14.8 13-14.8 3.4 0 6.2 1 8.4 2.8" />
      <path d="M28 70c0-14.5 6.8-22.5 16-22.5 8.2 0 13.4 5.2 15 13.5" />
      <path d="M3 70h25" />
      <g transform="translate(70 62) scale(1.55)">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
