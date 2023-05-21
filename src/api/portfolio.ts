import constants from "../constants";
import { axios } from "../external";
import { Portfolio } from "../interface";
import { apiResponseWrapper } from "../utils/apiResponseWrapper";

export const PortfolioApis = Object.freeze({
  getAll: apiResponseWrapper(async (): Promise<Portfolio[]> => {
    const { data } = await axios.get(constants.PORTFOLIO_GET_ALL);

    return data?.portfolios ?? [];
  }),
  get: apiResponseWrapper(async (id: string): Promise<Portfolio> => {
    const { data } = await axios.get(constants.PORTFOLIO_GET, {
      params: {
        id,
      },
    });

    return data;
  }),
  add: apiResponseWrapper(
    async (portfolio: Pick<Portfolio, "title" | "description">) => {
      await axios.post(constants.PORTFOLIO_ADD, portfolio);

      return "success";
    }
  ),
  delete: apiResponseWrapper(async (id: string) => {
    await axios.delete(constants.PORTFOLIO_DELETE, {
      params: {
        id,
      },
    });

    return "success";
  }),
});
