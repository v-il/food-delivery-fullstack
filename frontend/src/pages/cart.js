import DocHead from "@/components/DocHead";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import CartItem from "@/components/UI/CartItem/CartItem";
import OrderForm from "@/components/UI/OrderForm/OrderForm";

const CartPage = () => {
  return (
    <>
      <DocHead title="Корзина" />
      <Header />

      <div className="container mx-auto md">
        <h1 className="text-4xl font-bold mt-10">Ваша корзина</h1>
        <div className="grid grid-cols-4 gap-x-2 mt-9">
          <div className="col-span-3">
            <CartItem name="Пицца" price={4121} number={10} />
          </div>
          <div class="border-2 rounded-2xl p-4">
            <p className="text-base font-bold">Оформление заказа</p>
            <p className="text-3xl mt-2.5">
              Итого <b>000 Р</b>
            </p>
            <Button className={"py-3 w-full mt-3.5"}>
              Войти с помощью Telegram
            </Button>
            <p className="text-xl text-center mt-2.5">или</p>

            <OrderForm/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CartPage;
