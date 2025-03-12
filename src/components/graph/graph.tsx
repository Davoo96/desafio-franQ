import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GraphComponent = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.finances.selectedCurrency
  );
  const selectedStock = useSelector(
    (state: RootState) => state.finances.selectedStock
  );
  const currencies = useSelector(
    (state: RootState) => state.finances.currencies
  );
  const stocks = useSelector((state: RootState) => state.finances.stocks);

  const currencyData = Object.values(currencies).find((currency) =>
    currency.find((c) => c.name === selectedCurrency)
  );
  const stockData = Object.values(stocks).find((stock) =>
    stock.find((s) => s.name === selectedStock)
  );

  if ((selectedCurrency && !currencyData) || (selectedStock && !stockData)) {
    return <div>No data found</div>;
  }

  const graphData = selectedCurrency
    ? currencyData?.map((c) => ({
        value: c.buy || "N/A",
        secondaryValue: c.sell || "N/A",
      }))
    : stockData?.map((s) => ({
        value: s.points || "N/A",
        secondaryValue: s.variation || "N/A",
      }));

  return (
    <div>
      <h2>
        Gráfico para{" "}
        {selectedCurrency
          ? `cotação do: ${selectedCurrency}`
          : `as ações de: ${selectedStock}`}
      </h2>
      <LineChart width={600} height={300} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name={selectedCurrency ? "Buy" : "Points"}
        />
        <Line
          type="monotone"
          dataKey="secondaryValue"
          stroke="#6995d9"
          name={selectedCurrency ? "Sell" : "Variation"}
        />
      </LineChart>
    </div>
  );
};

export default GraphComponent;
