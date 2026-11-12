"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import EventCountdown from "./EventCountdown";
import { IcChecklistCircle, IcGrid, IcMail, IcSpark } from "./ceoIcons";
import { IcCheckSwirl, IcRefresh } from "./agileIcons";
import { IcCloud, IcDocCalc, IcNetwork } from "./bookkeepingIcons";
import { BuildingArt } from "./ContractsArt";
import CountrySelect from "./CountrySelect";
import { IcArrow, IcAward, IcCalendar, IcCheck, IcClipboard, IcClock, IcLaptop, IcLayers, IcSearch, IcShieldCheck } from "./contractsIcons";
import { IcBarChart, IcChipAI, IcGroup, IcTarget } from "./hrIcons";
import { css } from "./useMasterclass";
import { EVENT_DATE_LONG, EVENT_DATE_SHORT, SIDE_LABELS, useCeoMasterclass } from "./useCeoMasterclass";

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const SNAARP_MARK =
  "M8.61133 28.6036L8.63719 28.5944C8.77487 28.5439 8.80308 28.4942 8.96087 28.447C10.0143 28.1324 11.0738 27.8359 12.1301 27.5328L19.4771 25.3935C21.0189 24.9266 22.5656 24.4766 24.117 24.0437C24.6559 23.8931 25.2907 23.6593 25.8303 23.5586C25.8444 25.1 25.8481 26.6414 25.8417 28.1829L25.841 36.1356L25.8405 39.2371C25.8404 39.5672 25.8671 40.8119 25.7909 41.0597C25.6362 40.9835 25.2843 40.7154 25.1313 40.6051L23.7475 39.5995L21.0798 37.6738C20.6595 37.3704 20.0236 36.9407 19.6451 36.6248C19.2387 37.2238 18.852 37.7352 18.5189 38.3815C14.1072 46.9432 21.5945 56.5317 30.805 54.5879C37.402 53.1954 38.588 45.6242 40.146 40.0795C42.1905 32.9224 46.527 26.5972 54.1328 25.1408C59.0688 24.163 64.1841 25.2356 68.338 28.1193C72.2775 30.8767 75.1646 35.2946 76.0206 40.0932C76.9272 45.0635 75.8308 50.196 72.9784 54.3353C72.8437 54.5327 72.6996 54.7207 72.5965 54.9358C72.966 55.2422 73.4306 55.5629 73.8244 55.8484L75.9324 57.3813C76.4465 57.7523 77.1058 58.2138 77.5885 58.6229C76.8678 58.7539 75.9887 59.0753 75.2714 59.2758C74.6379 59.453 74.0185 59.6405 73.3894 59.8254L64.3709 62.4326C63.1866 62.7693 61.4533 63.3528 60.2964 63.5889C60.2425 60.3427 60.2875 56.9603 60.2879 53.705L60.2882 48.8545C60.2882 48.5217 60.2545 46.2383 60.3383 46.0768C60.7264 46.3264 61.2332 46.7168 61.6212 46.9957L64.8235 49.3237C65.2318 49.6173 66.0864 50.2609 66.5109 50.4808C68.2611 48.2511 69.1796 45.265 68.8626 42.4179C68.5347 39.3809 67.0122 36.6084 64.6419 34.7324C60.5639 31.4481 53.6768 31.3079 50.3553 35.8166C46.7561 40.6057 46.7488 46.7318 44.097 52.0414C41.2546 57.7324 37.4325 61.2707 31.1013 62.1821C22.0353 63.4873 13.3968 58.0695 10.6465 49.168C10.3286 48.1391 10.0713 47.0562 9.94354 45.9885C9.33425 41.1013 10.6378 36.1663 13.573 32.2483C13.2164 31.9376 8.78307 28.6924 8.61133 28.6447V28.6036Z";

const SnaarpMark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 89 89" fill="none" aria-hidden="true" style={{ display: "block", flex: "none" }}>
    <rect width="88.9809" height="88.9809" rx="20.0925" fill="#7C3AED"></rect>
    <path d={SNAARP_MARK} fill="#FFFFFF"></path>
  </svg>
);

