import { PortfolioAnalysis, Stock, StockAnalysis } from "../interface";
import { filterPurchaseHistoryByDate } from "./filter";

/**
 * Note : Short term analysis gives insight on current holdings
 * Full term analysis gives overall insight on the stock by its history of transactions
 */
export const CalculateStockAnalysis = (stock: Stock): StockAnalysis => {
  const { currentPrice } = stock;
  let shortTermAmount = 0;
  const fullTermAmount = {
    buy: 0,
    sell: 0,
  };
  let quantity = 0;

  // Reverse the transaction list for oldest transaction first
  stock.history.sort(filterPurchaseHistoryByDate).map((purchaseHistory) => {
    if (purchaseHistory.action === "BUY") {
      // Increase stock quantity
      quantity += purchaseHistory.quantity;

      // Increase amount
      shortTermAmount += purchaseHistory.price * purchaseHistory.quantity;
      fullTermAmount.buy += purchaseHistory.price * purchaseHistory.quantity;
    } else {
      const avgBuyPrice = shortTermAmount / quantity;

      // Short term amount is not dependent on sell price.
      shortTermAmount -= avgBuyPrice * purchaseHistory.quantity;

      // Full term amount is dependent on sell price
      fullTermAmount.sell += purchaseHistory.price * purchaseHistory.quantity;

      quantity -= purchaseHistory.quantity;
    }
  });

  // Average buy price of current holdings
  const avgBuyPrice = shortTermAmount / quantity;

  const currentAmount = quantity * currentPrice;
  const gainLossAmount = shortTermAmount - currentAmount;
  const status = currentAmount >= shortTermAmount ? "GAIN" : "LOSS";
  const fullTermGainLossAmount =
    fullTermAmount.buy - fullTermAmount.sell - currentAmount;
  const fullTermStatus = fullTermGainLossAmount >= 0 ? "GAIN" : "LOSS";

  const analysis: StockAnalysis = {
    investedAmount: shortTermAmount,
    quantity,
    avgBuyPrice,
    currentAmount,
    gainLossAmount: Math.abs(gainLossAmount),
    gainLossPercentage: Math.abs((gainLossAmount * 100) / shortTermAmount),
    status,
    fullTerm: {
      totalPurchase: fullTermAmount.buy,
      totalSale: fullTermAmount.sell,
      gainLossAmount: Math.abs(fullTermGainLossAmount),
      status: fullTermStatus,
    },
  };

  return analysis;
};

export const CalculatePortfolioAnalysis = (
  stocks: Stock[]
): PortfolioAnalysis => {
  const portfolioAnalysis: PortfolioAnalysis = {
    stockAnalysis: [],
    status: "GAIN",
    currentAmount: 0,
    investedAmount: 0,
    gainLossAmount: 0,
    gainLossPercentage: 0,
  };

  // Calculate stock analysis for all stocks in portfolio
  stocks.map((stock) => {
    portfolioAnalysis.stockAnalysis.push({
      stockId: stock._id,
      analysis: CalculateStockAnalysis(stock),
    });
  });

  // Calculate overall portfolio analysis
  let investedAmount = 0;
  let currentAmount = 0;

  portfolioAnalysis.stockAnalysis.map((stock) => {
    investedAmount += stock.analysis.investedAmount;
    currentAmount += stock.analysis.currentAmount;
  });

  const gainLossAmount = currentAmount - investedAmount;
  const gainLossPercentage = gainLossAmount
    ? Math.abs((gainLossAmount * 100) / investedAmount)
    : 0;
  const status = gainLossAmount >= 0 ? "GAIN" : "LOSS";

  return {
    ...portfolioAnalysis,
    status,
    investedAmount,
    currentAmount,
    gainLossAmount,
    gainLossPercentage,
  };
};
