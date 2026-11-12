import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import CeoMasterclass from "../../components/CeoMasterclass";
import "./ceo.css";

export const metadata: Metadata = {
  title: "The AI-Powered CEO: How to Build a Smarter, Leaner & More Profitable Business",
};

// Optional artwork, picked up at build/render time. When a file is missing nothing is rendered for it
// (hero) or the built-in building artwork is shown (closing band):
//   public/ai-powered-ceo/hero-overlay.png (or .jpg) - photo layered over the hero gradient, behind the text and form card
//   public/ai-powered-ceo/cta-bg.jpg                 - left-side image of the closing band
const hasPublic = (file: string) => existsSync(path.join(process.cwd(), "public", "ai-powered-ceo", file));

export default function Page() {
  return <CeoMasterclass heroOverlay={["hero-overlay.png", "hero-overlay.jpg"].find(hasPublic) ?? null} ctaPhoto={hasPublic("cta-bg.jpg")} />;
}
