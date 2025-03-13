import {
  CurrencyDetails,
  getQuotes,
  StocksDetails,
} from "@/actions/get-quotes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchQuotes = createAsyncThunk("quotes/fetchQuotes", async () => {
  const data = await getQuotes();
  return data;
});

type QuotesState = {
  selectedCurrency: string | null;
  selectedStock: string | null;
  currencies: { [currencyCode: string]: CurrencyDetails[] };
  stocks: { [stocksCode: string]: StocksDetails[] };
  isLoading: boolean;
};

const initialState: QuotesState = {
  selectedCurrency: null,
  selectedStock: null,
  isLoading: false,
  currencies: {},
  stocks: {},
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload;
      state.selectedStock = null;
    },
    setSelectedStock(state, action) {
      state.selectedStock = action.payload;
      state.selectedCurrency = null;
    },
    addCurrencies(
      state,
      action: PayloadAction<{ currencyCode: string; currency: CurrencyDetails }>
    ) {
      const { currencyCode, currency } = action.payload;
      state.currencies[currencyCode].push(currency);
    },
    addStocks(
      state,
      action: PayloadAction<{ stockCode: string; stock: StocksDetails }>
    ) {
      const { stockCode, stock } = action.payload;
      state.stocks[stockCode].push(stock);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuotes.fulfilled, (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      if (!data) return;

      Object.entries(data.results.currencies).forEach(
        ([currencyCode, details]) => {
          if (currencyCode === "source" || typeof details === "string") return;

          const currency: CurrencyDetails = {
            timestamp: new Date().getTime().toString(),
            name: details.name,
            buy: details.buy,
            sell: details.sell,
            variation: details.variation,
          };

          if (!state.currencies[currencyCode]) {
            state.currencies[currencyCode] = [];
          }

          state.currencies[currencyCode].push(currency);
        }
      );

      Object.entries(data.results.stocks).forEach(([stockCode, details]) => {
        if (typeof details === "string") return;

        const stock: StocksDetails = {
          timestamp: new Date().getTime().toString(),
          name: details.name,
          points: details.points,
          variation: details.variation,
          location: details.location,
        };

        if (!state.stocks[stockCode]) {
          state.stocks[stockCode] = [];
        }

        state.stocks[stockCode].push(stock);
      });
    });
  },
});

export const {
  setSelectedCurrency,
  setSelectedStock,
  addCurrencies,
  addStocks,
} = quotesSlice.actions;

export default quotesSlice.reducer;
