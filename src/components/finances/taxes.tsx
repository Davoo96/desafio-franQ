"use client";

import { setSelectedStock } from "@/lib/features/finances-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

export default function Stocks() {
  const dispatch = useAppDispatch();
  const { stocks } = useAppSelector((state) => state.finances);
  return (
    <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks &&
        Object.entries(stocks).map(([stockCode, detailsArray]) => {
          const latestDetails = detailsArray[detailsArray.length - 1];

          if (!latestDetails) return null;

          const variationColor =
            latestDetails.variation >= 0 ? "text-green-600" : "text-red-600";

          return (
            <li key={stockCode} className="p-4 border rounded-lg shadow-sm">
              <Link
                href={`/financas/${latestDetails.name}?isCurrency=false`}
                scroll={false}
                onClick={() => {
                  dispatch(setSelectedStock(latestDetails.name));
                }}
              >
                <h2 className="text-xl font-semibold">
                  {latestDetails.name} ({stockCode})
                </h2>
                <p className="text-gray-600">
                  Buy: {latestDetails.location ?? "N/A"}
                </p>
                <p className="text-gray-600">
                  Sell: {latestDetails.points ?? "N/A"}
                </p>
                <p className={variationColor}>
                  Variation: {latestDetails.variation}%
                </p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
