import Currencies from "@/components/finances/currencies";
import Stocks from "@/components/finances/taxes";
import Link from "next/link";

export default function Finances() {
  return (
    <div className="grid grid-cols-1">
      <Link href="/">back</Link>
      <h1 className="text-3xl font-semibold">Finanças</h1>
      <h2 className="text-xl font-semibold mt-4 mb-2">Moedas</h2>
      <Currencies />
      <h2 className="text-xl font-semibold mt-4 mb-2">Ações</h2>
      <Stocks />
    </div>
  );
}
