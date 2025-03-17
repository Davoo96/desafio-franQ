"use client";

import { StocksDetails } from "@/actions/get-quotes";
import { setSelectedStock } from "@/lib/features/quotes-slice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";

export default function StocksItem({
  latestDetails,
  stockCode,
}: {
  latestDetails: StocksDetails;
  stockCode: string;
}) {
  const dispatch = useAppDispatch();
  const variationColor =
    latestDetails.variation >= 0 ? "text-green-600" : "text-red-600";

  return (
    <li className="p-4 border rounded-lg shadow-sm">
      <Link
        href={`/cotacoes/${latestDetails.name}?isCurrency=false`}
        scroll={false}
        onClick={() => {
          dispatch(setSelectedStock(latestDetails.name));
        }}
      >
        <h2 className="text-xl font-semibold">
          {latestDetails.name} ({stockCode})
        </h2>
        <p className="text-gray-600">
          Localização: {latestDetails.location ?? "N/A"}
        </p>
        <p className="text-gray-600">Pontos: {latestDetails.points ?? "N/A"}</p>
        <p className={variationColor}>Variação: {latestDetails.variation}%</p>
      </Link>
    </li>
  );
}
