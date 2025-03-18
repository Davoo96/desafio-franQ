"use client";

import { logout } from "@/utils/session";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ username?: string }>({});

  useEffect(() => {
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      setUser(JSON.parse(sessionData));
    }
  }, []);

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
