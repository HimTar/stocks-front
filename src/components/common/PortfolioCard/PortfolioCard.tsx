import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line, RiFileChartLine } from "react-icons/ri";

import { Portfolio, PortfolioAnalysis } from "../../../interface";
import { PortfolioApis } from "../../../api";
import { CalculatePortfolioAnalysis, formatNumber } from "../../../helper";

type PortfolioProps = {
  data: Portfolio;
  refresh: () => void;
};

function PortfolioCardComponent({ data, refresh }: PortfolioProps) {
  const [portfolioAnalysis, setPortfolioAnalysis] =
    useState<PortfolioAnalysis | null>(null);

  const createdAt = new Date(data.createdAt).toLocaleDateString();

  const handleDelete = async () => {
    const apiResponse = await PortfolioApis.delete(data._id);

    if (apiResponse.isError) {
      console.log(apiResponse.error);
      alert("Unable to delete portfolio. Please try later");
      return;
    }

    refresh();
  };

  useEffect(() => {
    if (data)
      setPortfolioAnalysis(CalculatePortfolioAnalysis(data.stocks ?? []));
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-y-4 p-4 rounded-md shadow-lg border-4 border-sky-400">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center justify-center">
            <RiFileChartLine size="1.8em" />
            <Link to={`/portfolio/${data._id}`} className="text-lg font-bold">
              {data.title}
            </Link>
          </div>

          <button
            className="rounded-full p-2 bg-red-500"
            onClick={handleDelete}
          >
            <RiDeleteBin5Line color="white" />
          </button>
        </div>

        <p className="text-sm m-0">Description : {data.description}</p>
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="text-sm m-0">Created At : {createdAt}</p>

        <p className="text-sm m-0 font-bold">
          Total Stocks : {data.stocks?.length ?? 0}
        </p>

        <p className="text-sm m-0 font-bold">
          Total Amount Invested : INR{" "}
          {formatNumber(portfolioAnalysis?.investedAmount)}
        </p>

        <p className="text-sm m-0 font-bold">
          Current Value : INR {formatNumber(portfolioAnalysis?.currentAmount)}
        </p>

        <p
          className={`text-sm m-0 font-bold ${
            portfolioAnalysis?.status === "GAIN"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Gain Loss : ({portfolioAnalysis?.status}) INR{" "}
          {formatNumber(portfolioAnalysis?.gainLossAmount)} (%{" "}
          {formatNumber(portfolioAnalysis?.gainLossPercentage)})
        </p>
      </div>
    </div>
  );
}

export const PortfolioCard = memo(PortfolioCardComponent);
