"use client";

import { useEffect, useState, type FormEvent } from "react";

// Masterclass date: change it here and the hero, the Programme at a Glance panel and the success card all follow.
export const EVENT_DATE_SHORT = "Sat, 21 Nov 2026";
export const EVENT_DATE_LONG = "Saturday, 21 Nov 2026";

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
  app: number;
  month: number | null; // null = year to date
  question: number;
  autoOn: boolean[];
  roadDone: boolean[];
};

export const VIEW_TITLES = ["Snaarp 360", "Business Overview", "AI Assistant", "Automations", "AI Roadmap"];
export const SIDE_LABELS = ["Apps", "Overview", "Ask AI", "Automations", "Roadmap"];

export const APPS = [
  { name: "Workforce", line: "Payroll and people in one place", stats: [["Headcount", "48"], ["Payroll ready", "100%"]] },
  { name: "CRM", line: "Every client conversation in one view", stats: [["Open deals", "23"], ["Win rate", "34%"]] },
  { name: "Books", line: "Accounting that reconciles itself", stats: [["Cash on hand", "£86k"], ["Overdue invoices", "4"]] },
  { name: "Mail", line: "Business email with AI drafts", stats: [["Unread", "12"], ["Drafts ready", "5"]] },
  { name: "Projects", line: "Delivery tracked against budget", stats: [["Active projects", "9"], ["On budget", "78%"]] },
  { name: "Drive", line: "Secure shared storage", stats: [["Files", "1,204"], ["Shared safely", "100%"]] },
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
export const REVENUE = [52000, 56400, 61200, 66800, 73500, 81100];
export const COSTS = [41000, 43200, 45900, 48600, 52300, 56000];
export const PROFIT = REVENUE.map((v, i) => v - COSTS[i]);
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
export const YTD = { revenue: sum(REVENUE), costs: sum(COSTS), profit: sum(PROFIT) };

const gbp = (n: number) => "£" + n.toLocaleString("en-GB");
const pct = (cur: number, prev: number) => {
  const p = ((cur - prev) / prev) * 100;
  return (p >= 0 ? "+" : "") + p.toFixed(1) + "%";
};
// Year-to-date change is second quarter against first quarter.
const q = (a: number[], from: number) => sum(a.slice(from, from + 3));

export const QUESTIONS = [
  { q: "Which clients are at risk?", a: ["Northgate Logistics has not replied to the last three emails", "Two accounts have invoices more than 30 days overdue", "Halden Group's usage is down 40% month on month"] },
  { q: "Where can we cut costs?", a: ["Three overlapping software subscriptions can be merged", "Overtime spend is 18% above plan in Operations", "Late-payment chasing is still manual: automate it"] },
  { q: "What should I focus on this week?", a: ["Approve the hiring plan before Thursday's board call", "Follow up the six warm leads that have gone quiet", "Review the Operations overtime variance with the team"] },
  { q: "Forecast next quarter", a: ["Revenue is on course for about £280,000, up 26% on Q2", "Costs should rise more slowly, to about £185,000", "Profit margin is on track to pass 33% by September"] },
];

export const AUTOMATIONS = [
  { title: "Automated weekly reports", sub: "Board pack built every Monday", lift: 8 },
  { title: "Lead follow-ups", sub: "Warm leads nudged automatically", lift: 7 },
  { title: "Approval workflows", sub: "Requests routed to the right person", lift: 6 },
  { title: "Meeting summaries", sub: "Notes and actions sent after every call", lift: 5 },
];
export const HOURS_BASE = 3;
export const HOURS_MAX = HOURS_BASE + sum(AUTOMATIONS.map((a) => a.lift)); // 29
export const HOURLY_COST = 35;
export const WEEKS_PER_MONTH = 4;
export const hoursSaved = (on: boolean[]) => HOURS_BASE + AUTOMATIONS.reduce((a, s, i) => a + (on[i] ? s.lift : 0), 0);
export const costSaved = (hours: number) => hours * WEEKS_PER_MONTH * HOURLY_COST;

export const ROADMAP = ["Audit current processes", "Pick high-impact use cases", "Pilot with one team", "Measure the results", "Scale across the business"];

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
  app: 0,
  month: null,
  question: 0,
  autoOn: [true, true, false, true],
  roadDone: [true, true, true, false, false],
};

