"use client";

import GraphComponent from "@/components/graph/graph";
import Spinner from "@/components/loading/spinner";
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
  searchParams,
}: {
  params: Promise<{ item: string }>;
  searchParams: Promise<{ isCurrency: string }>;
}) {
  const { item } = use(params);
  const { isCurrency } = use(searchParams);
  const selectedItem = decodeURIComponent(item);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.quotes);
  const { selectedCurrency } = useAppSelector((state) => state.quotes);
  const { selectedStock } = useAppSelector((state) => state.quotes);

  useEffect(() => {
    if (selectedCurrency !== null || selectedStock !== null) return;
    if (isCurrency === "true") {
      dispatch(setSelectedCurrency(selectedItem));
    } else {
      dispatch(setSelectedStock(selectedItem));
    }
    dispatch(fetchQuotes());
  }, [
    dispatch,
    isCurrency,
    searchParams,
    selectedCurrency,
    selectedItem,
    selectedStock,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="grid place-items-center">
      <Link href="/cotacoes" scroll={false}>
        back
      </Link>
      <h1>Item: {selectedItem}</h1>
      <GraphComponent />
    </main>
  );
}