// Faculty and FAQ have no section on this page: they point at the nearest existing anchors.
const NAV: [string, string][] = [
  ["Home", "#top"],
  ["Overview", "#about"],
  ["Curriculum", "#curriculum"],
  ["Faculty", "#curriculum"],
  ["Who Should Attend", "#who"],
  ["FAQ", "#register"],
];

const TRUST: [typeof IcAward, ReactNode][] = [
  [IcAward, <>MSBM Certificate<br />of Participation</>],
  [IcLaptop, <>Practical Business<br />Training</>],
  [IcGroup, <>Expert<br />Faculty</>],
  [IcLayers, <>Real-World<br />Use Cases</>],
  [IcBarChart, <>Tools, Templates<br />&amp; Resources</>],
];

const CURRICULUM: [typeof IcGroup, string, string][] = [
  [IcTarget, "The CEO's Role in the AI Era", "Key principles, frameworks and where to start with AI in your business."],
  [IcGroup, "Leading Teams with AI", "Building high-performing, AI-enabled teams and driving adoption."],
  [IcBarChart, "Data-Driven Decisions", "Using dashboards, KPIs and AI insights to decide faster and with confidence."],
  [IcLayers, "Streamlining Operations", "Automating processes, reducing costs and removing bottlenecks across the business."],
  [IcChecklistCircle, "Financial Control & Profitability", "Using AI and modern tools to forecast, control costs and grow margins."],
  [IcClock, "Saving Time & Scaling Smartly", "Practical ways to save hours every week and scale without adding headcount."],
];

const WHO = [
  "CEOs & Managing Directors",
  "Founders & Business Owners",
  "Senior Managers & Department Heads",
  "Start-up & SME Leaders",
  "Anyone involved in running or growing a business",
];

const OUTCOMES = [
  "Understand how AI can transform your business.",
  "Make faster, better-informed decisions.",
  "Automate routine work and save time every week.",
  "Improve team productivity and collaboration.",
  "An MSBM Certificate of Participation.",
];

const GLANCE: [typeof IcAward, string, string, string?][] = [
  [IcCalendar, "Date:", EVENT_DATE_LONG],
  [IcClock, "Duration:", "3 Hours"],
  [IcLaptop, "Format:", "Live Online (Zoom)"],
  [IcAward, "Certificate:", "MSBM Certificate of Participation"],
  [IcLayers, "Access:", "Complimentary", "(Registration Required)"],
];

const APP_ICONS = [IcGroup, IcNetwork, IcDocCalc, IcMail, IcLayers, IcCloud];
const SIDE_ICONS = [IcGrid, IcBarChart, IcChipAI, IcRefresh, IcClipboard];

const h2: CSSProperties = { fontSize: "clamp(26px, 2.6vw, 36px)" };
const mockCard: CSSProperties = { background: "#FFFFFF", border: "1px solid #ECE9F5", borderRadius: "12px" };

const Arrow = ({ size = 22 }: { size?: number }) => <IcArrow size={size} sw={2.4} />;

