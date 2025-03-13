"use client";

import { logout } from "@/utils/session";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/financas">Ver todas as finanças</Link>
      <button onClick={logout}>logout</button>
    </div>
  );
}
