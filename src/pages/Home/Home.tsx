import { memo, useEffect, useState } from "react";

// import { AddPortfolio } from "../../components/portfolio/AddPortfolio";
import { PortfolioCard } from "../../components/common/PortfolioCard/PortfolioCard";

import { PortfolioApis } from "../../api";
import { Portfolio } from "../../interface";

const defaultPortfolios = {
  portfolios: [
    {
      _id: "63ed1a995ef7d69cb741896d",
      title: "Himanshu",
      description: "This is my first Description",
      createdAt: "2023-02-15T17:47:05.724Z",
      updatedAt: "2023-02-15T17:47:05.724Z",
      __v: 0,
    },
    {
      _id: "63edd1ac3efbbddc141287ce",
      title: "Shubham",
      description: "Shubham portfolio",
      createdAt: "2023-02-16T06:48:12.038Z",
      updatedAt: "2023-02-16T06:48:12.038Z",
      __v: 0,
    },
  ],
};

function HomeComponent() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    const apiResponse = await PortfolioApis.getAll();
    if (apiResponse.isError) return;
    setPortfolios(apiResponse.data as Portfolio[]);

    // setPortfolios(defaultPortfolios.portfolios);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-xl my-4 font-bold">All Portfolios</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {portfolios.map((folio, ind) => (
            <PortfolioCard
              data={folio}
              refresh={fetchPortfolios}
              key={`portfolio-card-${ind}`}
            />
          ))}
        </div>
      </div>

      {/* <AddPortfolio refresh={fetchPortfolios} /> */}
    </div>
  );
}

export const HomePage = memo(HomeComponent);
