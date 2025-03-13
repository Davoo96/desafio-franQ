"use client";

import GraphComponent from "@/components/graph/graph";
import {
  fetchQuotes,
  setSelectedCurrency,
  setSelectedStock,
} from "@/lib/features/quotes-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { use, useEffect } from "react";

export default function QuotesItemPage({
  params,
}: {
  params: Promise<{ item: string; isCurrency: boolean }>;
}) {
  const { item, isCurrency } = use(params);
  const selectedItem = decodeURIComponent(item);
  const dispatch = useAppDispatch();
  const { selectedCurrency } = useAppSelector((state) => state.quotes);
  const { selectedStock } = useAppSelector((state) => state.quotes);

  useEffect(() => {
    if (selectedCurrency !== null || selectedStock !== null) return;
    if (isCurrency) {
      dispatch(setSelectedCurrency(selectedItem));
    } else {
      dispatch(setSelectedStock(selectedItem));
    }
    dispatch(fetchQuotes());
  }, [dispatch, isCurrency, selectedCurrency, selectedItem, selectedStock]);

  return (
    <main>
      <Link href="/cotacoes" scroll={false}>
        back
      </Link>
      <h1>Item: {selectedItem}</h1>
      <GraphComponent />
    </main>
  );
}
