"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { BuildingArt, HeroArt } from "./ContractsArt";
import ContractsCountdown from "./ContractsCountdown";
import CountrySelect from "./CountrySelect";
import {
  IcArrow, IcAward, IcBars, IcCalendar, IcCheck, IcClipboard, IcClock, IcDoc, IcFileSign, IcGavel, IcHome, IcLaptop,
  IcLayers, IcList, IcPen, IcScales, IcScreenPlay, IcSearch, IcShield, IcShieldCheck, IcUsers,
} from "./contractsIcons";
import { css } from "./useMasterclass";
import { SIDE_LABELS, useContractsMasterclass } from "./useContractsMasterclass";

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const SNAARP_MARK =
  "M8.61133 28.6036L8.63719 28.5944C8.77487 28.5439 8.80308 28.4942 8.96087 28.447C10.0143 28.1324 11.0738 27.8359 12.1301 27.5328L19.4771 25.3935C21.0189 24.9266 22.5656 24.4766 24.117 24.0437C24.6559 23.8931 25.2907 23.6593 25.8303 23.5586C25.8444 25.1 25.8481 26.6414 25.8417 28.1829L25.841 36.1356L25.8405 39.2371C25.8404 39.5672 25.8671 40.8119 25.7909 41.0597C25.6362 40.9835 25.2843 40.7154 25.1313 40.6051L23.7475 39.5995L21.0798 37.6738C20.6595 37.3704 20.0236 36.9407 19.6451 36.6248C19.2387 37.2238 18.852 37.7352 18.5189 38.3815C14.1072 46.9432 21.5945 56.5317 30.805 54.5879C37.402 53.1954 38.588 45.6242 40.146 40.0795C42.1905 32.9224 46.527 26.5972 54.1328 25.1408C59.0688 24.163 64.1841 25.2356 68.338 28.1193C72.2775 30.8767 75.1646 35.2946 76.0206 40.0932C76.9272 45.0635 75.8308 50.196 72.9784 54.3353C72.8437 54.5327 72.6996 54.7207 72.5965 54.9358C72.966 55.2422 73.4306 55.5629 73.8244 55.8484L75.9324 57.3813C76.4465 57.7523 77.1058 58.2138 77.5885 58.6229C76.8678 58.7539 75.9887 59.0753 75.2714 59.2758C74.6379 59.453 74.0185 59.6405 73.3894 59.8254L64.3709 62.4326C63.1866 62.7693 61.4533 63.3528 60.2964 63.5889C60.2425 60.3427 60.2875 56.9603 60.2879 53.705L60.2882 48.8545C60.2882 48.5217 60.2545 46.2383 60.3383 46.0768C60.7264 46.3264 61.2332 46.7168 61.6212 46.9957L64.8235 49.3237C65.2318 49.6173 66.0864 50.2609 66.5109 50.4808C68.2611 48.2511 69.1796 45.265 68.8626 42.4179C68.5347 39.3809 67.0122 36.6084 64.6419 34.7324C60.5639 31.4481 53.6768 31.3079 50.3553 35.8166C46.7561 40.6057 46.7488 46.7318 44.097 52.0414C41.2546 57.7324 37.4325 61.2707 31.1013 62.1821C22.0353 63.4873 13.3968 58.0695 10.6465 49.168C10.3286 48.1391 10.0713 47.0562 9.94354 45.9885C9.33425 41.1013 10.6378 36.1663 13.573 32.2483C13.2164 31.9376 8.78307 28.6924 8.61133 28.6447V28.6036Z";

const SnaarpMark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 89 89" fill="none" aria-hidden="true" style={{ display: "block", flex: "none" }}>
    <rect width="88.9809" height="88.9809" rx="20.0925" fill="#7C3AED"></rect>
    <path d={SNAARP_MARK} fill="#FFFFFF"></path>
  </svg>
);

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
  [IcLaptop, <>Practical<br />Live Training</>],
  [IcScales, <>Legal &amp;<br />Regulatory Insights</>],
  [IcLayers, <>Real-World<br />Use Cases</>],
  [IcUsers, <>For Legal, HR<br />and Business Teams</>],
];

