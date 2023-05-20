import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice"
import cartReducer from "./slices/cartSlice"


const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
