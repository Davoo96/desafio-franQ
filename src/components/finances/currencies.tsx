import { CurrenciesResponse } from "@/actions/get-finances";
import Link from "next/link";

export default function Currencies({
  currencies,
}: {
  currencies: CurrenciesResponse | undefined;
}) {
  return (
    <ul className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currencies &&
        Object.entries(currencies).map(([currencyCode, details]) => {
          if (currencyCode === "source" || typeof details === "string")
            return null;

          const variationColor =
            details.variation >= 0 ? "text-green-600" : "text-red-600";

          return (
            <li key={currencyCode} className="p-4 border rounded-lg shadow-sm">
              <Link href={`/financas/${details.name}`} scroll={false}>
                <h2 className="text-xl font-semibold">
                  {details.name} ({currencyCode})
                </h2>
                <p className="text-gray-600">Buy: {details.buy ?? "N/A"}</p>
                <p className="text-gray-600">Sell: {details.sell ?? "N/A"}</p>
                <p className={variationColor}>
                  Variation: {details.variation}%
                </p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
