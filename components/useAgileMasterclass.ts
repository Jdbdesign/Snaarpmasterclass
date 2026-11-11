"use client";

import { useEffect, useState, type FormEvent } from "react";

type Filter = "all" | "high" | "rest";
type Col = 0 | 1 | 2 | 3;

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
  cols: Record<string, Col>;
  planDone: boolean[];
  filter: Filter;
  inSprint: Record<string, boolean>;
  bar: number;
  switchOn: boolean[];
};

export const VIEW_TITLES = ["Project Board", "Product Backlog", "Sprint Readiness", "Scrum Events", "Analytics"];
export const SIDE_LABELS = ["Board", "Backlog", "Sprint", "Scrum", "Analytics"];

export const COLUMNS = ["To Do", "In Progress", "Review", "Done"];
// Column header accents, kept inside the page palette: neutral/blue, amber, blue, green.
const COL_STYLE = [
  { bg: "#EEF2FF", fg: "#3730A3" },
  { bg: "#FEF3C7", fg: "#92400E" },
  { bg: "#DBEAFE", fg: "#1D4ED8" },
  { bg: "#DCFCE7", fg: "#15803D" },
];

const CARDS = [
  { id: "login", title: "Login screen", pts: 3, who: "A", col: 3 as Col },
  { id: "payment", title: "Payment API", pts: 5, who: "D", col: 1 as Col },
  { id: "emails", title: "Onboarding emails", pts: 2, who: "S", col: 1 as Col },
  { id: "search", title: "Search filters", pts: 3, who: "T", col: 2 as Col },
  { id: "charts", title: "Dashboard charts", pts: 5, who: "J", col: 1 as Col },
  { id: "roles", title: "Role permissions", pts: 8, who: "M", col: 0 as Col },
  { id: "notes", title: "Release notes", pts: 1, who: "F", col: 0 as Col },
  { id: "triage", title: "Bug triage", pts: 2, who: "K", col: 0 as Col },
];

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
  cols: Object.fromEntries(CARDS.map((c) => [c.id, c.col])),
  planDone: [true, true, true, false, false],
  filter: "all",
  inSprint: {},
  bar: 5,
  switchOn: [true, true, false, true],
};

const PLAN = ["Define product vision", "Build and prioritise backlog", "Plan the sprint", "Run daily stand-ups", "Review and retrospective"];

const STORIES = [
  { id: "reset", ini: "R", title: "As a user, I can reset my password", pts: 3, prio: "High", tile: ["#EDE9FE", "#5B21B6"] },
  { id: "progress", ini: "P", title: "As a lead, I can see sprint progress", pts: 5, prio: "High", tile: ["#DBEAFE", "#1D4ED8"] },
  { id: "filter", ini: "F", title: "As a user, I can filter search results", pts: 3, prio: "Medium", tile: ["#DCFCE7", "#15803D"] },
  { id: "roles", ini: "A", title: "As an admin, I can assign team roles", pts: 5, prio: "Medium", tile: ["#FEF3C7", "#B45309"] },
  { id: "export", ini: "E", title: "As a user, I can export my data", pts: 2, prio: "Low", tile: ["#FCE7F3", "#BE185D"] },
  { id: "theme", ini: "D", title: "As a user, I can switch to dark mode", pts: 1, prio: "Low", tile: ["#CFFAFE", "#0E7490"] },
];
const PRIO_STYLE: Record<string, { bg: string; fg: string }> = {
  High: { bg: "#FEE4E2", fg: "#B42318" },
  Medium: { bg: "#FEF3C7", fg: "#92400E" },
  Low: { bg: "#F1EEF8", fg: "#6B6585" },
};

const EVENTS = [
  { title: "Daily stand-up", sub: "15 minutes, same time every day", tag: "Daily", lift: 7 },
  { title: "Sprint planning", sub: "Commit to the next sprint goal", tag: "Day 1", lift: 6 },
  { title: "Sprint review", sub: "Demo the increment to stakeholders", tag: "Day 10", lift: 5 },
  { title: "Retrospective", sub: "Agree one improvement to try", tag: "Day 10", lift: 4 },
];

const SPRINTS: [string, number][] = [["S1", 14], ["S2", 18], ["S3", 17], ["S4", 23], ["S5", 27], ["S6", 32]];

const CAPACITY_BASE = 12;
const CAPACITY_MAX = 30;
const VELOCITY_BASE = 12;
const VELOCITY_MAX = 34;
const WIP_LIMIT = 3;

export function useAgileMasterclass() {
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

  // 0 · Project board
  const board = COLUMNS.map((name, ci) => {
    const cards = CARDS.filter((c) => s.cols[c.id] === ci).map((c) => ({
      ...c,
      isDone: ci === 3,
      move: () => setS((prev) => ({ ...prev, cols: { ...prev.cols, [c.id]: Math.min(3, prev.cols[c.id] + 1) as Col }, auto: false })),
    }));
    return { name, ...COL_STYLE[ci], cards, count: cards.length };
  });
  const doneCount = board[3].count;
  const wip = board[1].count;

  // 1 · Product backlog
  const stories = STORIES.filter((st) => s.filter === "all" || (s.filter === "high" ? st.prio === "High" : st.prio !== "High")).map((st) => {
    const on = !!s.inSprint[st.id];
    return {
      ...st,
      prioStyle: PRIO_STYLE[st.prio],
      btnCls: "qbtn" + (on ? " is-done" : ""),
      btnLabel: on ? "In sprint" : "Add to sprint",
      toggle: () => setS((prev) => ({ ...prev, inSprint: { ...prev.inSprint, [st.id]: !prev.inSprint[st.id] }, auto: false })),
    };
  });
  const chip = (f: Filter) => ({
    cls: "chip" + (s.filter === f ? " is-active" : ""),
    pick: () => patch({ filter: f, auto: false }),
  });
  const capacity = CAPACITY_BASE + STORIES.reduce((a, st) => a + (s.inSprint[st.id] ? st.pts : 0), 0);

  // 2 · Sprint readiness
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

  // 3 · Scrum events
  const velocity = VELOCITY_BASE + EVENTS.reduce((a, e, i) => a + (s.switchOn[i] ? e.lift : 0), 0);
  const events = EVENTS.map((e, i) => ({
    ...e,
    on: (s.switchOn[i] ? "true" : "false") as "true" | "false",
    aria: (s.switchOn[i] ? "Turn off " : "Turn on ") + e.title,
    cls: "switch" + (s.switchOn[i] ? " is-on" : ""),
    toggle: () => setS((prev) => ({ ...prev, switchOn: prev.switchOn.map((o, k) => (k === i ? !o : o)), auto: false })),
  }));

  // 4 · Analytics
  const maxPts = Math.max(...SPRINTS.map((m) => m[1]));
  const bars = SPRINTS.map((m, i) => ({
    m: m[0],
    h: Math.round((m[1] / maxPts) * 100),
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
    board,
    doneCount,
    wip,
    wipLimit: WIP_LIMIT,
    stories,
    chips: { all: chip("all"), high: chip("high"), rest: chip("rest") },
    capacity,
    capacityMax: CAPACITY_MAX,
    planSteps,
    planPct: Math.round((planCount / 5) * 100),
    events,
    velocity,
    velocityPct: Math.min(100, Math.round((velocity / VELOCITY_MAX) * 100)),
    impediments: Math.round(velocity * 0.9),
    activeEvents: s.switchOn.filter(Boolean).length,
    bars,
    barLabel: SPRINTS[s.bar][0] + " · " + SPRINTS[s.bar][1] + " pts",
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
