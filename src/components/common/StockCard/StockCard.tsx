import { memo, useEffect, useState } from "react";
import { RiDeleteBin5Line, RiStockLine } from "react-icons/ri";

import { Stock, StockAnalysis } from "../../../interface";
import { StockApis } from "../../../api";
import { CalculateStockAnalysis, formatNumber } from "../../../helper";
import { AddUpdateStock } from "../../stock/AddUpdateStock";

type StockProps = {
  data: Stock;
  refresh: () => void;
};

function StockCardComponent({ data, refresh }: StockProps) {
  const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis | null>(
    null
  );

  const handleDelete = async () => {
    const apiResponse = await StockApis.delete(data._id);

    if (apiResponse.isError) {
      console.log(apiResponse.error);
      alert("Unable to delete Stock. Please try later");
      return;
    }

    refresh();
  };

  const calculateProfit = (stock: Stock) => {
    setStockAnalysis(CalculateStockAnalysis(stock));
  };

  useEffect(() => {
    if (data) calculateProfit(data);
  }, [data]);

  return (
    <div className="w-full flex gap-y-4 p-4 justify-between rounded-md shadow-lg border-4 border-sky-400">
      <div>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center justify-center">
              <RiStockLine size="1.8em" color="danger" />
              <p className="text-lg font-bold m-0">{data.title}</p>
            </div>
          </div>

          <div className="text-xs">
            <p className="m-0 flex gap-x-2">
              Avg Price : INR {formatNumber(stockAnalysis?.avgBuyPrice)}
            </p>

            <p className="m-0 flex gap-x-2">
              Current Price : INR {formatNumber(data.currentPrice)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-1 text-xs">
          <p className=" m-0 font-bold">
            Total Transactions : {formatNumber(data.history?.length) ?? 0}
          </p>

          <p className=" m-0 font-bold">
            Total Amount Invested : INR{" "}
            {formatNumber(stockAnalysis?.investedAmount)}
          </p>

          <p className=" m-0 font-bold">
            Current Value : INR {formatNumber(stockAnalysis?.currentAmount)}
          </p>

          <p
            className={` m-0 font-bold ${
              stockAnalysis?.status === "GAIN"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Gain Loss : ({stockAnalysis?.status}) INR{" "}
            {formatNumber(stockAnalysis?.gainLossAmount)} (%{" "}
            {formatNumber(stockAnalysis?.gainLossPercentage)})
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <AddUpdateStock
          variant="UPDATE"
          portfolioId={data.portfolioId}
          refresh={refresh}
          data={data}
        />
        <button className="rounded-full p-2 bg-red-500" onClick={handleDelete}>
          <RiDeleteBin5Line color="white" />
        </button>
      </div>
    </div>
  );
}

export const StockCard = memo(StockCardComponent);
