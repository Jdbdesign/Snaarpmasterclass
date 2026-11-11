"use client";

import { useEffect, useState } from "react";

// Countdown target for the HR and Agile pages: Sat, 21 Nov 2026, 3:00 PM GMT - change here.
const TARGET = Date.parse("2026-11-21T15:00:00Z");

const pad = (n: number) => String(n).padStart(2, "0");

function parts(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "Days", value: pad(Math.floor(t / 86400)) },
    { label: "Hours", value: pad(Math.floor((t % 86400) / 3600)) },
    { label: "Minutes", value: pad(Math.floor((t % 3600) / 60)) },
    { label: "Seconds", value: pad(t % 60) },
  ];
}

export default function EventCountdown() {
  // null until mounted, so server and browser render the same first frame
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(TARGET - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = parts(left ?? 0);

  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: "#C4B5FD" }}>
        MASTERCLASS STARTS IN
      </span>
      <div role="timer" aria-label="Time until the masterclass starts" style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 480 }}>
        {items.map((it, i) => (
          <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 0", minWidth: 0 }}>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 0 10px",
                borderRadius: 16,
                textAlign: "center",
                border: "1px solid rgba(196,181,253,.35)",
                background: "linear-gradient(180deg, rgba(167,139,250,.18), rgba(167,139,250,.05))",
                boxShadow: "0 12px 30px -16px rgba(124,58,237,.8), inset 0 1px 0 rgba(255,255,255,.12)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                {it.value}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4B5FD" }}>
                {it.label}
              </div>
            </div>
            {i < 3 && <span aria-hidden="true" style={{ fontSize: 26, fontWeight: 700, color: "rgba(196,181,253,.55)", marginTop: -14 }}>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
