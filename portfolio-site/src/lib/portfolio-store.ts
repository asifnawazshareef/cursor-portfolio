import { portfolioData } from "@/data/portfolio";
import { PortfolioData } from "@/types/portfolio";

let editablePortfolio: PortfolioData = structuredClone(portfolioData);

export function getPortfolioData() {
  return editablePortfolio;
}

export function updatePortfolioData(payload: PortfolioData) {
  editablePortfolio = payload;
  return editablePortfolio;
}