export default function CeoMasterclass({ heroOverlay = null, ctaPhoto = false }: { heroOverlay?: string | null; ctaPhoto?: boolean }) {
  const v = useCeoMasterclass();

  return (
    <div id="top" style={{ fontFamily: FONT, color: "#1A1433", background: "#FFFFFF", width: "100%" }} data-label="The AI-Powered CEO masterclass landing page">
      {/* ───────── Hero: blank navy-to-violet background; optional photo slot only ───────── */}
      <section className="ceo-hero">
        {heroOverlay && <div className="ceo-hero-overlay" aria-hidden="true" style={{ backgroundImage: `url(/ai-powered-ceo/${heroOverlay})` }}></div>}
        <div className="dots ceo-hero-dots" aria-hidden="true"></div>
        <div className="wrap ceo-hero-inner">
          <header className="ceo-hdr" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "22px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <img src="/msbm-logo.png" alt="Metropolitan School of Business and Management UK" style={{ height: "48px", width: "auto", display: "block" }} />
              <div className="hide-sm" style={{ width: "1px", height: "44px", background: "rgba(255,255,255,.25)" }}></div>
              <div className="hide-sm ceo-brand" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <SnaarpMark size={42} />
                <span style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.01em" }}>Snaarp</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
              <nav className="navlinks" aria-label="Main" style={{ gap: "26px" }}>
                {NAV.map(([label, href]) => (
                  <a key={label} className="navlink" href={href} style={{ fontSize: "14px", color: "#FFFFFF" }}>{label}</a>
                ))}
              </nav>
              <a className="btn btn-primary" href="#register" style={{ height: "46px", padding: "0 22px", fontSize: "15px" }}>Register Now</a>
            </div>
          </header>

          <div className="ceo-hero-grid" style={{ padding: "34px 0 48px" }}>
            <div className="ceo-hero-copy" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="ceo-pill">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="m22 8-6 4 6 4V8Z"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                <span>Complimentary Online Masterclass</span>
              </div>
              <h1 className="h1 ceo-h1" style={{ margin: "0", lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.035em" }}>
                {"The AI-Powered CEO:"}<br />
                {"How to Build a Smarter,"}<br />
                {"Leaner & More"}<br />
                {"Profitable Business"}
              </h1>
              <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.55", color: "#E4DEF7", maxWidth: "600px" }}>
                A practical, expert-led masterclass for CEOs, founders and business leaders on using AI to make faster decisions, streamline operations and build a leaner, more profitable business.
              </p>
              <div className="metas" style={{ marginTop: "6px" }}>
                <div className="meta"><IcCalendar size={26} sw={1.6} style={{ color: "#FFFFFF" }} /><span style={{ fontSize: "16px", fontWeight: "600" }}>{EVENT_DATE_SHORT}</span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcLaptop size={28} sw={1.6} /><span style={{ fontSize: "13.5px", fontWeight: "600", lineHeight: "1.25" }}>Live Online<br /><span style={{ fontWeight: "500", color: "#D3CCEA" }}>(Zoom)</span></span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcClock size={26} sw={1.6} /><span style={{ fontSize: "16px", fontWeight: "600" }}>3 Hours</span></div>
              </div>
              <EventCountdown />
            </div>

            <div id="register" className="ceo-card" style={{ background: "#FFFFFF", color: "#1A1433", borderRadius: "22px", padding: "28px 28px 22px", boxShadow: "0 40px 80px -30px rgba(0,0,0,.55)" }}>
              {!v.submitted && (
                <form onSubmit={v.submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "6px" }}>
                    <h2 style={{ margin: "0", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em" }}>Register for Your Free Spot</h2>
                    <p style={{ margin: "0", fontSize: "15px", color: "#3B3456", lineHeight: "1.5" }}>Secure your place at the masterclass. Registration is complimentary.</p>
                  </div>
                  <div className="form-2">
                    <input className="inp" type="text" placeholder="First Name *" aria-label="First Name" autoComplete="given-name" onInput={v.onFirst} />
                    <input className="inp" type="text" placeholder="Surname *" aria-label="Surname" autoComplete="family-name" onInput={v.onLast} />
                  </div>
                  <input className="inp" type="email" placeholder="Email Address *" aria-label="Email Address" autoComplete="email" onInput={v.onEmail} />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <CountrySelect onChange={v.onCode} />
                    <input className="inp" type="tel" placeholder="Phone Number *" aria-label="Phone Number" autoComplete="tel-national" onInput={v.onPhone} />
                  </div>
                  <input className="inp" type="text" placeholder="Location (City, Country) *" aria-label="Location (City, Country)" autoComplete="address-level2" onInput={v.onLoc} />
                  <select className="inp" aria-label="Your Role" onChange={v.onRole}>
                    <option value="">Your Role (e.g. CEO, Founder, Managing Director) *</option>
                    <option>CEO / Managing Director</option>
                    <option>Founder / Co-founder</option>
                    <option>Business Owner</option>
                    <option>Senior Manager / Director</option>
                    <option>Start-up Leader</option>
                    <option>Other</option>
                  </select>
                  {v.showError && (
                    <p role="alert" className="fade" style={{ margin: "0", padding: "10px 14px", borderRadius: "10px", background: "#FEF3F2", color: "#B42318", fontSize: "14px", fontWeight: "600" }}>
                      Please complete all required fields with a valid email.
                    </p>
                  )}
                  <button className="btn btn-primary" type="submit" style={{ height: "54px", fontSize: "17px", marginTop: "4px" }}>
                    {"Register Now – It's Free\n"}<Arrow />
                  </button>
                  <div className="ceo-shield-note">
                    <IcShieldCheck size={26} sw={1.8} style={{ color: "#6D28D9" }} />
                    <span style={{ fontSize: "13px", lineHeight: "1.4" }}>Your information is secure and will only be used for this programme.</span>
                  </div>
                </form>
              )}
              {v.submitted && (
                <div className="fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px", padding: "40px 4px" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IcCheck size={36} sw={2.6} style={{ color: "#6D28D9" }} />
                  </div>
                  <h2 style={{ margin: "0", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em" }}>{"Your free spot is secured, "}<span>{v.firstName}</span></h2>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3B3456" }}>{"The AI-Powered CEO Masterclass · " + EVENT_DATE_SHORT + " · 3 Hours · Live Online (Zoom)"}</p>
                  <button className="btn btn-ghost" type="button" onClick={v.resetForm} style={{ height: "46px", width: "100%", fontSize: "15px", marginTop: "8px" }}>Register another person</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trust strip ───────── */}
      <section style={{ background: "#F5F3FD", borderBottom: "1px solid #ECE8F6" }}>
        <div className="wrap ceo-trust-grid" style={{ paddingTop: "22px", paddingBottom: "22px" }}>
          {TRUST.map(([Ic, text], i) => (
            <Fragment key={i}>
              {i > 0 && <div className="vline"></div>}
              <div className="trust">
                <Ic className="ticon" size={42} sw={1.5} style={{ color: "#6D28D9" }} />
                <span className="ceo-trust-text">{text}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section id="about" style={{ padding: "56px 0 52px", background: "#FFFFFF" }}>
        <div className="wrap ceo-about-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
            <div>
              <h2 className="ceo-h2" style={{ fontSize: "40px" }}>About the Masterclass</h2>
              <span className="ceo-bar"></span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "17px", lineHeight: "1.55" }}>
              The role of the modern CEO is changing fast. This masterclass shows business leaders how to use AI to make better decisions, streamline operations, empower teams and stay ahead of the competition.
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55" }}>
              You will see how AI and modern business tools work in practice, and leave with clear, practical steps to build a smarter, leaner and more profitable business.
            </p>
            <div style={{ marginTop: "10px" }}>
              <a className="btn btn-primary" href="#register" style={{ height: "54px", padding: "0 28px", fontSize: "18px" }}>
                {"Register for Free Spot\n"}<Arrow />
              </a>
            </div>
          </div>

          {/* Interactive Snaarp 360 dashboard, in the laptop photo's place */}
          <div className="ceo-mock-panel">
            <div style={{ position: "relative", minWidth: "0" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: "8% 6% 0 6%", background: "radial-gradient(closest-side, rgba(124,58,237,.25), transparent)", filter: "blur(30px)" }}></div>
              <div style={{ position: "relative", background: "#0D0B14", borderRadius: "20px 20px 0 0", padding: "12px 12px 16px", boxShadow: "0 50px 90px -40px rgba(30,10,70,.65)", border: "1px solid #2A2540" }}>
                <div aria-hidden="true" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2A2540", margin: "-4px auto 7px" }}></div>
                <div className="screen" onClickCapture={v.stop} style={{ borderRadius: "7px", background: "#F6F5FB" }}>
                  <div className="dash" style={{ display: "flex", height: "470px", fontSize: "12px" }}>
                    <aside style={{ width: "150px", flex: "none", background: "#15102A", padding: "14px 10px", display: "flex", flexDirection: "column", gap: "3px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "2px 6px 14px" }}>
                        <SnaarpMark size={24} />
                        <span style={{ color: "#FFFFFF", fontWeight: "700", fontSize: "13px" }}>Snaarp</span>
                      </div>
                      {SIDE_LABELS.map((label, i) => {
                        const Ic = SIDE_ICONS[i];
                        return (
                          <button key={label} type="button" className={v.sideCls(i)} onClick={() => v.pickView(i)}>
                            <Ic size={15} sw={2} />{label}
                          </button>
                        );
                      })}
                    </aside>
                    <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                      <div style={{ height: "48px", flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "#FFFFFF", borderBottom: "1px solid #ECE9F5" }}>
                        <span data-testid="view-title" style={{ fontSize: "15px", fontWeight: "800", color: "#1A1433" }}>{v.viewTitle}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "28px", padding: "0 10px", borderRadius: "8px", background: "#F4F2FA", color: "#6B6585", fontSize: "11px", width: "140px" }}>
                          <IcSearch size={13} sw={2} />Search
                        </div>
                      </div>
                      <div style={{ flex: "1", minHeight: "0", padding: "14px 16px", overflow: "hidden" }}>
                        {v.view === 0 && (
                          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
                              {v.apps.map((a, i) => {
                                const Ic = APP_ICONS[i];
                                return (
                                  <button key={a.name} type="button" data-testid="app" className={a.cls + " ceo-ttile"} onClick={a.pick} aria-pressed={a.pressed} style={{ padding: "14px 9px" }}>
                                    <Ic size={22} sw={1.8} style={{ color: "#6D28D9" }} />
                                    <span style={{ fontSize: "12px", fontWeight: "800", color: "#1A1433" }}>{a.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                            <div key={v.appIndex} className="fade" data-testid="app-detail" style={{ flex: "1", minHeight: "0", ...mockCard, padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <span style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EDE9FE", color: "#6D28D9", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                                  {(() => { const Ic = APP_ICONS[v.appIndex]; return <Ic size={22} sw={1.8} />; })()}
                                </span>
                                <span style={{ display: "flex", flexDirection: "column" }}>
                                  <span data-testid="app-name" style={{ fontSize: "16px", fontWeight: "800" }}>{v.app.name}</span>
                                  <span data-testid="app-line" style={{ fontSize: "11.5px", color: "#6B6585" }}>{v.app.line}</span>
                                </span>
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
                                {v.app.stats.map(([label, value]) => (
                                  <div key={label} data-testid="app-stat" style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #F1EEF8", background: "#FCFBFF", display: "flex", flexDirection: "column", gap: "2px" }}>
                                    <span style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>{label}</span>
                                    <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {v.view === 1 && (
                          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                            <div className="ceo-kpis">
                              {v.kpis.map((k) => (
                                <div key={k.label} className="ceo-kpi" data-testid="kpi">
                                  <span style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>{k.label}</span>
                                  <span data-testid="kpi-value" style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>{k.value}</span>
                                  <span data-testid="kpi-delta" className={"ceo-delta is-" + k.tone}>{k.text}</span>
                                </div>
                              ))}
                            </div>
                            <div style={{ flex: "1", minHeight: "0", ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column", minWidth: "0" }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", fontSize: "12px" }}>
                                <span style={{ fontWeight: "800" }}>Revenue by month</span>
                                <button type="button" data-testid="ytd" className={"chip" + (v.isYtd ? " is-active" : "")} onClick={v.showYtd}>YTD</button>
                              </div>
                              <span data-testid="bar-label" style={{ color: "#5B21B6", fontWeight: "800", fontSize: "11px", marginTop: "2px" }}>{v.barLabel}</span>
                              <div className={"ceo-bars" + (v.isYtd ? " is-ytd" : "")} style={{ flex: "1", minHeight: "0", display: "flex", gap: "8px", alignItems: "flex-end", paddingTop: "10px" }}>
                                {v.bars.map((br, idx) => (
                                  <div key={idx} className={br.cls} data-testid="bar" onMouseEnter={br.pick} onClick={br.pick}>
                                    <div className="col" style={{ height: `${br.h}%` }}></div>
                                    <span style={{ fontSize: "10px", color: "#6B6585", fontWeight: "600" }}>{br.m}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {v.view === 2 && (
                          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                              {v.questions.map((qn) => (
                                <button key={qn.text} type="button" data-testid="question" className={qn.cls} onClick={qn.pick} aria-pressed={qn.pressed}>{qn.text}</button>
                              ))}
                            </div>
                            <div key={v.questionIndex} className="fade" data-testid="answer" style={{ flex: "1", minHeight: "0", ...mockCard, padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#6D28D9", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><IcSpark size={16} sw={2} /></span>
                                <span style={{ fontSize: "12.5px", fontWeight: "800" }}>{v.answer.q}</span>
                              </div>
                              {v.answer.a.map((line) => (
                                <div key={line} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "10px", border: "1px solid #F1EEF8", background: "#FCFBFF", fontSize: "12px", fontWeight: "600" }}>
                                  <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#6D28D9", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><IcCheck size={11} sw={3.2} /></span>
                                  {line}
                                </div>
                              ))}
                            </div>
                            <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "8px", height: "32px", padding: "0 12px", borderRadius: "8px", background: "#F4F2FA", color: "#6B6585", fontSize: "11px", flex: "none" }}>
                              <IcSearch size={13} sw={2} />Ask anything about your business
                            </div>
                          </div>
                        )}

                        {v.view === 3 && (
                          <div className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: "10px", height: "100%" }}>
                            <div style={{ ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div style={{ fontWeight: "800", fontSize: "12.5px" }}>Automations</div>
                              {v.autoSteps.map((t, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "10px", border: "1px solid #F1EEF8", background: "#FCFBFF" }}>
                                  <span style={{ width: "34px", fontSize: "10.5px", fontWeight: "800", color: "#6D28D9" }}>{t.tag}</span>
                                  <span style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "0" }}>
                                    <span style={{ fontSize: "12px", fontWeight: "700" }}>{t.title}</span>
                                    <span style={{ fontSize: "10.5px", color: "#6B6585" }}>{t.sub}</span>
                                  </span>
                                  <button type="button" className={t.cls} onClick={t.toggle} aria-pressed={t.on} aria-label={t.aria}><span></span></button>
                                </div>
                              ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              <div style={{ background: "#15102A", color: "#FFFFFF", borderRadius: "12px", padding: "14px" }}>
                                <div style={{ fontSize: "10.5px", color: "#B9B2D3", fontWeight: "600" }}>Hours saved / week</div>
                                <div data-testid="hours" style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em", marginTop: "2px" }}>{v.hours}</div>
                                <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.12)", marginTop: "8px", overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: `${v.hoursPct}%`, background: "#A78BFA", borderRadius: "3px", transition: "width .4s" }}></div>
                                </div>
                              </div>
                              <div style={{ ...mockCard, padding: "12px" }}>
                                <div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>Cost saved / month</div>
                                <div data-testid="cost" style={{ fontSize: "20px", fontWeight: "800", marginTop: "2px" }}>{v.cost}</div>
                              </div>
                              <div style={{ ...mockCard, padding: "12px" }}>
                                <div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>Active automations</div>
                                <div data-testid="active-auto" style={{ fontSize: "20px", fontWeight: "800", marginTop: "2px" }}>{v.activeAutomations}{" / 4"}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {v.view === 4 && (
                          <div className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: "10px", height: "100%" }}>
                            <div style={{ ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                              <div style={{ fontWeight: "800", fontSize: "12.5px", paddingBottom: "4px" }}>AI Roadmap</div>
                              {v.roadSteps.map((st, idx) => (
                                <button key={idx} type="button" data-testid="road-step" onClick={st.pick} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "9px", border: "1px solid #F1EEF8", background: "#FCFBFF", fontFamily: "inherit", textAlign: "left", cursor: "pointer", width: "100%" }}>
                                  <span style={css(st.dotStyle)}>{st.n}</span>
                                  <span style={{ flex: "1", fontSize: "12px", fontWeight: "600", color: "#1A1433" }}>{st.label}</span>
                                  <span style={css(st.tagStyle)}>{st.status}</span>
                                </button>
                              ))}
                            </div>
                            <div style={{ background: "#15102A", borderRadius: "12px", padding: "14px", color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                              <div style={{ width: "124px", height: "124px", borderRadius: "50%", background: `conic-gradient(#A78BFA 0 ${v.roadPct}%, rgba(255,255,255,.1) ${v.roadPct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .4s" }}>
                                <div style={{ width: "94px", height: "94px", borderRadius: "50%", background: "#15102A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <span data-testid="ring" style={{ fontSize: "26px", fontWeight: "800" }}>{v.roadPct}{"%"}</span>
                                </div>
                              </div>
                              <span style={{ fontSize: "11.5px", color: "#C9C2E4" }}>Roadmap complete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-base" aria-hidden="true" style={{ position: "relative", height: "16px", margin: "0 -5%", background: "linear-gradient(#D9D6E3, #A9A5B8)", borderRadius: "0 0 16px 16px", boxShadow: "0 18px 30px -16px rgba(30,10,70,.5)" }}>
                <div style={{ width: "110px", height: "6px", margin: "0 auto", background: "#8E8A9E", borderRadius: "0 0 8px 8px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Curriculum ───────── */}
      <section id="curriculum" style={{ padding: "0 0 52px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1760px", margin: "0 auto", padding: "0 20px" }}>
          <div className="ceo-panel">
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ marginLeft: "8px" }}>
                <h2 className="ceo-h2" style={{ fontSize: "38px" }}>{"The Curriculum: What You'll Learn"}</h2>
                <span className="ceo-bar ceo-bar-light"></span>
              </div>
              <div className="ceo-cgrid">
                {CURRICULUM.map(([Ic, title, text]) => (
                  <div key={title} className="tcard ceo-ccard">
                    <Ic className="ceo-cicon" size={46} sw={1.5} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                      <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: "1.25" }}>{title}</span>
                      <span style={{ fontSize: "14px", lineHeight: "1.45", color: "#D9D3F0" }}>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Who / Outcomes / Programme at a Glance ───────── */}
      <section style={{ padding: "0 0 52px", background: "#FFFFFF" }}>
        <div className="wrap ceo-three">
          <div id="who" style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="ceo-h2" style={h2}>Who Should Attend?</h2>
              <span className="ceo-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {WHO.map((t) => (
                <div key={t} className="ceo-li">
                  <span className="ceo-check"><IcCheck size={14} sw={3.2} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="ceo-h2" style={h2}>Key Outcomes</h2>
              <span className="ceo-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "-12px" }}>
              {OUTCOMES.map((t) => (
                <div key={t} className="who" style={{ fontSize: "16.5px", gap: "14px" }}>
                  <IcCheckSwirl className="wicon" size={28} sw={1.7} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="ceo-h2" style={h2}>Programme at a Glance</h2>
              <span className="ceo-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {GLANCE.map(([Ic, label, value, small]) => (
                <div key={label} className="ceo-prog">
                  <Ic size={34} sw={1.6} />
                  <span>
                    <strong>{label}</strong>{" "}
                    {small ? <span style={{ display: "inline-block", verticalAlign: "top" }}>{value}<span className="ceo-small">{small}</span></span> : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Closing band ───────── */}
      <section style={{ padding: "0 0 40px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1760px", margin: "0 auto", padding: "0 20px" }}>
          <div className={"ceo-cta" + (ctaPhoto ? " ceo-cta-photo-on" : "")}>
            {ctaPhoto ? (
              <div className="ceo-cta-photo" aria-hidden="true" style={{ backgroundImage: "url(/ai-powered-ceo/cta-bg.jpg)" }}></div>
            ) : (
              <div className="ceo-cta-art" aria-hidden="true"><BuildingArt /></div>
            )}
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div className="ceo-cta-div" aria-hidden="true"></div>
            <div className="cta-row ceo-cta-inner">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "760px" }}>
                <h2 className="ceo-h2" style={{ lineHeight: "1.18" }}>
                  <span className="ceo-cta-big">The AI-Powered CEO:</span>{" "}
                  <span className="ceo-cta-small">How to Build a Smarter, Leaner &amp; More Profitable Business</span>
                </h2>
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#E2DCF5" }}>Join CEOs, founders and business leaders for a practical, expert-led masterclass on using AI to build a smarter, leaner business.</p>
              </div>
              <a className="btn btn-light" href="#register" style={{ height: "58px", padding: "0 30px", fontSize: "19px", flex: "none" }}>
                {"Register Now\n"}<Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
