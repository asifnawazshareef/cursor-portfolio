import { portfolioData } from "@/data/portfolio";
import { PortfolioData } from "@/types/portfolio";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");

function normalizePortfolio(payload: PortfolioData): PortfolioData {
  const navWithoutAdmin = payload.nav.filter((item) => item.href !== "/admin");
  const hasGithub = payload.contacts.some((item) => item.label === "GitHub");

  return {
    ...portfolioData,
    ...payload,
    resumeUrl: payload.resumeUrl || portfolioData.resumeUrl,
    nav: navWithoutAdmin,
    contacts: hasGithub
      ? payload.contacts
      : [...payload.contacts, { label: "GitHub", href: "https://github.com/asifnawazshareef" }],
  };
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(portfolioData, null, 2), "utf8");
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as PortfolioData;
  return normalizePortfolio(parsed);
}

export async function updatePortfolioData(payload: PortfolioData) {
  await ensureDataFile();
  const normalized = normalizePortfolio(payload);
  await fs.writeFile(DATA_FILE, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