export function useCeoMasterclass() {
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

  // 0 · Apps
  const apps = APPS.map((a, i) => ({
    ...a,
    cls: "stage" + (s.app === i ? " is-active" : ""),
    pressed: (s.app === i ? "true" : "false") as "true" | "false",
    pick: () => patch({ app: i, auto: false }),
  }));

  // 1 · Business Overview
  const m = s.month;
  const rev = m === null ? YTD.revenue : REVENUE[m];
  const cost = m === null ? YTD.costs : COSTS[m];
  const pro = m === null ? YTD.profit : PROFIT[m];
  const delta = (key: "revenue" | "costs" | "profit") => {
    const series = key === "revenue" ? REVENUE : key === "costs" ? COSTS : PROFIT;
    const bad = key === "costs"; // a rise in costs is the unwelcome direction
    if (m === null) {
      const up = q(series, 3) >= q(series, 0);
      return { text: pct(q(series, 3), q(series, 0)) + " Q2 vs Q1", tone: (up !== bad ? "up" : "down") as "up" | "down" };
    }
    if (m === 0) return { text: "-", tone: "flat" as const };
    const up = series[m] >= series[m - 1];
    return { text: pct(series[m], series[m - 1]), tone: (up !== bad ? "up" : "down") as "up" | "down" };
  };
  const kpis = [
    { label: "Revenue", value: gbp(rev), ...delta("revenue") },
    { label: "Costs", value: gbp(cost), ...delta("costs") },
    { label: "Profit", value: gbp(pro), ...delta("profit") },
  ];
  const maxRev = Math.max(...REVENUE);
  const bars = MONTHS.map((name, i) => ({
    m: name,
    h: Math.round((REVENUE[i] / maxRev) * 100),
    cls: "bar" + (m === i ? " is-active" : ""),
    pick: () => setS((prev) => (prev.month === i ? prev : { ...prev, month: i })),
  }));
  const barLabel = m === null ? "Year to date · " + gbp(YTD.revenue) + " revenue" : MONTHS[m] + " · " + gbp(REVENUE[m]) + " revenue";

  // 2 · AI Assistant
  const questions = QUESTIONS.map((x, i) => ({
    text: x.q,
    cls: "ceo-q" + (s.question === i ? " is-active" : ""),
    pressed: (s.question === i ? "true" : "false") as "true" | "false",
    pick: () => patch({ question: i, auto: false }),
  }));

  // 3 · Automations
  const hours = hoursSaved(s.autoOn);
  const autoSteps = AUTOMATIONS.map((st, i) => ({
    ...st,
    tag: st.lift + " h",
    on: (s.autoOn[i] ? "true" : "false") as "true" | "false",
    aria: (s.autoOn[i] ? "Turn off " : "Turn on ") + st.title,
    cls: "switch" + (s.autoOn[i] ? " is-on" : ""),
    toggle: () => setS((prev) => ({ ...prev, autoOn: prev.autoOn.map((o, k) => (k === i ? !o : o)), auto: false })),
  }));

  // 4 · AI Roadmap
  const doneCount = s.roadDone.filter(Boolean).length;
  const firstOpen = s.roadDone.indexOf(false);
  const roadSteps = ROADMAP.map((label, i) => {
    const done = s.roadDone[i];
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
      pick: () => setS((prev) => ({ ...prev, roadDone: prev.roadDone.map((d, k) => (k === i ? !d : d)), auto: false })),
    };
  });

  const set = (k: keyof State) => (e: { target: EventTarget | { value: string } }) =>
    patch({ [k]: (e.target as { value: string }).value, error: false } as Partial<State>);

  return {
    view: s.view,
    viewTitle: VIEW_TITLES[s.view],
    sideCls: (i: number) => "side" + (s.view === i ? " is-active" : ""),
    pickView,
    stop,
    apps,
    appIndex: s.app,
    app: APPS[s.app],
    kpis,
    bars,
    barLabel,
    isYtd: m === null,
    showYtd: () => patch({ month: null }),
    questions,
    questionIndex: s.question,
    answer: QUESTIONS[s.question],
    autoSteps,
    hours,
    hoursPct: Math.min(100, Math.round((hours / HOURS_MAX) * 100)),
    cost: gbp(costSaved(hours)),
    activeAutomations: s.autoOn.filter(Boolean).length,
    roadSteps,
    roadPct: Math.round((doneCount / ROADMAP.length) * 100),
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
