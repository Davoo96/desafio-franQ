"use client";

import { logout } from "@/utils/session";
import Link from "next/link";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("session") || "{}");
  return (
    <div className="h-screen">
      <h1 className="text-4xl text-center">Bem vindo {user?.username}</h1>
      <div className="flex justify-center items-center mt-4 gap-8">
        <Link href="/cotacoes">Ver todas as cotações</Link>
        <button type="button" className="cursor-pointer" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}
