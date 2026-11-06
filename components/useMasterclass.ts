"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";

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
  leadFilter: string;
  qualified: Record<string, boolean>;
  stage: number;
  bar: number;
  seqOn: boolean[];
  mod: number;
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
  leadFilter: "all",
  qualified: {},
  stage: 3,
  bar: 5,
  seqOn: [true, true, false, true],
  mod: 0,
};

// Turns a CSS declaration string into a React style object (used for the fully dynamic dot/tag styles).
export function css(str: string): CSSProperties {
  const o: Record<string, string> = {};
  for (const part of str.split(";")) {
    const p = part.trim();
    if (!p) continue;
    const i = p.indexOf(":");
    const k = p
      .slice(0, i)
      .trim()
      .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    o[k] = p.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

export function useMasterclass(autoTour: boolean = true) {
  const [s, setS] = useState<State>(INITIAL);
  const setState = (p: Partial<State>) => setS((prev) => ({ ...prev, ...p }));
  const autoTourRef = useRef(autoTour);
  autoTourRef.current = autoTour;

  useEffect(() => {
    const timer = setInterval(() => {
      const autoOn = autoTourRef.current ?? true;
      setS((prev) => (autoOn && prev.auto ? { ...prev, view: (prev.view + 1) % 5 } : prev));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Native <select> boxes keep the text position from their first layout. The original page is built in the
  // browser after its font is ready; here the HTML arrives first, so re-layout the selects once the font is in.
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

  const pickView =(i: number) => setState({ view: i, auto: false });

  const autoOn = (autoTour ?? true) && s.auto;
  const B = [
    "Learn a proven, step-by-step sales growth framework.",
    "Discover how to find and attract quality leads using AI.",
    "Build and automate a sales pipeline that converts.",
    "Get practical, real-world strategies you can apply immediately.",
    "Receive a certificate from Metropolitan School of Business and Management UK.",
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vals: Record<string, any> = {
    benefits: B.map((title, i) => ({
      title,
      pressed: s.view === i ? "true" : "false",
      cls: "benefit" + (s.view === i ? " is-active" : "") + (autoOn ? " is-auto" : ""),
      pick: () => pickView(i),
    })),
    viewTitle: ["Sales Growth Framework", "Leads", "Sales Pipeline", "Campaigns", "Analytics"][s.view],
    v0: s.view === 0,
    v1: s.view === 1,
    v2: s.view === 2,
    v3: s.view === 3,
    v4: s.view === 4,
  };
  for (let i = 0; i < 5; i++) {
    vals["side" + i] = () => pickView(i);
    vals["side" + i + "Cls"] = "side" + (s.view === i ? " is-active" : "");
  }

  const PL = ["Sales Growth Strategy", "Finding & Qualifying Leads", "Automating Outreach", "Managing Your Sales Pipeline", "Measuring & Scaling Results"];
  const doneN = s.planDone.filter(Boolean).length;
  const firstOpen = s.planDone.indexOf(false);
  vals.planPct = Math.round((doneN / 5) * 100);
  vals.planSteps = PL.map((label, i) => {
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
      pick: () => {
        const d = s.planDone.slice();
        d[i] = !d[i];
        setState({ planDone: d, auto: false });
      },
    };
  });

  const L = [
    { co: "Brightline Health", ind: "Healthcare", score: 94 },
    { co: "Kestrel Freight", ind: "Logistics", score: 89 },
    { co: "Alder Finch", ind: "Professional services", score: 82 },
    { co: "Novagrid Energy", ind: "Energy", score: 76 },
    { co: "Copperleaf Retail", ind: "Retail", score: 68 },
    { co: "Halden Systems", ind: "Software", score: 61 },
  ];
  const f = s.leadFilter;
  vals.leads = L.filter((l) => f === "all" || (f === "hot" ? l.score >= 80 : l.score < 80)).map((l) => {
    const q = !!s.qualified[l.co];
    return {
      ...l,
      ini: l.co
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2),
      color: l.score >= 80 ? "#6D28D9" : "#A78BFA",
      btnCls: "qbtn" + (q ? " is-done" : ""),
      btnLabel: q ? "✓ Qualified" : "Qualify",
      toggle: () => setState({ qualified: { ...s.qualified, [l.co]: !q }, auto: false }),
    };
  });
  vals.qualifiedCount = 38 + Object.values(s.qualified).filter(Boolean).length;
  vals.chipAllCls = "chip" + (f === "all" ? " is-active" : "");
  vals.chipHotCls = "chip" + (f === "hot" ? " is-active" : "");
  vals.chipWarmCls = "chip" + (f === "warm" ? " is-active" : "");
  vals.fAll = () => setState({ leadFilter: "all", auto: false });
  vals.fHot = () => setState({ leadFilter: "hot", auto: false });
  vals.fWarm = () => setState({ leadFilter: "warm", auto: false });

  const ST = [
    { name: "Prospecting", value: "£98,400", pct: 100, deals: [["Halden Systems", "£6,200"], ["Copperleaf Retail", "£4,800"], ["Marlow Studios", "£3,900"], ["Pennine Foods", "£3,100"]] },
    { name: "Contacted", value: "£84,200", pct: 78, deals: [["Novagrid Energy", "£9,400"], ["Orbit Clinics", "£5,100"], ["Lumen Schools", "£4,300"], ["Westway Fleet", "£3,800"]] },
    { name: "Proposal", value: "£71,900", pct: 56, deals: [["Alder Finch", "£12,500"], ["Westway Fleet", "£8,800"], ["Harbour Bank", "£6,700"], ["Crescent Labs", "£5,400"]] },
    { name: "Negotiation", value: "£101,500", pct: 38, deals: [["Brightline Health", "£24,000"], ["Kestrel Freight", "£18,500"], ["Harbour Bank", "£15,200"], ["Northgate Hotels", "£11,000"]] },
    { name: "Won", value: "£128,000", pct: 24, deals: [["Silverline Insurance", "£21,000"], ["Northgate Hotels", "£14,600"], ["Crescent Labs", "£11,900"], ["Orbit Clinics", "£9,300"]] },
  ];
  vals.stages = ST.map((st, i) => ({
    ...st,
    cls: "stage" + (s.stage === i ? " is-active" : ""),
    color: s.stage === i ? "#6D28D9" : "#C4B5FD",
    pick: () => setState({ stage: i, auto: false }),
  }));
  vals.stageName = ST[s.stage].name;
  vals.stageDeals = ST[s.stage].deals.map((d) => ({ name: d[0], value: d[1] }));

  const M: [string, number][] = [["Jan", 14], ["Feb", 17], ["Mar", 16], ["Apr", 22], ["May", 27], ["Jun", 32]];
  vals.bars = M.map((m, i) => ({
    m: m[0],
    h: Math.round((m[1] / 32) * 100),
    cls: "bar" + (s.bar === i ? " is-active" : ""),
    hover: () => {
      if (s.bar !== i) setState({ bar: i });
    },
  }));
  vals.barLabel = M[s.bar][0] + " · £" + M[s.bar][1] + "k";

  const SEQ = [
    { day: "Day 1", ch: "Email", title: "Personalised intro", lift: 6 },
    { day: "Day 3", ch: "LinkedIn", title: "Connection message", lift: 4 },
    { day: "Day 5", ch: "Email", title: "Value follow-up", lift: 3 },
    { day: "Day 8", ch: "Call", title: "Discovery call", lift: 5 },
  ];
  const reply = 2 + SEQ.reduce((a, q, i) => a + (s.seqOn[i] ? q.lift : 0), 0);
  vals.replyRate = reply;
  vals.replyBar = Math.round((reply / 20) * 100);
  vals.meetings = Math.round(reply * 1.6);
  vals.activeSteps = s.seqOn.filter(Boolean).length;
  vals.seq = SEQ.map((q, i) => ({
    ...q,
    on: s.seqOn[i] ? "true" : "false",
    aria: (s.seqOn[i] ? "Turn off " : "Turn on ") + q.title,
    cls: "switch" + (s.seqOn[i] ? " is-on" : ""),
    toggle: () => {
      const o = s.seqOn.slice();
      o[i] = !o[i];
      setState({ seqOn: o, auto: false });
    },
  }));

  const full = (s.first + " " + s.last).trim();
  vals.certName = full || "Your Name";
  for (let i = 0; i < 5; i++) {
    vals["mod" + i] = () => setState({ mod: i });
    vals["mod" + i + "Cls"] = "mod" + (s.mod === i ? " is-active" : "");
    vals["mod" + i + "P"] = s.mod === i ? "true" : "false";
  }

  const set = (k: keyof State) => (e: { target: { value: string } }) =>
    setState({ [k]: e.target.value, error: false } as Partial<State>);
  Object.assign(vals, {
    onFirst: set("first"),
    onLast: set("last"),
    onEmail: set("email"),
    onPhone: set("phone"),
    onCode: set("code"),
    onLoc: set("loc"),
    onRole: set("role"),
    notSubmitted: !s.submitted,
    submitted: s.submitted,
    showError: s.error,
    firstName: s.first || "there",
    submit: (e: FormEvent) => {
      if (e && e.preventDefault) e.preventDefault();
      const ok = s.first.trim() && s.last.trim() && /.+@.+\..+/.test(s.email) && s.phone.trim() && s.loc.trim() && s.role;
      if (ok) setState({ submitted: true, error: false });
      else setState({ error: true });
    },
    resetForm: () => setState({ submitted: false, first: "", last: "", email: "", phone: "", loc: "", role: "", code: "+44" }),
  });
  return vals;
}
