import { memo, useEffect, useState } from "react";

// import { AddPortfolio } from "../../components/portfolio/AddPortfolio";
import { PortfolioCard } from "../../components/common/PortfolioCard/PortfolioCard";

import { PortfolioApis } from "../../api";
import { Portfolio } from "../../interface";

function HomeComponent() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    const apiResponse = await PortfolioApis.getAll();
    if (apiResponse.isError) return;
    setPortfolios(apiResponse.data as Portfolio[]);
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
