"use client";

import { CurrencyDetails } from "@/actions/get-quotes";
import { setSelectedCurrency } from "@/lib/features/quotes-slice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";

export default function CurrencyItem({
  latestDetails,
  currencyCode,
}: {
  latestDetails: CurrencyDetails;
  currencyCode: string;
}) {
  const dispatch = useAppDispatch();
  const variationColor =
    latestDetails.variation >= 0 ? "text-green-600" : "text-red-600";

  return (
    <li className="p-4 border rounded-lg shadow-sm">
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
        <p className="text-gray-600">Compra: {latestDetails.buy ?? "N/A"}</p>
        <p className="text-gray-600">Venda: {latestDetails.sell ?? "N/A"}</p>
        <p className={variationColor}>Variação: {latestDetails.variation}%</p>
      </Link>
    </li>
  );
}
