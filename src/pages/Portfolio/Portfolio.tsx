import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { AddUpdateStock } from "../../components/stock/AddUpdateStock";
import { StockCard } from "../../components/common/StockCard/StockCard";

import { PortfolioApis } from "../../api";
import { StockApis } from "../../api";

import { CalculatePortfolioAnalysis, formatNumber } from "../../helper";
import { Portfolio, Stock } from "../../interface";

type QueryParams = {
  portfolioId: string;
};

function PortfolioComponent() {
  const { portfolioId } = useParams<keyof QueryParams>() as QueryParams;
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const getPortfolioAnalysis = useCallback(() => {
    return CalculatePortfolioAnalysis(stocks);
  }, [stocks]);

  const fetchPortfolio = async () => {
    const apiResponse = await PortfolioApis.get(portfolioId);

    if (apiResponse.isError) {
      navigate("/");
      alert("404 Page does not exist");
      return;
    }

    setPortfolio(apiResponse?.data as Portfolio);
  };

  const fetchStocks = async () => {
    const apiResponse = await StockApis.getByPortfolioId(portfolioId);

    if (apiResponse.isError) {
      alert("Error while fetching stocks for the Portfolio");
      return;
    }

    setStocks(apiResponse?.data as Stock[]);
  };

  useEffect(() => {
    fetchPortfolio();
    fetchStocks();
  }, []);

  const createdAt = portfolio?.createdAt
    ? new Date(portfolio?.createdAt).toDateString()
    : "";

  return (
    <div className="container flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold my-4">
            {portfolio?.title || "Loading .."} {createdAt && `( ${createdAt} )`}
          </h2>

          <p className="text-md">Description : {portfolio?.description}</p>
          <p className="text-md">
            <b>
              Total Amount Invested : INR{" "}
              {formatNumber(getPortfolioAnalysis().investedAmount)}
            </b>
          </p>
        </div>

        {/* <AddUpdateStock
          variant="ADD"
          portfolioId={portfolio?._id ?? ""}
          refresh={fetchStocks}
        /> */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
        {stocks.map((stock, ind) => (
          <StockCard
            data={stock}
            refresh={fetchStocks}
            key={`Stock-card-${ind}`}
          />
        ))}
      </div>
    </div>
  );
}

export const PortfolioPage = memo(PortfolioComponent);
