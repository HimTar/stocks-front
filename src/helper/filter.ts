import { PurchaseHistory } from "../interface";

export const filterPurchaseHistoryByDate = (
  a: PurchaseHistory,
  b: PurchaseHistory
) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
};
