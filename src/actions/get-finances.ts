"use server";

type CurrencyDetails = {
  name: string;
  buy: number | null;
  sell: number | null;
  variation: number;
};

type StocksDetails = {
  name: string;
  location: string;
  points: number;
  variation: number;
};

export type CurrenciesResponse = {
  source: string;
  USD: CurrencyDetails;
  EUR: CurrencyDetails;
  GBP: CurrencyDetails;
  ARS: CurrencyDetails;
  CAD: CurrencyDetails;
  AUD: CurrencyDetails;
  JPY: CurrencyDetails;
  CNY: CurrencyDetails;
  BTC: CurrencyDetails;
};

export type StocksResponse = {
  IBOVESPA: StocksDetails;
  IFIX: StocksDetails;
  NASDAQ: StocksDetails;
  DOWJONES: StocksDetails;
  CAC: StocksDetails;
  NIKKEI: StocksDetails;
};

export type ApiResponse = {
  results: {
    currencies: CurrenciesResponse;
    stocks: StocksResponse;
  };
};

export async function getFinances(): Promise<ApiResponse | undefined> {
  try {
    const response = await fetch(
      "https://api.hgbrasil.com/finance?key=47c963eb"
    );
    const data = (await response.json()) as ApiResponse;
    return data;
  } catch (error) {
    console.error(error);
  }
}
