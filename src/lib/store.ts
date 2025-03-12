import { configureStore } from "@reduxjs/toolkit";
import financesSlice from "@/lib/features/finances-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      finances: financesSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
