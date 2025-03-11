import { StocksResponse } from "@/actions/get-finances";
import Link from "next/link";

export default function Stocks({
  stocks,
}: {
  stocks: StocksResponse | undefined;
}) {
  console.log(stocks);
  return (
    <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks &&
        Object.entries(stocks).map(([stockCode, details]) => {
          if (stockCode === "source" || typeof details === "string")
            return null;

          return (
            <li key={stockCode} className="p-4 border rounded-lg shadow-sm">
              <Link href={`/financas/${details.name}`} scroll={false}>
                <h2 className="text-xl font-semibold">
                  {details.name} ({stockCode})
                </h2>
                <p className="text-gray-600">
                  Buy: {details.location ?? "N/A"}
                </p>
                <p className="text-gray-600">Sell: {details.points ?? "N/A"}</p>
                <p className="text-gray-600">Variation: {details.variation}%</p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
