import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import HrMasterclass from "../../components/HrMasterclass";
import "./hr.css";

export const metadata: Metadata = {
  title: "The Modern HR Manager: Managing People, Performance & Productivity in the Digital Age",
};

// Optional artwork, picked up at build/render time. When a file is missing nothing is rendered for it
// (hero) or the built-in building artwork is shown (closing band):
//   public/hr/hero-overlay.png  - photo layered over the hero gradient, behind the text and form card
//   public/hr/cta-bg.jpg        - left-side image of the closing band
const hasPublic = (file: string) => existsSync(path.join(process.cwd(), "public", "hr", file));

export default function Page() {
  return <HrMasterclass heroOverlay={hasPublic("hero-overlay.png")} ctaPhoto={hasPublic("cta-bg.jpg")} />;
}
