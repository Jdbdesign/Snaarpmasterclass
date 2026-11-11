"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { BuildingArt } from "./ContractsArt";
import CountrySelect from "./CountrySelect";
import EventCountdown from "./EventCountdown";
import { IcArrow, IcAward, IcCalendar, IcCheck, IcClock, IcLaptop, IcLayers, IcShieldCheck } from "./contractsIcons";
import { IcBarChart, IcCap, IcChipAI, IcGear, IcGroup, IcLaptopAI, IcTag, IcTarget, IcTools } from "./hrIcons";
import { useHrMasterclass } from "./useHrMasterclass";

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
  ["Overview", "#about"],
  ["Curriculum", "#curriculum"],
  ["Faculty", "#curriculum"],
  ["Who Should Attend", "#who"],
  ["Testimonials", "#why"],
  ["FAQ", "#register"],
];

const TRUST: [typeof IcAward, ReactNode][] = [
  [IcAward, <>MSBM Certificate<br />of Participation</>],
  [IcLaptop, <>Practical<br />HR Training</>],
  [IcGroup, <>Expert<br />HR Faculty</>],
  [IcLayers, <>Real-World<br />Use Cases</>],
  [IcBarChart, <>Tools, Templates<br />&amp; Resources</>],
];

const CURRICULUM: [typeof IcGroup, string, string][] = [
  [IcGroup, "The Evolving Role of HR", "How HR has shifted from administration to a strategic business partner."],
  [IcTarget, "Performance Management", "Setting goals, managing KPIs, conducting appraisals and improving performance."],
  [IcGear, "Workforce Productivity", "Practical strategies, tools and techniques to improve team and individual productivity."],
  [IcLaptopAI, "Digital HR Operations", "Streamlining recruitment, onboarding, leave, attendance, records and employee workflows."],
  [IcChipAI, "AI in HR", "How to use AI to save time, automate tasks and gain insights into your workforce."],
  [IcShieldCheck, "HR Compliance & Best Practice", "Key legal and regulatory requirements, policies and documentation for a compliant HR function."],
];

const WHY = [
  "Build a productive and engaged workforce.",
  "Set, track and improve employee performance.",
  "Digitalise core HR processes and reduce manual work.",
  "Use AI and data to make better people decisions.",
  "Stay compliant with HR policies and employment regulations.",
];

const WHO = [
  "HR Managers & HR Executives",
  "People & Culture Leaders",
  "Department Heads with people responsibilities",
  "Business Owners & Founders",
  "Anyone involved in managing or developing people",
];

const GAIN: [typeof IcCap, string][] = [
  [IcCap, "Practical, real-world HR strategies"],
  [IcTools, "Ready-to-use templates and frameworks"],
  [IcBarChart, "Ideas to improve performance and productivity"],
  [IcLaptop, "Insights into modern HR tools and AI"],
  [IcAward, "An MSBM Certificate of Participation"],
];

const h2: CSSProperties = { fontSize: "clamp(26px, 2.6vw, 36px)" };

const Arrow = ({ size = 22 }: { size?: number }) => <IcArrow size={size} sw={2.4} />;

