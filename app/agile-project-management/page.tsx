import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import AgileMasterclass from "../../components/AgileMasterclass";
import "./agile.css";

export const metadata: Metadata = {
  title: "The Agile Project Management Masterclass: Scrum, Kanban & Modern Delivery Methods",
};

// Optional artwork, picked up at build/render time. When a file is missing nothing is rendered for it
// (hero) or the built-in building artwork is shown (closing band):
//   public/agile/hero-overlay.png (or .jpg) - photo layered over the hero gradient, behind the text and form card
//   public/agile/cta-bg.jpg        - left-side image of the closing band
const hasPublic = (file: string) => existsSync(path.join(process.cwd(), "public", "agile", file));

export default function Page() {
  return <AgileMasterclass heroOverlay={["hero-overlay.png", "hero-overlay.jpg"].find(hasPublic) ?? null} ctaPhoto={hasPublic("cta-bg.jpg")} />;
}
