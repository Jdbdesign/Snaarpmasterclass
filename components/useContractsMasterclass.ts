"use client";

import { useEffect, useState, type FormEvent } from "react";

type DocFilter = "all" | "signed" | "pending";

type State = {
  view: number;
  auto: boolean;
  first: string;
  last: string;
  email: string;
  phone: string;
  code: string;
  loc: string;
  role: string;
  submitted: boolean;
  error: boolean;
  planDone: boolean[];
  docFilter: DocFilter;
  signed: Record<string, boolean>;
  stage: number;
  bar: number;
  switchOn: boolean[];
};

const INITIAL: State = {
  view: 0,
  auto: true,
  first: "",
  last: "",
  email: "",
  phone: "",
  code: "+44",
  loc: "",
  role: "",
  submitted: false,
  error: false,
  planDone: [true, true, true, false, false],
  docFilter: "all",
  signed: { service: true, lease: true },
  stage: 3,
  bar: 5,
  switchOn: [true, true, false, true],
};

export const VIEW_TITLES = ["Contract Readiness", "Documents", "Signing Flow", "Audit Trail", "Analytics"];
export const SIDE_LABELS = ["Home", "Documents", "Signing", "Security", "Analytics"];

const PLAN = ["Define signature type", "Verify signer identity", "Capture consent", "Apply timestamp and seal", "Store audit trail"];

const DOCS = [
  { id: "emp", name: "Employment Contract", who: "A. Bello", pct: 67, base: "pending", tile: ["#EDE9FE", "#5B21B6"] },
  { id: "nda", name: "Mutual NDA", who: "Kestrel Ltd", pct: 50, base: "pending", tile: ["#DBEAFE", "#1D4ED8"] },
  { id: "service", name: "Service Agreement", who: "Brightline Health", pct: 100, base: "signed", tile: ["#DCFCE7", "#15803D"] },
  { id: "supplier", name: "Supplier Contract", who: "Novagrid Energy", pct: 33, base: "pending", tile: ["#FEF3C7", "#B45309"] },
  { id: "lease", name: "Lease Addendum", who: "Copperleaf Retail", pct: 100, base: "signed", tile: ["#FCE7F3", "#BE185D"] },
  { id: "consult", name: "Consultancy Agreement", who: "Halden Systems", pct: 75, base: "pending", tile: ["#CFFAFE", "#0E7490"] },
];

const STAGES = [
  { name: "Draft", count: 96, pct: 60, docs: [["Mutual NDA – Kestrel Ltd", "v3"], ["Supplier Contract – Novagrid Energy", "v2"], ["Lease Addendum – Marlow Studios", "v1"], ["Employment Contract – T. Okafor", "v4"]] },
  { name: "Sent", count: 74, pct: 46, docs: [["Employment Contract – A. Bello", "2 signers"], ["Consultancy Agreement – Halden Systems", "3 signers"], ["Mutual NDA – Orbit Clinics", "2 signers"], ["Supplier Contract – Westway Fleet", "2 signers"]] },
  { name: "Viewed", count: 58, pct: 36, docs: [["Service Agreement – Harbour Bank", "Opened today"], ["Mutual NDA – Lumen Schools", "Opened 2h ago"], ["Employment Contract – C. Eze", "Opened today"], ["Lease Addendum – Pennine Foods", "Opened 1d ago"]] },
  { name: "Signed", count: 160, pct: 100, docs: [["Service Agreement – Brightline Health", "Signed 09:12"], ["Lease Addendum – Copperleaf Retail", "Signed 08:47"], ["Mutual NDA – Crescent Labs", "Signed yesterday"], ["Employment Contract – D. Larsen", "Signed yesterday"]] },
  { name: "Archived", count: 112, pct: 70, docs: [["Supplier Contract – Silverline Insurance", "Stored 7 yrs"], ["Service Agreement – Northgate Hotels", "Stored 6 yrs"], ["Consultancy Agreement – Alder Finch", "Stored 7 yrs"], ["Employment Contract – M. Reid", "Stored 6 yrs"]] },
];

const MONTHS: [string, number][] = [["Jan", 12], ["Feb", 15], ["Mar", 19], ["Apr", 24], ["May", 28], ["Jun", 34]];

const TRAIL = [
  { title: "Identity verification", sub: "ID check and selfie match", lift: 25 },
  { title: "Consent capture", sub: "Explicit intent to sign", lift: 20 },
  { title: "Trusted timestamp", sub: "Independent time authority", lift: 15 },
  { title: "Tamper-proof seal", sub: "Any later edit is flagged", lift: 20 },
];

const SIGNED_BASE = 21;