const CURRICULUM: [typeof IcScales, string, string][] = [
  [IcScales, "The Legal Validity of E-Signatures", "Key legal principles and when electronic signatures are recognised and enforceable."],
  [IcLayers, "Types of Electronic Signatures", "Simple, advanced and qualified e-signatures, and when to use each."],
  [IcDoc, "Electronic Contracts in Practice", "Creating and managing employment contracts, NDAs, service agreements and other key documents."],
  [IcShieldCheck, "Preventing Signature Denial", "Identity verification, consent, timestamps, document integrity and audit trails."],
  [IcGavel, "Disputes and Enforceability", "What happens when a contract is disputed, alleged as fraudulent or denied, and how to defend it."],
  [IcScreenPlay, "Live Demonstration & Next Steps", "A practical walkthrough of creating, sending, signing, tracking and storing a digital agreement."],
];

const WHY = [
  "Gain clarity on the legal status of digital signatures and contracts.",
  "Learn how to implement secure, compliant and enforceable digital agreements.",
  "Reduce contract turnaround time and costs.",
  "Minimise the risk of disputes and fraud.",
  "Get practical knowledge you can apply immediately.",
];

const WHO: [typeof IcUsers, string][] = [
  [IcUsers, "Lawyers & Legal Practitioners"],
  [IcUsers, "HR Managers & HR Executives"],
  [IcUsers, "Compliance & Risk Officers"],
  [IcUsers, "CEOs, Founders & Business Owners"],
  [IcClipboard, "Contract & Administration Teams"],
  [IcFileSign, "Anyone involved in creating, signing or managing agreements"],
];

const SIDE_ICONS = [IcHome, IcList, IcPen, IcShield, IcBars];

const h2: CSSProperties = { fontSize: "clamp(26px, 2.6vw, 36px)" };
const mockCard: CSSProperties = { background: "#FFFFFF", border: "1px solid #ECE9F5", borderRadius: "12px" };

const Arrow = ({ size = 22 }: { size?: number }) => <IcArrow size={size} sw={2.4} />;

