import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import ContractsMasterclass from "../../components/ContractsMasterclass";
import "./contracts.css";

export const metadata: Metadata = {
  title: "The Future of Contracts: Digital Signatures, Electronic Agreements & the Law",
};

// Optional real photos: drop public/contracts/hero-bg.jpg and/or public/contracts/cta-bg.jpg and rebuild.
// When a file is missing, the built-in SVG artwork is shown instead.
const hasPublic = (file: string) => existsSync(path.join(process.cwd(), "public", "contracts", file));

export default function Page() {
  return <ContractsMasterclass heroPhoto={hasPublic("hero-bg.jpg")} ctaPhoto={hasPublic("cta-bg.jpg")} />;
}
