"use client";

import Shimmer from "@/components/loading/shimmer";
import CurrencyItem from "@/components/quotes/currencies/currency-item";
import { useAppSelector } from "@/lib/hooks";

export default function Currencies() {
  const { currencies, isLoading } = useAppSelector((state) => state.quotes);

  if (isLoading) {
    return (
      <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Shimmer key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currencies &&
        Object.entries(currencies).map(([currencyCode, detailsArray]) => {
          const latestDetails = detailsArray[detailsArray.length - 1];

          if (!latestDetails) return null;

          return (
            <CurrencyItem
              key={`${currencyCode}-${latestDetails.name}`}
              latestDetails={latestDetails}
              currencyCode={currencyCode}
            />
          );
        })}
    </ul>
  );
}
