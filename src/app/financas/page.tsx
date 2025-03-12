"use client";

import Finances from "@/components/finances/finances";
import { fetchFinances } from "@/lib/features/finances-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export default function FinancesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFinances());
  }, [dispatch]);

  return (
    <div>
      <Finances />
    </div>
  );
}
