import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import BookkeepingMasterclass from "../../components/BookkeepingMasterclass";
import "./bb.css";

export const metadata: Metadata = {
  title: "Beyond Bookkeeping: How Accountants Can Become Strategic Business Advisers Using AI",
};

// Optional artwork, picked up at build/render time. When a file is missing nothing is rendered for it
// (hero) or the built-in building artwork is shown (closing band):
//   public/beyond-bookkeeping/hero-overlay.png (or .jpg) - photo layered over the hero gradient, behind the text and form card
//   public/beyond-bookkeeping/cta-bg.jpg       - left-side image of the closing band
const hasPublic = (file: string) => existsSync(path.join(process.cwd(), "public", "beyond-bookkeeping", file));

export default function Page() {
  return <BookkeepingMasterclass heroOverlay={["hero-overlay.png", "hero-overlay.jpg"].find(hasPublic) ?? null} ctaPhoto={hasPublic("cta-bg.jpg")} />;
}
