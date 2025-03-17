"use client";

import Shimmer from "@/components/loading/shimmer";
import StocksItem from "@/components/quotes/stocks/stock-item";
import { useAppSelector } from "@/lib/hooks";

export default function Stocks() {
  const { stocks, isLoading } = useAppSelector((state) => state.quotes);

  if (isLoading) {
    return (
      <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <Shimmer />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks &&
        Object.entries(stocks).map(([stockCode, detailsArray]) => {
          const latestDetails = detailsArray[detailsArray.length - 1];

          if (!latestDetails) return null;

          return (
            <StocksItem
              key={`${stockCode}-${latestDetails.name}`}
              latestDetails={latestDetails}
              stockCode={stockCode}
            />
          );
        })}
    </ul>
  );
}
