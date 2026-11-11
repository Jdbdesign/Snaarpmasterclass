"use client";

import { useEffect, useState, type FormEvent } from "react";

type Filter = "all" | "on" | "review";

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
  filter: Filter;
  reviewed: Record<string, boolean>;
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
  filter: "all",
  reviewed: {},
  stage: 3,
  bar: 5,
  switchOn: [true, true, false, true],
};

export const VIEW_TITLES = ["People Overview", "Team", "Performance Reviews", "Digital HR Workflows", "Analytics"];
export const SIDE_LABELS = ["Home", "People", "Performance", "Workflows", "Analytics"];

const PLAN = ["Define HR strategy", "Set team goals", "Digitalise HR processes", "Introduce AI tools", "Review compliance"];

const TEAM = [
  { id: "amara", name: "Amara Okoye", role: "Sales Lead", score: 92, tile: ["#EDE9FE", "#5B21B6"] },
  { id: "daniel", name: "Daniel Ward", role: "Support Manager", score: 88, tile: ["#DBEAFE", "#1D4ED8"] },
  { id: "ife", name: "Ife Adeyemi", role: "Product Designer", score: 81, tile: ["#DCFCE7", "#15803D"] },
  { id: "sara", name: "Sara Malik", role: "Finance Analyst", score: 74, tile: ["#FEF3C7", "#B45309"] },
  { id: "tolu", name: "Tolu Bakare", role: "Operations Officer", score: 67, tile: ["#FCE7F3", "#BE185D"] },
  { id: "james", name: "James Reid", role: "Marketing Executive", score: 60, tile: ["#CFFAFE", "#0E7490"] },
];

const STAGES = [
  { name: "Goals set", count: 24, docs: [["Amara Okoye", "Q3 goals agreed"], ["Priya Nair", "4 goals set"], ["Marcus Bell", "3 goals set"], ["Chloe Adams", "5 goals set"]] },
  { name: "In progress", count: 38, docs: [["Daniel Ward", "Mid-year check-in"], ["Ife Adeyemi", "62% of goals"], ["Tolu Bakare", "48% of goals"], ["Leila Hassan", "71% of goals"]] },
  { name: "Self-review", count: 17, docs: [["Sara Malik", "Due in 2 days"], ["Ben Foster", "Submitted today"], ["Zainab Musa", "Due in 4 days"], ["Owen Clarke", "Submitted 1d ago"]] },
  { name: "Manager review", count: 12, docs: [["James Reid", "Review booked Thu"], ["Hannah Cole", "Awaiting feedback"], ["Femi Lawal", "Review booked Fri"], ["Nora Webb", "Awaiting feedback"]] },
  { name: "Completed", count: 46, docs: [["Amara Okoye", "Rated: Exceeds"], ["Daniel Ward", "Rated: Meets"], ["Kofi Mensah", "Rated: Exceeds"], ["Rachel Quinn", "Rated: Meets"]] },
];

const MONTHS: [string, number][] = [["Jan", 62], ["Feb", 66], ["Mar", 65], ["Apr", 72], ["May", 78], ["Jun", 85]];

const FLOWS = [
  { title: "Automated onboarding", sub: "New-hire tasks run themselves", lift: 9 },
  { title: "Leave approvals", sub: "One-click manager sign-off", lift: 6 },
  { title: "Attendance tracking", sub: "Clock-ins synced in real time", lift: 5 },
  { title: "AI-assisted screening", sub: "CVs ranked against the role", lift: 8 },
];

const REVIEWS_BASE = 12;
const HOURS_BASE = 4;
const HOURS_MAX = 32;

export function useHrMasterclass() {
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
  // (same fix as the other pages).
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

  // 0 · Home
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

  // 1 · Team
  const team = TEAM.filter((p) => s.filter === "all" || (s.filter === "on" ? p.score >= 80 : p.score < 80)).map((p) => {
    const isDone = !!s.reviewed[p.id];
    return {
      ...p,
      ini: p.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2),
      color: p.score >= 80 ? "#6D28D9" : "#A78BFA",
      btnCls: "qbtn" + (isDone ? " is-done" : ""),
      btnLabel: isDone ? "✓ Reviewed" : "Start review",
      toggle: () => setS((prev) => ({ ...prev, reviewed: { ...prev.reviewed, [p.id]: !prev.reviewed[p.id] }, auto: false })),
    };
  });
  const chip = (f: Filter) => ({
    cls: "chip" + (s.filter === f ? " is-active" : ""),
    pick: () => patch({ filter: f, auto: false }),
  });

  // 2 · Performance reviews
  const maxStage = Math.max(...STAGES.map((st) => st.count));
  const stages = STAGES.map((st, i) => ({
    ...st,
    pct: Math.round((st.count / maxStage) * 100),
    cls: "stage" + (s.stage === i ? " is-active" : ""),
    color: s.stage === i ? "#6D28D9" : "#C4B5FD",
    pick: () => patch({ stage: i, auto: false }),
  }));

  // 3 · Digital HR workflows
  const hours = HOURS_BASE + FLOWS.reduce((a, f, i) => a + (s.switchOn[i] ? f.lift : 0), 0);
  const flows = FLOWS.map((f, i) => ({
    ...f,
    n: "0" + (i + 1),
    on: (s.switchOn[i] ? "true" : "false") as "true" | "false",
    aria: (s.switchOn[i] ? "Turn off " : "Turn on ") + f.title,
    cls: "switch" + (s.switchOn[i] ? " is-on" : ""),
    toggle: () => setS((prev) => ({ ...prev, switchOn: prev.switchOn.map((o, k) => (k === i ? !o : o)), auto: false })),
  }));

  // 4 · Analytics
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
    planSteps,
    planPct: Math.round((planCount / 5) * 100),
    team,
    reviewsDone: REVIEWS_BASE + Object.values(s.reviewed).filter(Boolean).length,
    chips: { all: chip("all"), on: chip("on"), review: chip("review") },
    stages,
    stageName: STAGES[s.stage].name,
    stageDocs: STAGES[s.stage].docs.map((d) => ({ name: d[0], meta: d[1] })),
    flows,
    hours,
    hoursPct: Math.min(100, Math.round((hours / HOURS_MAX) * 100)),
    tasksAutomated: Math.round(hours * 2.4),
    activeFlows: s.switchOn.filter(Boolean).length,
    bars,
    barLabel: MONTHS[s.bar][0] + " · " + MONTHS[s.bar][1] + " score",
    certName: (s.first + " " + s.last).trim() || "Your Name",
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