export default function HrMasterclass({ heroOverlay = false, ctaPhoto = false }: { heroOverlay?: boolean; ctaPhoto?: boolean }) {
  const v = useHrMasterclass();

  return (
    <div id="top" style={{ fontFamily: FONT, color: "#1A1433", background: "#FFFFFF", width: "100%" }} data-label="Modern HR manager masterclass landing page">
      {/* ───────── Hero: blank navy-to-violet background; optional photo slot only ───────── */}
      <section className="hr-hero">
        {heroOverlay && <div className="hr-hero-overlay" aria-hidden="true" style={{ backgroundImage: "url(/hr/hero-overlay.png)" }}></div>}
        <div className="dots hr-hero-dots" aria-hidden="true"></div>
        <div className="wrap hr-hero-inner">
          <header className="hr-hdr" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "22px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <img src="/msbm-logo.png" alt="Metropolitan School of Business and Management UK" style={{ height: "48px", width: "auto", display: "block" }} />
              <div className="hide-sm" style={{ width: "1px", height: "44px", background: "rgba(255,255,255,.25)" }}></div>
              <div className="hide-sm hr-brand" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

          <div className="hr-hero-grid" style={{ padding: "34px 0 48px" }}>
            <div className="hr-hero-copy" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="hr-pill">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="m22 8-6 4 6 4V8Z"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                <span>Complimentary Online Masterclass</span>
              </div>
              <h1 className="h1 hr-h1" style={{ margin: "0", lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.035em" }}>
                {"The Modern "}<span className="hr-h1-hl">{"HR Manager:"}</span><br />
                {"Managing People,"}<br />
                {"Performance &"}<br />
                {"Productivity in the"}<br />
                <span className="hr-h1-last">{"Digital Age"}</span>
              </h1>
              <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.55", color: "#E4DEF7", maxWidth: "600px" }}>
                A practical, expert-led masterclass for HR managers and people leaders on building a high-performing, engaged and productive workforce using modern tools and AI.
              </p>
              <div className="metas" style={{ marginTop: "6px" }}>
                <div className="meta"><IcCalendar size={26} sw={1.6} style={{ color: "#FFFFFF" }} /><span style={{ fontSize: "16px", fontWeight: "600" }}>Sat, 21 Nov 2026</span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcLaptop size={28} sw={1.6} /><span style={{ fontSize: "13.5px", fontWeight: "600", lineHeight: "1.25" }}>Live Online<br /><span style={{ fontWeight: "500", color: "#D3CCEA" }}>(Zoom)</span></span></div>
                <div className="vline" style={{ height: "30px", background: "rgba(255,255,255,.25)" }}></div>
                <div className="meta"><IcClock size={26} sw={1.6} /><span style={{ fontSize: "16px", fontWeight: "600" }}>3 Hours</span></div>
              </div>
              <EventCountdown />
            </div>

            <div id="register" className="hr-card" style={{ background: "#FFFFFF", color: "#1A1433", borderRadius: "22px", padding: "28px 28px 22px", boxShadow: "0 40px 80px -30px rgba(0,0,0,.55)" }}>
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
                    <option value="">Your Role (e.g. HR Manager, People Lead) *</option>
                    <option>HR Manager / HR Executive</option>
                    <option>People &amp; Culture Leader</option>
                    <option>Department Head</option>
                    <option>Business Owner / Founder</option>
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
                  <div className="hr-shield-note">
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
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3B3456" }}>The Modern HR Manager Masterclass · Sat, 21 Nov 2026 · 3 Hours · Live Online (Zoom)</p>
                  <button className="btn btn-ghost" type="button" onClick={v.resetForm} style={{ height: "46px", width: "100%", fontSize: "15px", marginTop: "8px" }}>Register another person</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trust strip ───────── */}
      <section style={{ background: "#F5F3FD", borderBottom: "1px solid #ECE8F6" }}>
        <div className="wrap hr-trust-grid" style={{ paddingTop: "22px", paddingBottom: "22px" }}>
          {TRUST.map(([Ic, text], i) => (
            <Fragment key={i}>
              {i > 0 && <div className="vline"></div>}
              <div className="trust">
                <Ic className="ticon" size={42} sw={1.5} style={{ color: "#6D28D9" }} />
                <span className="hr-trust-text">{text}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ───────── About / Why This Training Matters ───────── */}
      <section id="about" style={{ padding: "56px 0 52px", background: "#FFFFFF" }}>
        <div className="wrap hr-about-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
            <div>
              <h2 className="hr-h2" style={{ fontSize: "40px" }}>About the Masterclass</h2>
              <span className="hr-bar"></span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "17px", lineHeight: "1.55" }}>
              The role of HR is more strategic than ever. This masterclass equips HR managers and people leaders with the skills, tools and practical strategies to manage people, drive performance and improve productivity in today&apos;s digital workplace.
            </p>
            <a className="btn btn-primary" href="#register" style={{ alignSelf: "flex-start", height: "56px", padding: "0 32px", fontSize: "18px", marginTop: "8px" }}>
              {"Register for Free Spot\n"}<Arrow />
            </a>
          </div>

          <div className="hr-about-line"></div>

          <div id="why" className="hr-why" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="hr-why-head">
              <div>
                <h2 className="hr-h2" style={{ fontSize: "40px" }}>Why This Training Matters</h2>
                <span className="hr-bar"></span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hr-why-art" src="/hr/team.svg" alt="" aria-hidden="true" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {WHY.map((t) => (
                <div key={t} className="hr-li">
                  <span className="hr-check"><IcCheck size={14} sw={3.2} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Curriculum ───────── */}
      <section id="curriculum" style={{ padding: "0 0 52px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1760px", margin: "0 auto", padding: "0 20px" }}>
          <div className="hr-panel">
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ marginLeft: "8px" }}>
                <h2 className="hr-h2" style={{ fontSize: "38px" }}>{"The Curriculum: What You'll Learn"}</h2>
                <span className="hr-bar hr-bar-light"></span>
              </div>
              <div className="hr-cgrid">
                {CURRICULUM.map(([Ic, title, text]) => (
                  <div key={title} className="tcard hr-ccard">
                    <Ic className="hr-cicon" size={46} sw={1.5} />
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

      {/* ───────── Who / Gain / Programme ───────── */}
      <section style={{ padding: "0 0 52px", background: "#FFFFFF" }}>
        <div className="wrap hr-three">
          <div id="who" style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="hr-h2" style={h2}>Who Should Attend?</h2>
              <span className="hr-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {WHO.map((t) => (
                <div key={t} className="hr-li">
                  <span className="hr-check"><IcCheck size={14} sw={3.2} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="hr-h2" style={h2}>What You&apos;ll Gain</h2>
              <span className="hr-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "-12px" }}>
              {GAIN.map(([Ic, t]) => (
                <div key={t} className="who" style={{ fontSize: "16.5px", gap: "14px" }}>
                  <Ic className="wicon" size={28} sw={1.7} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vline" style={{ height: "auto", background: "#ECE8F6" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div>
              <h2 className="hr-h2" style={h2}>Programme at a Glance</h2>
              <span className="hr-bar"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="hr-prog"><IcCalendar size={34} sw={1.6} /><span><strong>Date:</strong> Saturday, 21 Nov 2026</span></div>
              <div className="hr-prog"><IcClock size={34} sw={1.6} /><span><strong>Duration:</strong> 3 Hours</span></div>
              <div className="hr-prog"><IcLaptop size={34} sw={1.6} /><span><strong>Format:</strong> Live Online (Zoom)</span></div>
              <div className="hr-prog"><IcAward size={34} sw={1.6} /><span><strong>Certificate:</strong> MSBM Certificate of Participation</span></div>
              <div className="hr-prog"><IcTag size={34} sw={1.6} /><span><strong>Access:</strong>{" "}<span style={{ display: "inline-block", verticalAlign: "top" }}>Complimentary<span className="hr-small">(Registration Required)</span></span></span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Closing band ───────── */}
      <section style={{ padding: "0 0 40px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1760px", margin: "0 auto", padding: "0 20px" }}>
          <div className={"hr-cta" + (ctaPhoto ? " hr-cta-photo-on" : "")}>
            {ctaPhoto ? (
              <div className="hr-cta-photo" aria-hidden="true" style={{ backgroundImage: "url(/hr/cta-bg.jpg)" }}></div>
            ) : (
              <div className="hr-cta-art" aria-hidden="true"><BuildingArt /></div>
            )}
            <div className="dots" aria-hidden="true" style={{ position: "absolute", inset: "0" }}></div>
            <div className="hr-cta-div" aria-hidden="true"></div>
            <div className="cta-row hr-cta-inner">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "700px" }}>
                <h2 className="hr-h2" style={{ fontSize: "38px" }}>Reserve Your Free Place Today</h2>
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#E2DCF5" }}>Join HR professionals and people leaders for a practical, insightful and highly relevant masterclass.</p>
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
