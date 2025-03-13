"use client";

import Quotes from "@/components/quotes/quotes";
import { fetchQuotes } from "@/lib/features/quotes-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export default function QuotesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <div>
      <Quotes />
    </div>
  );
}
