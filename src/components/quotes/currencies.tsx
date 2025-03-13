"use client";

import Shimmer from "@/components/loading/shimmer";
import { setSelectedCurrency } from "@/lib/features/quotes-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

export default function Currencies() {
  const dispatch = useAppDispatch();
  const { currencies, isLoading } = useAppSelector((state) => state.quotes);

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
      {currencies &&
        Object.entries(currencies).map(([currencyCode, detailsArray]) => {
          const latestDetails = detailsArray[detailsArray.length - 1];

          if (!latestDetails) return null;

          const variationColor =
            latestDetails.variation >= 0 ? "text-green-600" : "text-red-600";

          return (
            <li key={currencyCode} className="p-4 border rounded-lg shadow-sm">
              <Link
                href={`/cotacoes/${latestDetails.name}?isCurrency=true`}
                scroll={false}
                onClick={() => {
                  dispatch(setSelectedCurrency(latestDetails.name));
                }}
              >
                <h2 className="text-xl font-semibold">
                  {latestDetails.name} ({currencyCode})
                </h2>
                <p className="text-gray-600">
                  Compra: {latestDetails.buy ?? "N/A"}
                </p>
                <p className="text-gray-600">
                  Venda: {latestDetails.sell ?? "N/A"}
                </p>
                <p className={variationColor}>
                  Variação: {latestDetails.variation}%
                </p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
