import Currencies from "@/components/quotes/currencies/currencies";
import Stocks from "@/components/quotes/stocks/stocks";
import Link from "next/link";

export default function Quotes() {
  return (
    <div className="grid grid-cols-1">
      <Link href="/">voltar</Link>
      <h1 className="text-3xl font-semibold">Cotações</h1>
      <h2 className="text-xl font-semibold mt-4 mb-2">Moedas</h2>
      <Currencies />
      <h2 className="text-xl font-semibold mt-4 mb-2">Ações</h2>
      <Stocks />
    </div>
  );
}
