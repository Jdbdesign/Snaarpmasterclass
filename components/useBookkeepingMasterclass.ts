"use client";

import { useEffect, useState, type FormEvent } from "react";

type InvFilter = "all" | "paid" | "overdue";

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
  month: number | null; // null = year to date
  segHover: number | null;
  segPin: number | null;
  invFilter: InvFilter;
  reminded: Record<string, boolean>;
  aiOn: boolean[];
  closeDone: boolean[];
  tool: number;
};

export const VIEW_TITLES = ["Snaarp Books (Accounting)", "Invoices", "AI Insights", "Month-End Close", "Connected Tools"];
export const SIDE_LABELS = ["Dashboard", "Invoices", "AI Insights", "Month-End", "Tools"];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
export const INCOME = [32100, 35800, 38400, 41900, 46320, 50800];
export const EXPENSES = [24500, 26300, 28100, 30200, 32740, 34700];
export const PROFIT = INCOME.map((v, i) => v - EXPENSES[i]);
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
export const YTD = { income: sum(INCOME), expenses: sum(EXPENSES), profit: sum(PROFIT) };
const YTD_DELTA = { income: "+12.6%", expenses: "+5.3%", profit: "+18.9%" };

export const CATEGORIES = [
  { name: "Payroll", share: 48, color: "#6D28D9" },
  { name: "Operations", share: 27, color: "#3B82F6" },
  { name: "Marketing", share: 15, color: "#10B981" },
  { name: "Other", share: 10, color: "#F59E0B" },
];

const gbp = (n: number) => "£" + n.toLocaleString("en-GB");
const change = (cur: number, prev: number) => {
  const p = ((cur - prev) / prev) * 100;
  return (p >= 0 ? "+" : "") + p.toFixed(1) + "%";
};

const INVOICES = [
  { client: "Brightline Health", amount: 12400, status: "Paid", tile: ["#EDE9FE", "#5B21B6"] },
  { client: "Kestrel Freight", amount: 8750, status: "Overdue", tile: ["#DBEAFE", "#1D4ED8"] },
  { client: "Alder Finch", amount: 5200, status: "Overdue", tile: ["#FEF3C7", "#B45309"] },
  { client: "Novagrid Energy", amount: 15900, status: "Paid", tile: ["#DCFCE7", "#15803D"] },
  { client: "Copperleaf Retail", amount: 3600, status: "Pending", tile: ["#FCE7F3", "#BE185D"] },
  { client: "Halden Systems", amount: 6300, status: "Overdue", tile: ["#CFFAFE", "#0E7490"] },
];
const STATUS_STYLE: Record<string, { bg: string; fg: string }> = {
  Paid: { bg: "#ECFDF3", fg: "#05603A" },
  Overdue: { bg: "#FEE4E2", fg: "#B42318" },
  Pending: { bg: "#FEF3C7", fg: "#92400E" },
};
export const OUTSTANDING = sum(INVOICES.filter((i) => i.status !== "Paid").map((i) => i.amount));

const AI_STEPS = [
  { title: "Auto-categorise transactions", sub: "Bank lines coded to the right account", tag: "14 h", lift: 14 },
  { title: "Bank feed reconciliation", sub: "Statements matched as they arrive", tag: "11 h", lift: 11 },
  { title: "Anomaly alerts", sub: "Unusual entries flagged for review", tag: "5 h", lift: 5 },
  { title: "Cash-flow forecast", sub: "Rolling 13-week outlook, kept current", tag: "8 h", lift: 8 },
];
const HOURS_BASE = 6;
const HOURS_MAX = 44;

const CLOSE_STEPS = ["Reconcile bank accounts", "Review receivables", "Review payables", "Post accruals and adjustments", "Issue management report"];

export const TOOLS = [
  { name: "Books", sub: "(Accounting)", lines: ["Invoices and bills in one place", "Bank feeds reconcile automatically", "Live profit and cash reports"] },
  { name: "CRM", sub: "(Client Management)", lines: ["Every client conversation in one view", "Deals and follow-ups tracked", "Client health at a glance"] },
  { name: "Workforce", sub: "(HR & Payroll)", lines: ["Payroll runs in a few clicks", "Leave and attendance tracked", "Payslips sent automatically"] },
  { name: "Projects", sub: "(Delivery & Costing)", lines: ["Track delivery against budget", "Time and cost per client job", "Margins visible in real time"] },
  { name: "Sign", sub: "(e-Signature)", lines: ["Send contracts for e-signature", "Full audit trail on every document", "Signed copies filed automatically"] },
  { name: "Drive", sub: "(Secure Storage)", lines: ["Secure storage for client files", "Permissions per team and client", "Everything linked to the right record"] },
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
  month: null,
  segHover: null,
  segPin: null,
  invFilter: "all",
  reminded: {},
  aiOn: [true, true, false, true],
  closeDone: [true, true, true, false, false],
  tool: 0,
};

