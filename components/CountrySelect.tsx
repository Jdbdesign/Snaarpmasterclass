"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Country = { name: string; iso: string; dial: string };

const COUNTRIES: Country[] = [
  { name: "United Kingdom", iso: "gb", dial: "+44" },
  { name: "Nigeria", iso: "ng", dial: "+234" },
  { name: "United States", iso: "us", dial: "+1" },
  { name: "Ireland", iso: "ie", dial: "+353" },
  { name: "South Africa", iso: "za", dial: "+27" },
  { name: "Canada", iso: "ca", dial: "+1" },
  { name: "Ghana", iso: "gh", dial: "+233" },
  { name: "Kenya", iso: "ke", dial: "+254" },
  { name: "Uganda", iso: "ug", dial: "+256" },
  { name: "Tanzania", iso: "tz", dial: "+255" },
  { name: "Rwanda", iso: "rw", dial: "+250" },
  { name: "Ethiopia", iso: "et", dial: "+251" },
  { name: "Egypt", iso: "eg", dial: "+20" },
  { name: "Morocco", iso: "ma", dial: "+212" },
  { name: "Senegal", iso: "sn", dial: "+221" },
  { name: "Cameroon", iso: "cm", dial: "+237" },
  { name: "Zambia", iso: "zm", dial: "+260" },
  { name: "Zimbabwe", iso: "zw", dial: "+263" },
  { name: "Botswana", iso: "bw", dial: "+267" },
  { name: "India", iso: "in", dial: "+91" },
  { name: "Pakistan", iso: "pk", dial: "+92" },
  { name: "Bangladesh", iso: "bd", dial: "+880" },
  { name: "United Arab Emirates", iso: "ae", dial: "+971" },
  { name: "Saudi Arabia", iso: "sa", dial: "+966" },
  { name: "Qatar", iso: "qa", dial: "+974" },
  { name: "Israel", iso: "il", dial: "+972" },
  { name: "Türkiye", iso: "tr", dial: "+90" },
  { name: "Germany", iso: "de", dial: "+49" },
  { name: "France", iso: "fr", dial: "+33" },
  { name: "Spain", iso: "es", dial: "+34" },
  { name: "Italy", iso: "it", dial: "+39" },
  { name: "Netherlands", iso: "nl", dial: "+31" },
  { name: "Belgium", iso: "be", dial: "+32" },
  { name: "Portugal", iso: "pt", dial: "+351" },
  { name: "Switzerland", iso: "ch", dial: "+41" },
  { name: "Sweden", iso: "se", dial: "+46" },
  { name: "Norway", iso: "no", dial: "+47" },
  { name: "Denmark", iso: "dk", dial: "+45" },
  { name: "Poland", iso: "pl", dial: "+48" },
  { name: "Australia", iso: "au", dial: "+61" },
  { name: "New Zealand", iso: "nz", dial: "+64" },
  { name: "Singapore", iso: "sg", dial: "+65" },
  { name: "Malaysia", iso: "my", dial: "+60" },
  { name: "Philippines", iso: "ph", dial: "+63" },
  { name: "Indonesia", iso: "id", dial: "+62" },
  { name: "China", iso: "cn", dial: "+86" },
  { name: "Japan", iso: "jp", dial: "+81" },
  { name: "South Korea", iso: "kr", dial: "+82" },
  { name: "Brazil", iso: "br", dial: "+55" },
  { name: "Mexico", iso: "mx", dial: "+52" },
  { name: "Argentina", iso: "ar", dial: "+54" },
  { name: "Colombia", iso: "co", dial: "+57" },
  { name: "Jamaica", iso: "jm", dial: "+1876" },
  { name: "Trinidad and Tobago", iso: "tt", dial: "+1868" },
];

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function CountrySelect({ onChange }: { onChange: (e: { target: { value: string } }) => void }) {
  const [iso, setIso] = useState("gb");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const current = COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    search.current?.focus();
    return () => document.removeEventListener("mousedown", away);
  }, [open]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(s) || c.dial.includes(s)) : COUNTRIES;
  }, [q]);

  const pick = (c: Country) => {
    setIso(c.iso);
    setOpen(false);
    setQ("");
    onChange({ target: { value: c.dial } });
  };

  return (
    <div ref={box} style={{ position: "relative", flex: "none", width: 112 }} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        className="inp"
        aria-label="Country code"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", cursor: "pointer", textAlign: "left" }}
      >
        <span className={`fi fi-${current.iso}`} style={{ width: 22, height: 16, flex: "none", borderRadius: 3, backgroundSize: "cover" }} />
        <span style={{ flex: 1 }}>{current.dial}</span>
        <Chevron />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 54,
            left: 0,
            zIndex: 30,
            width: 290,
            background: "#FFFFFF",
            border: "1px solid #DCD7EA",
            borderRadius: 12,
            boxShadow: "0 24px 48px -20px rgba(26,20,51,.45)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid #F1EEF8" }}>
            <input
              ref={search}
              className="inp"
              style={{ height: 38, fontSize: 14 }}
              placeholder="Search country"
              aria-label="Search country"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <ul role="listbox" aria-label="Countries" style={{ listStyle: "none", margin: 0, padding: 4, maxHeight: 250, overflowY: "auto" }}>
            {list.map((c) => (
              <li
                key={c.iso}
                role="option"
                aria-selected={c.iso === iso}
                tabIndex={0}
                onClick={() => pick(c)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(c))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  background: c.iso === iso ? "#F5F3FF" : undefined,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF8FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = c.iso === iso ? "#F5F3FF" : "")}
              >
                <span className={`fi fi-${c.iso}`} style={{ width: 22, height: 16, flex: "none", borderRadius: 3, backgroundSize: "cover" }} />
                <span style={{ flex: 1 }}>{c.name}</span>
                <span style={{ color: "#6B6585", fontWeight: 600 }}>{c.dial}</span>
              </li>
            ))}
            {list.length === 0 && <li style={{ padding: "10px", fontSize: 14, color: "#6B6585" }}>No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