export default function ContractsMasterclass({ heroPhoto = false, ctaPhoto = false }: { heroPhoto?: boolean; ctaPhoto?: boolean }) {
  const v = useContractsMasterclass();

  return (
    <div id="top" style={{ fontFamily: FONT, color: "#1A1433", background: "#FFFFFF", width: "100%" }} data-label="Digital contracts masterclass landing page">
      {/* ───────── Hero ───────── */}
      <section className="dc-hero">
        {heroPhoto ? (
          <>
            <div className="dc-hero-photo" aria-hidden="true" style={{ backgroundImage: "url(/contracts/hero-bg.jpg)", backgroundPosition: "center", opacity: 0.14, WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 55%)", maskImage: "linear-gradient(to right, transparent 0%, #000 55%)" }}></div>
          </>
        ) : (
          <div className="dc-hero-art" aria-hidden="true"><HeroArt /></div>
        )}
        <div className="dots" style={{ position: "absolute", inset: "0", pointerEvents: "none" }} aria-hidden="true"></div>
        <div className="wrap" style={{ position: "relative" }}>
          <header className="dc-hdr" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "22px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <img src="/msbm-logo.png" alt="Metropolitan School of Business and Management UK" style={{ height: "48px", width: "auto", display: "block" }} />
              <div className="hide-sm" style={{ width: "1px", height: "44px", background: "rgba(255,255,255,.25)" }}></div>
              <div className="hide-sm dc-brand" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

          <div className="hero-grid" style={{ padding: "34px 0 48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="dc-pill">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="m22 8-6 4 6 4V8Z"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                <span>Complimentary Online Masterclass</span>
              </div>
              <h1 className="h1 dc-h1" style={{ margin: "0", lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.035em" }}>
                {"The "}<span style={{ color: "#D5C6FF" }}>Future</span>{" of Contracts:"}<br />
                {"Digital Signatures,"}<br />
                {"Electronic Agreements"}<br />
                <span className="dc-h1-last">{"& the Law"}</span>
              </h1>
              <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.55", color: "#E4DEF7", maxWidth: "600px" }}>
                A practical, expert-led training on the legal validity, enforceability and real-world use of electronic signatures and digital contracts.
              </p>
              <div className="metas" style={{ marginTop: "6px" }}>
                <div className="meta"><IcCalendar size={26} sw={1.6} style={{ color: "#FFFFFF" }} /><span style={{ fontSize: "16px", fontWeight: "600" }}>Fri, 20 Nov 2026</span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcLaptop size={28} sw={1.6} /><span style={{ fontSize: "13.5px", fontWeight: "600", lineHeight: "1.25" }}>Live Online<br /><span style={{ fontWeight: "500", color: "#D3CCEA" }}>(Zoom)</span></span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcClock size={26} sw={1.6} /><span style={{ fontSize: "16px", fontWeight: "600" }}>3 Hours</span></div>
              </div>
              <ContractsCountdown />
            </div>

            <div id="register" style={{ background: "#FFFFFF", color: "#1A1433", borderRadius: "22px", padding: "28px 28px 22px", boxShadow: "0 40px 80px -30px rgba(0,0,0,.55)" }}>
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
                  <select className="inp" aria-label="I am a ..." onChange={v.onRole}>
                    <option value="">I am a ... *</option>
                    <option>Lawyer / Legal Practitioner</option>
                    <option>HR Manager / HR Executive</option>
                    <option>Compliance / Risk Officer</option>
                    <option>CEO / Founder / Business Owner</option>
                    <option>Contract / Administration Team</option>
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
                  <div className="dc-shield-note">
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
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3B3456" }}>The Future of Contracts Masterclass · Fri, 20 Nov 2026 · 3 Hours · Live Online (Zoom)</p>
                  <button className="btn btn-ghost" type="button" onClick={v.resetForm} style={{ height: "46px", width: "100%", fontSize: "15px", marginTop: "8px" }}>Register another person</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trust strip ───────── */}
      <section style={{ background: "#F5F3FD", borderBottom: "1px solid #ECE8F6" }}>
        <div className="wrap dc-trust-grid" style={{ paddingTop: "22px", paddingBottom: "22px" }}>
          {TRUST.map(([Ic, text], i) => (
            <Fragment key={i}>
              {i > 0 && <div className="vline"></div>}
              <div className="trust">
                <Ic className="ticon" size={42} sw={1.5} style={{ color: "#6D28D9" }} />
                <span className="dc-trust-text">{text}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section id="about" style={{ padding: "56px 0 52px", background: "#FFFFFF" }}>
        <div className="wrap dc-about-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
            <div>
              <h2 className="dc-h2" style={{ fontSize: "40px" }}>About the Masterclass</h2>
              <span className="dc-bar"></span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "17px", lineHeight: "1.55" }}>
              A practical, expert-led online training for legal practitioners, HR professionals, business leaders and contract administrators on how to create, sign, manage and enforce digital agreements with confidence.
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55" }}>
              The masterclass combines legal insights, real-world use cases and a live demonstration to help you understand how electronic signatures work, when they are legally valid and how to prevent disputes, fraud and signature denial.
            </p>
            <a className="btn btn-primary" href="#register" style={{ alignSelf: "flex-start", height: "56px", padding: "0 32px", fontSize: "18px", marginTop: "8px" }}>
              {"Register for Free Spot\n"}<Arrow />
            </a>
          </div>

          {/* Interactive Snaarp dashboard, in the laptop's place */}
          <div className="dc-mock-panel">
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
                        <span style={{ fontSize: "15px", fontWeight: "800", color: "#1A1433" }}>{v.viewTitle}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "28px", padding: "0 10px", borderRadius: "8px", background: "#F4F2FA", color: "#6B6585", fontSize: "11px", width: "140px" }}>
                          <IcSearch size={13} sw={2} />Search
                        </div>
                      </div>
                      <div style={{ flex: "1", minHeight: "0", padding: "14px 16px", overflow: "hidden" }}>
                        {v.view === 0 && (
                          <div className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: "10px", height: "100%" }}>
                            <div style={{ ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                              <div style={{ fontWeight: "800", fontSize: "12.5px", paddingBottom: "4px" }}>Contract readiness checklist</div>
                              {v.planSteps.map((st, idx) => (
                                <button key={idx} type="button" onClick={st.pick} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "9px", border: "1px solid #F1EEF8", background: "#FCFBFF", fontFamily: "inherit", textAlign: "left", cursor: "pointer", width: "100%" }}>
                                  <span style={css(st.dotStyle)}>{st.n}</span>
                                  <span style={{ flex: "1", fontSize: "12px", fontWeight: "600", color: "#1A1433" }}>{st.label}</span>
                                  <span style={css(st.tagStyle)}>{st.status}</span>
                                </button>
                              ))}
                            </div>
                            <div style={{ background: "#15102A", borderRadius: "12px", padding: "14px", color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                              <div style={{ width: "124px", height: "124px", borderRadius: "50%", background: `conic-gradient(#A78BFA 0 ${v.planPct}%, rgba(255,255,255,.1) ${v.planPct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .4s" }}>
                                <div style={{ width: "94px", height: "94px", borderRadius: "50%", background: "#15102A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <span style={{ fontSize: "26px", fontWeight: "800" }}>{v.planPct}{"%"}</span>
                                </div>
                              </div>
                              <span style={{ fontSize: "11.5px", color: "#C9C2E4" }}>Readiness complete</span>
                            </div>
                          </div>
                        )}

                        {v.view === 1 && (
                          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", background: "#15102A", color: "#FFFFFF", flex: "1", minWidth: "0" }}>
                                <IcPen size={16} sw={2} style={{ color: "#A78BFA" }} />
                                <span style={{ fontSize: "11.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  <strong>e-signed contracts: 1,247</strong>{" "}<span style={{ color: "#B9B2D3" }}>{"· "}{v.signedCount}{" signed this week"}</span>
                                </span>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <button type="button" className={v.chips.all.cls} onClick={v.chips.all.pick}>All</button>
                                <button type="button" className={v.chips.signed.cls} onClick={v.chips.signed.pick}>Signed</button>
                                <button type="button" className={v.chips.pending.cls} onClick={v.chips.pending.pick}>Pending</button>
                              </div>
                            </div>
                            <div style={{ flex: "1", minHeight: "0", ...mockCard, overflow: "hidden" }}>
                              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.2fr) 96px", gap: "10px", padding: "9px 12px", background: "#FAF9FD", fontSize: "10px", fontWeight: "700", letterSpacing: ".06em", color: "#6B6585" }}>
                                <span>DOCUMENT</span><span>SIGNATURES</span><span></span>
                              </div>
                              {v.docs.map((d) => (
                                <div key={d.id} className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.2fr) 96px", gap: "10px", padding: "8px 12px", borderTop: "1px solid #F1EEF8", alignItems: "center" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                                    <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: d.tile[0], color: d.tile[1], fontWeight: "800", fontSize: "10.5px", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{d.ini}</span>
                                    <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                                      <span style={{ fontWeight: "700", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
                                      <span style={{ fontSize: "10.5px", color: "#6B6585", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.who}</span>
                                    </span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#F1EEF8", overflow: "hidden" }}>
                                      <div style={{ height: "100%", borderRadius: "3px", width: `${d.pct}%`, background: d.color }}></div>
                                    </div>
                                    <span style={{ fontSize: "11px", fontWeight: "800", width: "30px" }}>{d.pct}{"%"}</span>
                                  </div>
                                  <button type="button" className={d.btnCls} onClick={d.toggle}>{d.btnLabel}</button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {v.view === 2 && (
                          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px" }}>
                              <div style={{ ...mockCard, borderRadius: "11px", padding: "10px 12px" }}><div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>In flight</div><div style={{ fontSize: "19px", fontWeight: "800", marginTop: "2px" }}>228</div></div>
                              <div style={{ background: "#EDE9FE", border: "1px solid #DDD6FE", borderRadius: "11px", padding: "10px 12px" }}><div style={{ fontSize: "10.5px", color: "#5B21B6", fontWeight: "600" }}>Awaiting signature</div><div style={{ fontSize: "19px", fontWeight: "800", marginTop: "2px" }}>132</div></div>
                              <div style={{ ...mockCard, borderRadius: "11px", padding: "10px 12px" }}><div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>Signed</div><div style={{ fontSize: "19px", fontWeight: "800", marginTop: "2px" }}>160</div></div>
                            </div>
                            <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "10px" }}>
                              <div style={{ ...mockCard, padding: "10px", display: "flex", flexDirection: "column", gap: "1px", overflow: "hidden" }}>
                                <div style={{ fontWeight: "800", fontSize: "12px", padding: "0 4px 4px" }}>Stages</div>
                                {v.stages.map((st, idx) => (
                                  <button key={idx} type="button" className={st.cls} onClick={st.pick} aria-pressed={st.cls.includes("is-active")}>
                                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", width: "100%" }}>
                                      <span style={{ fontWeight: "700", color: "#1A1433" }}>{st.name}</span>
                                      <span style={{ color: "#3B3456", fontWeight: "600" }}>{st.count}</span>
                                    </span>
                                    <span style={{ height: "5px", borderRadius: "3px", background: "#F1EEF8", width: "100%", display: "block" }}>
                                      <span style={{ display: "block", height: "100%", borderRadius: "3px", width: `${st.pct}%`, background: st.color }}></span>
                                    </span>
                                  </button>
                                ))}
                              </div>
                              <div style={{ ...mockCard, padding: "10px 12px", display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                                <div style={{ fontWeight: "800", fontSize: "12px" }}>{v.stageName}</div>
                                {v.stageDocs.map((d, idx) => (
                                  <div key={v.stageName + idx} className="fade" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", fontSize: "11.5px", padding: "7px 9px", borderRadius: "8px", background: "#FAF9FD" }}>
                                    <span style={{ fontWeight: "600", minWidth: "0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
                                    <span style={{ fontWeight: "800", color: "#5B21B6", flex: "none", fontSize: "10.5px" }}>{d.meta}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {v.view === 3 && (
                          <div className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: "10px", height: "100%" }}>
                            <div style={{ ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div style={{ fontWeight: "800", fontSize: "12.5px" }}>Evidence safeguards</div>
                              {v.trail.map((t, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "10px", border: "1px solid #F1EEF8", background: "#FCFBFF" }}>
                                  <span style={{ width: "40px", fontSize: "10.5px", fontWeight: "800", color: "#6D28D9" }}>{t.n}</span>
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
                                <div style={{ fontSize: "10.5px", color: "#B9B2D3", fontWeight: "600" }}>Evidence strength</div>
                                <div style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em", marginTop: "2px" }}>{v.strength}{"%"}</div>
                                <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.12)", marginTop: "8px", overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: `${v.strength}%`, background: "#A78BFA", borderRadius: "3px", transition: "width .4s" }}></div>
                                </div>
                              </div>
                              <div style={{ ...mockCard, padding: "12px" }}>
                                <div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>Disputes avoided</div>
                                <div style={{ fontSize: "20px", fontWeight: "800", marginTop: "2px" }}>{v.disputesAvoided}</div>
                              </div>
                              <div style={{ ...mockCard, padding: "12px" }}>
                                <div style={{ fontSize: "10.5px", color: "#6B6585", fontWeight: "600" }}>Active safeguards</div>
                                <div style={{ fontSize: "20px", fontWeight: "800", marginTop: "2px" }}>{v.activeSafeguards}{" / 4"}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {v.view === 4 && (
                          <div className="fade" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "10px", height: "100%" }}>
                            <div style={{ ...mockCard, padding: "12px 14px", display: "flex", flexDirection: "column" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                                <span style={{ fontWeight: "800" }}>Signed contracts</span>
                                <span style={{ color: "#5B21B6", fontWeight: "800" }}>{v.barLabel}</span>
                              </div>
                              <div style={{ flex: "1", minHeight: "0", display: "flex", gap: "8px", alignItems: "flex-end", paddingTop: "10px" }}>
                                {v.bars.map((br, idx) => (
                                  <div key={idx} className={br.cls} onMouseEnter={br.hover} onClick={br.hover}>
                                    <div className="col" style={{ height: `${br.h}%` }}></div>
                                    <span style={{ fontSize: "10px", color: "#6B6585", fontWeight: "600" }}>{br.m}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ background: "#FFFFFF", border: "1px solid #E4DCFB", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                              <div style={{ background: "#15102A", padding: "12px", display: "flex", justifyContent: "center" }}>
                                <img src="/msbm-logo.png" alt="Metropolitan School of Business and Management UK" style={{ height: "34px", width: "auto" }} />
                              </div>
                              <div style={{ flex: "1", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "5px" }}>
                                <span style={{ fontSize: "9.5px", fontWeight: "700", letterSpacing: ".14em", color: "#6D28D9" }}>CERTIFICATE</span>
                                <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>{v.certName}</span>
                                <span style={{ fontSize: "10.5px", color: "#6B6585", lineHeight: "1.45" }}>The Future of Contracts Masterclass<br />Metropolitan School of Business and Management UK</span>
                              </div>
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
          <div className="dc-panel">
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ marginLeft: "8px" }}>
                <h2 className="dc-h2" style={{ fontSize: "38px" }}>{"The Curriculum: What You'll Learn"}</h2>
                <span className="dc-bar dc-bar-light"></span>
              </div>
              <div className="dc-cgrid">
                {CURRICULUM.map(([Ic, title, text]) => (
                  <div key={title} className="tcard dc-ccard">
                    <Ic className="dc-cicon" size={46} sw={1.5} />
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

      {/* ───────── Why / Who / Programme ───────── */}
      <section style={{ padding: "0 0 52px", background: "#FFFFFF" }}>
        <div className="wrap dc-three">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="dc-h2" style={h2}>Why You Should Attend</h2>
              <span className="dc-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {WHY.map((t) => (
                <div key={t} className="dc-li">
                  <span className="dc-check"><IcCheck size={14} sw={3.2} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div id="who" style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="dc-h2" style={h2}>Who Should Attend</h2>
              <span className="dc-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "-12px" }}>
              {WHO.map(([Ic, t]) => (
                <div key={t} className="who" style={{ fontSize: "16.5px", gap: "14px" }}>
                  <Ic className="wicon" size={26} sw={1.8} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="dc-h2" style={h2}>Programme at a Glance</h2>
              <span className="dc-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="dc-prog"><IcCalendar size={34} sw={1.6} /><span><strong>Date:</strong> Friday, 20 Nov 2026</span></div>
              <div className="dc-prog"><IcClock size={34} sw={1.6} /><span><strong>Duration:</strong> 3 Hours</span></div>
              <div className="dc-prog"><IcLaptop size={34} sw={1.6} /><span><strong>Format:</strong> Live Online (Zoom)</span></div>
              <div className="dc-prog"><IcAward size={34} sw={1.6} /><span><strong>Certificate:</strong> MSBM Certificate of Participation</span></div>
              <div className="dc-prog"><IcLayers size={34} sw={1.6} /><span><strong>Access:</strong>{" "}<span style={{ display: "inline-block", verticalAlign: "top" }}>Complimentary<span className="dc-small">(Registration Required)</span></span></span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Closing band ───────── */}
      <section style={{ padding: "0 0 40px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1760px", margin: "0 auto", padding: "0 20px" }}>
          <div className={"dc-cta" + (ctaPhoto ? " dc-cta-wide" : "")}>
            {ctaPhoto ? (
              <div className="dc-cta-overlay" aria-hidden="true" style={{ backgroundImage: "url(/contracts/cta-bg.jpg)", opacity: 0.2, WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 55%)", maskImage: "linear-gradient(to right, transparent 0%, #000 55%)" }}></div>
            ) : (
              <div className="dc-cta-art" aria-hidden="true"><BuildingArt /></div>
            )}
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div className="cta-row dc-cta-inner">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "700px" }}>
                <h2 className="dc-h2" style={{ fontSize: "38px" }}>Reserve Your Free Place Today</h2>
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#E2DCF5" }}>Join legal, HR and business professionals for a practical, expert-led masterclass on digital contracts and e-signatures.</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                <div className="vline hide-sm" style={{ height: "64px", background: "rgba(255,255,255,.3)" }}></div>
                <a className="btn btn-light" href="#register" style={{ height: "58px", padding: "0 30px", fontSize: "19px", flex: "none" }}>
                  {"Register Now\n"}<Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
