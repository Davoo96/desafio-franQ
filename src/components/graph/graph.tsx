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
    (state: RootState) => state.quotes.selectedCurrency
  );
  const selectedStock = useSelector(
    (state: RootState) => state.quotes.selectedStock
  );
  const currencies = useSelector((state: RootState) => state.quotes.currencies);
  const stocks = useSelector((state: RootState) => state.quotes.stocks);

  const currencyData = Object.values(currencies).find((currency) =>
    currency.find((currency) => currency.name === selectedCurrency)
  );
  const stockData = Object.values(stocks).find((stock) =>
    stock.find((stock) => stock.name === selectedStock)
  );

  if ((selectedCurrency && !currencyData) || (selectedStock && !stockData)) {
    return <div>No data found</div>;
  }

  const graphData = selectedCurrency
    ? currencyData?.map((currency) => ({
        timestamp: currency.timestamp,
        value: currency.buy || "N/A",
        secondaryValue: currency.sell || "N/A",
      }))
    : stockData?.map((stock) => ({
        timestamp: stock.timestamp,
        value: stock.points || "N/A",
        secondaryValue: stock.variation || "N/A",
      }));

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        Gráfico para{" "}
        {selectedCurrency
          ? `cotação do: ${selectedCurrency}`
          : `as ações de: ${selectedStock}`}
      </h2>
      <LineChart
        className="pr-12 mx-auto my-0"
        width={550}
        height={300}
        data={graphData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name={selectedCurrency ? "Compra" : "Pontos"}
        />
        {selectedCurrency && (
          <Line
            type="monotone"
            dataKey="secondaryValue"
            stroke="#6995d9"
            name="Venda"
          />
        )}
      </LineChart>
    </div>
  );
};

export default GraphComponent;
