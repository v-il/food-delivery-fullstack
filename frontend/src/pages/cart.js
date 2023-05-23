import DocHead from "@/components/DocHead";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import CartItem from "@/components/UI/CartItem/CartItem";
import OrderForm from "@/components/UI/OrderForm/OrderForm";
import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { getCartContentReducer } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const cost = useSelector(state => state.cart.cost);

  const isAuth = useSelector(state => state.user.isAuth)
  useEffect(() => {
    dispatch(getCartContentReducer())
  }, [])

  const decrementHandler = async (id) => {
      await axiosQuery.post('/cart-items/decrement', {
        cart_item_id: id
      })

      dispatch(getCartContentReducer());
  }

  const incrementHandler = async (itemId, size) => {
    const cartId = localStorage.getItem('cart');
    await axiosQuery.post('/cart-items/add', {
      cart_id: cartId,
      item_id: itemId,
      size
    });
    dispatch(getCartContentReducer());
  }
  return (
    <>
      <DocHead title="Корзина" />
      <Header />

      <div className="container mx-auto md">
        <h1 className="text-4xl font-bold mt-10">Ваша корзина</h1>
        <div className="grid grid-cols-4 gap-x-2 mt-9">
          <div className="col-span-3">
            {items && items.map((item) => <CartItem increment={() => incrementHandler(item.id, item.CartItem.size)} size={item.CartItem.tg_front_size} decrement={() => decrementHandler(item.CartItem.id)} name={item.name} image={item.image_url} price={item.CartItem.total_price} number={item.CartItem.number} />)}
            {items.length === 0 && <h4 className="text-xl">В корзине пусто :(</h4>}
          </div>
          <div class="border-2 rounded-2xl p-4">
            <p className="text-base font-bold">Оформление заказа</p>
            <p className="text-3xl mt-2.5">
              Итого <b>{cost} Р</b>
            </p>
            {!isAuth && <> <Link href="https://t.me/tpl_food_bot" target="_blank">
              <Button className={"py-3 w-full mt-3.5"}>
                Войти с помощью Telegram
              </Button>
            </Link>
            <p className="text-xl text-center mt-2.5">или</p></>}

            <OrderForm/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CartPage;
