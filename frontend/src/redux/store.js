import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice"
import cartReducer from "./slices/cartSlice"
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