export function useBookkeepingMasterclass() {
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

  // 0 · Dashboard
  const m = s.month;
  const inc = m === null ? YTD.income : INCOME[m];
  const exp = m === null ? YTD.expenses : EXPENSES[m];
  const pro = m === null ? YTD.profit : PROFIT[m];
  const flat = { text: "n/a", tone: "flat" as const };
  const delta = (key: "income" | "expenses" | "profit") => {
    if (m === null) return { text: YTD_DELTA[key], tone: key === "expenses" ? ("down" as const) : ("up" as const) };
    if (m === 0) return flat;
    const series = key === "income" ? INCOME : key === "expenses" ? EXPENSES : PROFIT;
    const up = series[m] >= series[m - 1];
    const good = key === "expenses" ? !up : up;
    return { text: change(series[m], series[m - 1]), tone: good ? ("up" as const) : ("down" as const) };
  };
  const kpis = [
    { label: "Total Income", value: gbp(inc), ...delta("income") },
    { label: "Total Expenses", value: gbp(exp), ...delta("expenses") },
    { label: "Profit", value: gbp(pro), ...delta("profit") },
  ];
  const maxIncome = Math.max(...INCOME);
  const bars = MONTHS.map((name, i) => ({
    m: name,
    h: Math.round((INCOME[i] / maxIncome) * 100),
    cls: "bar" + (m === i ? " is-active" : ""),
    pick: () => setS((prev) => (prev.month === i ? prev : { ...prev, month: i })),
  }));
  const barLabel = m === null ? "Year to date · " + gbp(YTD.income) + " income" : MONTHS[m] + " · " + gbp(INCOME[m]) + " income";
  const activeSeg = s.segHover ?? s.segPin;
  const segs = CATEGORIES.map((c, i) => ({
    ...c,
    amount: gbp(Math.round((exp * c.share) / 100)),
    active: activeSeg === i,
    dim: activeSeg !== null && activeSeg !== i,
    enter: () => patch({ segHover: i }),
    leave: () => patch({ segHover: null }),
    pin: () => setS((prev) => ({ ...prev, segPin: prev.segPin === i ? null : i })),
  }));

  // 1 · Invoices
  const rows = INVOICES.filter((r) => s.invFilter === "all" || (s.invFilter === "paid" ? r.status === "Paid" : r.status === "Overdue")).map((r) => {
    const done = !!s.reminded[r.client];
    return {
      ...r,
      ini: r.client.split(" ").map((w) => w[0]).join("").slice(0, 2),
      amountText: gbp(r.amount),
      statusStyle: STATUS_STYLE[r.status],
      paid: r.status === "Paid",
      btnCls: "qbtn" + (done ? " is-done" : ""),
      btnLabel: done ? "Reminded" : "Send reminder",
      toggle: () => setS((prev) => ({ ...prev, reminded: { ...prev.reminded, [r.client]: !prev.reminded[r.client] }, auto: false })),
    };
  });
  const chip = (f: InvFilter) => ({
    cls: "chip" + (s.invFilter === f ? " is-active" : ""),
    pick: () => patch({ invFilter: f, auto: false }),
  });
  const reminders = Object.values(s.reminded).filter(Boolean).length;

  // 2 · AI Insights
  const hours = HOURS_BASE + AI_STEPS.reduce((a, st, i) => a + (s.aiOn[i] ? st.lift : 0), 0);
  const aiSteps = AI_STEPS.map((st, i) => ({
    ...st,
    on: (s.aiOn[i] ? "true" : "false") as "true" | "false",
    aria: (s.aiOn[i] ? "Turn off " : "Turn on ") + st.title,
    cls: "switch" + (s.aiOn[i] ? " is-on" : ""),
    toggle: () => setS((prev) => ({ ...prev, aiOn: prev.aiOn.map((o, k) => (k === i ? !o : o)), auto: false })),
  }));

  // 3 · Month-End Close
  const doneCount = s.closeDone.filter(Boolean).length;
  const firstOpen = s.closeDone.indexOf(false);
  const closeSteps = CLOSE_STEPS.map((label, i) => {
    const done = s.closeDone[i];
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
      pick: () => setS((prev) => ({ ...prev, closeDone: prev.closeDone.map((d, k) => (k === i ? !d : d)), auto: false })),
    };
  });

  // 4 · Connected Tools
  const tools = TOOLS.map((t, i) => ({
    ...t,
    cls: "stage" + (s.tool === i ? " is-active" : ""),
    pressed: (s.tool === i ? "true" : "false") as "true" | "false",
    pick: () => patch({ tool: i, auto: false }),
  }));

  const set = (k: keyof State) => (e: { target: EventTarget | { value: string } }) =>
    patch({ [k]: (e.target as { value: string }).value, error: false } as Partial<State>);

  return {
    view: s.view,
    viewTitle: VIEW_TITLES[s.view],
    sideCls: (i: number) => "side" + (s.view === i ? " is-active" : ""),
    pickView,
    stop,
    kpis,
    bars,
    barLabel,
    isYtd: m === null,
    showYtd: () => patch({ month: null }),
    segs,
    segTotal: activeSeg === null ? { label: "Total", value: gbp(exp) } : { label: segs[activeSeg].name, value: segs[activeSeg].amount },
    rows,
    chips: { all: chip("all"), paid: chip("paid"), overdue: chip("overdue") },
    outstanding: gbp(OUTSTANDING),
    reminders,
    aiSteps,
    hours,
    hoursPct: Math.min(100, Math.round((hours / HOURS_MAX) * 100)),
    transactions: Math.round(hours * 38).toLocaleString("en-GB"),
    activeAutomations: s.aiOn.filter(Boolean).length,
    closeSteps,
    closePct: Math.round((doneCount / 5) * 100),
    tools,
    tool: TOOLS[s.tool],
    toolIndex: s.tool,
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
