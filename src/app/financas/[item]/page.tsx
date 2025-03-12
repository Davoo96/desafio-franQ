"use client";

import GraphComponent from "@/components/graph/graph";
import {
  fetchFinances,
  setSelectedCurrency,
  setSelectedStock,
} from "@/lib/features/finances-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { use, useEffect } from "react";

export default function FinancesItemPage({
  params,
}: {
  params: Promise<{ item: string; isCurrency: boolean }>;
}) {
  const { item, isCurrency } = use(params);
  const selectedItem = decodeURIComponent(item);
  const dispatch = useAppDispatch();
  const { selectedCurrency } = useAppSelector((state) => state.finances);
  const { selectedStock } = useAppSelector((state) => state.finances);

  useEffect(() => {
    if (selectedCurrency !== null || selectedStock !== null) return;
    if (isCurrency) {
      dispatch(setSelectedCurrency(selectedItem));
    } else {
      dispatch(setSelectedStock(selectedItem));
    }
    dispatch(fetchFinances());
  }, [dispatch, isCurrency, selectedCurrency, selectedItem, selectedStock]);

  return (
    <main>
      <Link href="/financas" scroll={false}>
        back
      </Link>
      <h1>Item: {selectedItem}</h1>
      <GraphComponent />
    </main>
  );
}
