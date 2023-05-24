import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import Button from "@/components/UI/Button";
import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { getCartContentReducer, sendOrderReducer } from "@/redux/slices/cartSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    phone: "",
    time: "",
    address: "",
    comment: "",
    promocode: "",
    delivery_time: "",
    comment: "",
    promocode: "",
  });

  const user = useSelector((state) => state.user.user);
  const [tip, setTip] = useState("");

  const sendOrder = async () => {
    await dispatch(
      sendOrderReducer({
        user_id: user.id,
        name: values.name,
        address: values.address,
        delivery_time: values.delivery_time,
        comment: values.comment,
        cart_id: localStorage.getItem("cart"),
        promocode: values.promocode
      })
    );    
  };

  useEffect(() => {
    setValues({
      ...values,
      name: user.rl_name ? user.rl_name : "",
      phone: user.phone ? user.phone : "",
      address: user.address ? user.address : "",
    });
  }, [user]);
  const addressHandler = async (value) => {
    setValues({ ...values, address: value });
    try {
      const response = await axiosQuery.post("/orders/address-tips", {
        address: values.address,
      });
      setTip(response.data.address);
    } catch {
      setTip("");
    }
  };

  const setTipAsValue = () => {
    setValues({ ...values, address: tip });
    setTip("");
  };

  const checkPromocode = async () => {
    await axiosQuery.get(`/promocodes/verify/${values.promocode}`).then(() => alert('Промокод верный')).catch(() => alert('Неверный промокод'));
  }

  return (
    <div className="flex flex-col mt-2.5">
      <Input
        placeholder="Имя"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        className="mb-2"
      />
      <Input
        placeholder="Номер телефона"
        value={values.phone}
        onChange={(e) => setValues({ ...values, phone: e.target.value })}
        className="mb-2"
      />
      <div className="relative">
        <Input
          placeholder="Адрес доставки"
          value={values.address}
          onChange={(e) => addressHandler(e.target.value)}
          className="mb-2 absolute left-0 right-0 z-10"
        />
        {tip && (
          <div className="bg-white p-2 top-0 pt-[3.5rem] left-0 border-2 border-t-0 rounded-xl right-0 absolute top-[2.5rem] brightness-95">
            <div
              className="transition-all cursor-pointer hover:translate-x-1"
              onClick={() => setTipAsValue()}
            >
              {tip}
            </div>
          </div>
        )}
      </div>
      <Input
        placeholder="Время доставки"
        type="time"
        value={values.delivery_time}
        onChange={(e) =>
          setValues({ ...values, delivery_time: e.target.value })
        }
        className="mb-2 mt-14"
      />
      <TextArea
        placeholder="Комментарий"
        value={values.comment}
        onChange={(e) => setValues({ ...values, comment: e.target.value })}
        className="mb-2"
      />
      <Input
        placeholder="Промокод"
        value={values.promocode}
        onChange={(e) => setValues({ ...values, promocode: e.target.value })}
        className="mb-2"
        onBlur={() => checkPromocode()}
      />
      <Button onClick={() => sendOrder()} className={"py-3 w-full mt-3.5"}>
        Оформить заказ
      </Button>
    </div>
  );
};

export default OrderForm;
