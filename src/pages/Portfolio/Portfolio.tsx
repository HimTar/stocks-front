import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { AddUpdateStock } from "../../components/stock/AddUpdateStock";
import { StockCard } from "../../components/common/StockCard/StockCard";

// import { PortfolioApis } from "../../api";
// import { StockApis } from "../../api";

import { CalculatePortfolioAnalysis, formatNumber } from "../../helper";
import { Portfolio, Stock } from "../../interface";

type QueryParams = {
  portfolioId: string;
};

const defaultPortfolio = {
  _id: "63edd1ac3efbbddc141287ce",
  title: "Shubham",
  description: "Shubham portfolio",
  createdAt: "2023-02-16T06:48:12.038Z",
  updatedAt: "2023-02-16T06:48:12.038Z",
  __v: 0,
};

const defaultStocks: { stocks: Stock[] } = {
  stocks: [
    {
      _id: "63eddb0025af9eb7cee87576",
      portfolioId: "63edd1ac3efbbddc141287ce",
      title: "Stock 1",
      currentPrice: 550,
      history: [
        {
          price: 600,
          quantity: 5,
          date: new Date("2023-02-15T00:00:00.000Z"),
          action: "SELL",
        },
        {
          price: 450,
          quantity: 20,
          date: new Date("2022-12-31T18:30:00.000Z"),
          action: "BUY",
        },
        {
          price: 450,
          quantity: 20,
          date: new Date("2022-12-31T18:30:00.000Z"),
          action: "BUY",
        },
      ],
      createdAt: "2023-02-16T07:28:00.355Z",
      updatedAt: "2023-02-22T12:24:47.185Z",
      code: "ONE",
    },
    {
      _id: "63ef1594260595364e28241c",
      portfolioId: "63edd1ac3efbbddc141287ce",
      title: "AWL",
      currentPrice: 500,
      history: [
        {
          price: 460,
          quantity: 5,
          date: new Date("2023-02-28T18:30:00.000Z"),
          action: "SELL",
        },
        {
          price: 450,
          quantity: 20,
          date: new Date("2022-12-31T18:30:00.000Z"),
          action: "BUY",
        },
        {
          price: 500,
          quantity: 15,
          date: new Date("2022-11-30T18:30:00.000Z"),
          action: "BUY",
        },
      ],
      createdAt: "2023-02-17T05:50:12.094Z",
      updatedAt: "2023-02-17T06:27:55.115Z",
    },
    {
      _id: "63f30780a19a38ff55020257",
      portfolioId: "63edd1ac3efbbddc141287ce",
      title: "Jyoti Resign",
      code: "JYT",
      currentPrice: 20,
      history: [
        {
          price: 20,
          quantity: 40,
          date: new Date("2023-02-21T00:00:00.000Z"),
          action: "BUY",
        },
        {
          price: 25,
          quantity: 10,
          date: new Date("2023-02-05T00:00:00.000Z"),
          action: "BUY",
        },
        {
          price: 25,
          quantity: 10,
          date: new Date("2023-02-05T00:00:00.000Z"),
          action: "BUY",
        },
      ],
      createdAt: "2023-02-20T05:39:12.140Z",
      updatedAt: "2023-02-22T12:30:34.036Z",
    },
    {
      _id: "63f376010e13c6164af84acc",
      portfolioId: "63edd1ac3efbbddc141287ce",
      title: "India Hotel",
      code: "",
      currentPrice: 250,
      history: [
        {
          price: 200,
          quantity: 25,
          date: new Date("2022-08-17T00:00:00.000Z"),
          action: "BUY",
        },
        {
          price: 170,
          quantity: 5,
          date: new Date("2022-12-21T00:00:00.000Z"),
          action: "SELL",
        },
      ],
      createdAt: "2023-02-20T13:30:41.069Z",
      updatedAt: "2023-02-20T13:30:41.069Z",
    },
    {
      _id: "63f60b633c696dc2f9725032",
      portfolioId: "63edd1ac3efbbddc141287ce",
      title: "Bikaji",
      code: "BKJ",
      currentPrice: 30,
      history: [
        {
          price: 35,
          quantity: 20,
          date: new Date("2023-01-03T00:00:00.000Z"),
          action: "BUY",
        },
      ],
      createdAt: "2023-02-22T12:32:35.047Z",
      updatedAt: "2023-02-22T12:32:35.047Z",
    },
  ],
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
    // const apiResponse = await PortfolioApis.get(portfolioId);

    // if (apiResponse.isError) {
    //   navigate("/");
    //   alert("404 Page does not exist");
    //   return;
    // }

    // setPortfolio(apiResponse?.data as Portfolio);

    setPortfolio(defaultPortfolio);
  };

  const fetchStocks = async () => {
    // const apiResponse = await StockApis.getByPortfolioId(portfolioId);

    // if (apiResponse.isError) {
    //   alert("Error while fetching stocks for the Portfolio");
    //   return;
    // }

    // setStocks(apiResponse?.data as Stock[]);

    setStocks(defaultStocks.stocks);
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
