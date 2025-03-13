import {
  CurrencyDetails,
  getFinances,
  StocksDetails,
} from "@/actions/get-finances";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchFinances = createAsyncThunk(
  "finances/fetchFinances",
  async () => {
    const data = await getFinances();
    return data;
  }
);

type FinancesState = {
  selectedCurrency: string | null;
  selectedStock: string | null;
  currencies: { [currencyCode: string]: CurrencyDetails[] };
  stocks: { [stocksCode: string]: StocksDetails[] };
  isLoading: boolean;
};

const initialState: FinancesState = {
  selectedCurrency: null,
  selectedStock: null,
  isLoading: false,
  currencies: {},
  stocks: {},
};

const financesSlice = createSlice({
  name: "finances",
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
    builder.addCase(fetchFinances.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFinances.fulfilled, (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      if (!data) return;

      Object.entries(data.results.currencies).forEach(
        ([currencyCode, details]) => {
          if (currencyCode === "source" || typeof details === "string") return;

          const currency: CurrencyDetails = {
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
} = financesSlice.actions;

export default financesSlice.reducer;
