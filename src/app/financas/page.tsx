import { getFinances } from "@/actions/get-finances";
import Finances from "@/components/finances/finances";

export default async function FinancesPage() {
  const data = await getFinances();

  return (
    <div>
      <Finances
        currencies={data?.results.currencies}
        stocks={data?.results.stocks}
      />
    </div>
  );
}
