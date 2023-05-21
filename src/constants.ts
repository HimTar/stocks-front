const BASE_URL = "https://api-stocks.onrender.com";
// const BASE_URL = "http://localhost:4000";

const PORTFOLIO_PREFIX = "/portfolio";
const STOCK_PREFIX = "/stock";

export default Object.freeze({
  BASE_URL,
  PORTFOLIO_GET_ALL: `${PORTFOLIO_PREFIX}/get-all`,
  PORTFOLIO_GET: `${PORTFOLIO_PREFIX}/get`,
  PORTFOLIO_ADD: `${PORTFOLIO_PREFIX}/add`,
  PORTFOLIO_DELETE: `${PORTFOLIO_PREFIX}/delete`,
  STOCK_GET_ALL: `${STOCK_PREFIX}/get-all`,
  STOCK_GET: `${STOCK_PREFIX}/get`,
  STOCK_ADD: `${STOCK_PREFIX}/add`,
  STOCK_DELETE: `${STOCK_PREFIX}/delete`,
  STOCK_UPDATE: `${STOCK_PREFIX}/update`,
});
