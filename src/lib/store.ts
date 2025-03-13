import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "@/lib/features/quotes-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      quotes: quotesSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
