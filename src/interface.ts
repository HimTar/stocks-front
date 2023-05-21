export type Portfolio = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  stocks?: Stock[];
};

export type Stock = {
  _id: string;
  title: string;
  code?: string;
  portfolioId: string;
  currentPrice: number;
  history: PurchaseHistory[];
  createdAt: string;
  updatedAt: string;
};

export type PurchaseHistory = {
  price: number;
  quantity: number;
  date: Date;
  action: "BUY" | "SELL";
};

export type ApiResponse = {
  isError: boolean;
  data: unknown;
  error?: unknown;
};

export type GainLossStatus = "GAIN" | "LOSS";
export type BuySellAction = "BUY" | "SELL";

export type StockAnalysis = {
  investedAmount: number;
  quantity: number;
  avgBuyPrice: number;
  currentAmount: number;
  gainLossAmount: number;
  gainLossPercentage: number;
  status: GainLossStatus;
  fullTerm: {
    totalPurchase: number;
    totalSale: number;
    gainLossAmount: number;
    status: GainLossStatus;
  };
};

export type PortfolioAnalysis = {
  status: GainLossStatus;
  stockAnalysis: {
    stockId: string;
    analysis: StockAnalysis;
  }[];
  gainLossAmount: number;
  gainLossPercentage: number;
  investedAmount: number;
  currentAmount: number;
};

export type StringMap = Record<string, string>;
export type StringUnknownMap = Record<string, unknown>;
