import { axiosQuery } from "@/helpers/queries/axiosInstance";
import store from "@/redux/store";
import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const createCart = async () => {
    const res = await axiosQuery.post('/carts');
    localStorage.setItem('cart', res.data.string_id);
  }
  
  useEffect(() => {
    createCart();
  })
  return <Provider store={store}><Component {...pageProps} /></Provider>;
}
