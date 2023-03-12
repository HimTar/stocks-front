import constants from "../constants";
import { axios } from "../external";
import { Stock } from "../interface";
import { apiResponseWrapper } from "../utils/apiResponseWrapper";

export const StockApis = Object.freeze({
  getAll: apiResponseWrapper(async (): Promise<Stock[]> => {
    const { data } = await axios.get(constants.STOCK_GET_ALL);

    return data?.stocks ?? [];
  }),
  getByPortfolioId: apiResponseWrapper(
    async (portfolioId: string): Promise<Stock> => {
      const { data } = await axios.get(constants.STOCK_GET, {
        params: {
          portfolioId,
        },
      });

      return data?.stocks ?? [];
    }
  ),
  add: apiResponseWrapper(
    async (
      Stock: Pick<
        Stock,
        "title" | "code" | "currentPrice" | "history" | "portfolioId"
      >
    ) => {
      await axios.post(constants.STOCK_ADD, Stock);

      return "success";
    }
  ),
  update: apiResponseWrapper(
    async (
      stock: Pick<
        Stock,
        "title" | "code" | "currentPrice" | "history" | "portfolioId" | "_id"
      >
    ) => {
      await axios.post(constants.STOCK_UPDATE, stock);

      return "success";
    }
  ),
  delete: apiResponseWrapper(async (id: string) => {
    await axios.delete(constants.STOCK_DELETE, {
      params: {
        id,
      },
    });

    return "success";
  }),
});
