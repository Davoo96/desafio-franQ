"use client";

import Shimmer from "@/components/loading/shimmer";
import Spinner from "@/components/loading/spinner";
import { logout } from "@/utils/session";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/financas">Ver todas as finanças</Link>
      <button onClick={logout}>logout</button>
      <Spinner />
      <Shimmer />
    </div>
  );
}