export function useContractsMasterclass() {
  const [s, setS] = useState<State>(INITIAL);
  const patch = (p: Partial<State>) => setS((prev) => ({ ...prev, ...p }));

  // Auto tour: next view every 5.5 s until the visitor interacts with the mockup.
  useEffect(() => {
    const timer = setInterval(() => {
      setS((prev) => (prev.auto ? { ...prev, view: (prev.view + 1) % 5 } : prev));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Native <select> boxes keep the text position from their first layout; re-layout once the font is in
  // (same fix as the first page).
  useEffect(() => {
    let alive = true;
    const relayout = () => {
      if (!alive) return;
      document.querySelectorAll("select").forEach((el) => {
        const prev = el.style.display;
        el.style.display = "none";
        void el.offsetHeight;
        el.style.display = prev;
      });
    };
    Promise.all([400, 500, 600, 700, 800].map((w) => document.fonts.load(`${w} 15px "Plus Jakarta Sans"`)))
      .then(relayout)
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const stop = () => setS((prev) => (prev.auto ? { ...prev, auto: false } : prev));
  const pickView = (i: number) => patch({ view: i, auto: false });

  const planCount = s.planDone.filter(Boolean).length;
  const firstOpen = s.planDone.indexOf(false);
  const planSteps = PLAN.map((label, i) => {
    const done = s.planDone[i];
    const active = !done && i === firstOpen;
    return {
      n: done ? "✓" : String(i + 1),
      label,
      status: done ? "Done" : active ? "In progress" : "Next",
      dotStyle:
        "width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: 800; flex: none; " +
        (done ? "background: #6D28D9; color: #FFFFFF" : active ? "background: #FFFFFF; color: #6D28D9; border: 2px solid #6D28D9" : "background: #F1EEF8; color: #6B6585"),
      tagStyle:
        "font-size: 10px; font-weight: 700; padding: 3px 7px; border-radius: 999px; " +
        (done ? "background: #ECFDF3; color: #05603A" : active ? "background: #F5F3FF; color: #5B21B6" : "background: #F4F2FA; color: #6B6585"),
      pick: () => setS((prev) => ({ ...prev, planDone: prev.planDone.map((d, k) => (k === i ? !d : d)), auto: false })),
    };
  });

  const docs = DOCS.filter((d) => s.docFilter === "all" || d.base === s.docFilter).map((d) => {
    const isSigned = !!s.signed[d.id];
    return {
      ...d,
      ini: d.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2),
      color: d.pct === 100 ? "#6D28D9" : "#A78BFA",
      btnCls: "qbtn" + (isSigned ? " is-done" : ""),
      btnLabel: isSigned ? "✓ Signed" : "Send reminder",
      toggle: () => setS((prev) => ({ ...prev, signed: { ...prev.signed, [d.id]: !prev.signed[d.id] }, auto: false })),
    };
  });
  const chip = (f: DocFilter) => ({
    cls: "chip" + (s.docFilter === f ? " is-active" : ""),
    pick: () => patch({ docFilter: f, auto: false }),
  });

  const stages = STAGES.map((st, i) => ({
    ...st,
    cls: "stage" + (s.stage === i ? " is-active" : ""),
    color: s.stage === i ? "#6D28D9" : "#C4B5FD",
    pick: () => patch({ stage: i, auto: false }),
  }));

  const strength = 20 + TRAIL.reduce((a, t, i) => a + (s.switchOn[i] ? t.lift : 0), 0);
  const trail = TRAIL.map((t, i) => ({
    ...t,
    n: "0" + (i + 1),
    on: (s.switchOn[i] ? "true" : "false") as "true" | "false",
    aria: (s.switchOn[i] ? "Turn off " : "Turn on ") + t.title,
    cls: "switch" + (s.switchOn[i] ? " is-on" : ""),
    toggle: () => setS((prev) => ({ ...prev, switchOn: prev.switchOn.map((o, k) => (k === i ? !o : o)), auto: false })),
  }));

  const maxMonth = Math.max(...MONTHS.map((m) => m[1]));
  const bars = MONTHS.map((m, i) => ({
    m: m[0],
    h: Math.round((m[1] / maxMonth) * 100),
    cls: "bar" + (s.bar === i ? " is-active" : ""),
    hover: () => setS((prev) => (prev.bar === i ? prev : { ...prev, bar: i })),
  }));

  const set = (k: keyof State) => (e: { target: EventTarget | { value: string } }) =>
    patch({ [k]: (e.target as { value: string }).value, error: false } as Partial<State>);

  return {
    view: s.view,
    viewTitle: VIEW_TITLES[s.view],
    sideCls: (i: number) => "side" + (s.view === i ? " is-active" : ""),
    pickView,
    stop,
    // 0 · Home
    planSteps,
    planPct: Math.round((planCount / 5) * 100),
    // 1 · Documents
    docs,
    signedCount: SIGNED_BASE + Object.values(s.signed).filter(Boolean).length,
    chips: { all: chip("all"), signed: chip("signed"), pending: chip("pending") },
    // 2 · Signing flow
    stages,
    stageName: STAGES[s.stage].name,
    stageDocs: STAGES[s.stage].docs.map((d) => ({ name: d[0], meta: d[1] })),
    // 3 · Audit trail
    trail,
    strength,
    disputesAvoided: Math.round(strength * 0.12),
    activeSafeguards: s.switchOn.filter(Boolean).length,
    // 4 · Analytics
    bars,
    barLabel: MONTHS[s.bar][0] + " · " + MONTHS[s.bar][1] + " signed",
    certName: (s.first + " " + s.last).trim() || "Your Name",
    // form
    onFirst: set("first"),
    onLast: set("last"),
    onEmail: set("email"),
    onPhone: set("phone"),
    onCode: set("code"),
    onLoc: set("loc"),
    onRole: set("role"),
    submitted: s.submitted,
    showError: s.error,
    firstName: s.first || "there",
    submit: (e: FormEvent) => {
      if (e && e.preventDefault) e.preventDefault();
      const ok = s.first.trim() && s.last.trim() && /.+@.+\..+/.test(s.email) && s.phone.trim() && s.loc.trim() && s.role;
      if (ok) patch({ submitted: true, error: false });
      else patch({ error: true });
    },
    resetForm: () => patch({ submitted: false, first: "", last: "", email: "", phone: "", loc: "", role: "", code: "+44" }),
  };
}
