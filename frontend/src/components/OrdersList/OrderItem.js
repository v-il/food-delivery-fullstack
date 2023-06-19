import { useState } from "react";
import Button from "../UI/Button";
import { axiosQuery } from "@/helpers/queries/axiosInstance";

const OrderItem = ({ id, done, total, paid, cartId, link }) => {
  const [isModal, setIsModal] = useState(false);
  const [contentOfOrder, setContentOfOrder] = useState();
  const getCartContent = async () => {
    await axiosQuery
      .get(`/carts/getbyid/${cartId}`)
      .then((res) => setContentOfOrder(res.data.items))
      .catch((e) => console.log(e));
    console.log(contentOfOrder);
  };
  return (
    <>
      {isModal && (
        <div>
          <div className="container left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-11 fixed rounded-xl bg-white max-w-lg z-50 max-h-[500px]">
            <h1 className="text-4xl font-bold">Заказ №{id}</h1>
            <div className="overflow-auto">
              {contentOfOrder &&
                contentOfOrder.map((content) => (
                  <div className="flex justify-between items-center border-b-2 py-3">
                    <div className="flex flex-col">
                      <b className="text-lg">{content.name} </b>
                      <span className="text-sm">
                        {content.CartItem.tg_front_size}{" "}
                      </span>
                    </div>

                    <div className="flex gap-x-6">
                      <h3 className="text-2xl">{content.CartItem.number} шт</h3>
                      <h3 className="text-2xl">
                        {content.CartItem.total_price} ₽
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="fixed items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsModal(false)}
          ></div>
        </div>
      )}

      <div className="flex w-full border-b-2 py-3 justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <b>Заказ №{id}</b> <span>-</span>
            {done ? "Завершен" : "Не завершен"} <span>-</span>
            {paid ? "Оплачен" : "Не оплачен"}
          </div>
          <h3 className="text-xl">{total} ₽</h3>
        </div>
        <div className="flex gap-3">
          <Button
            variant="grey"
            onClick={() => {
              setIsModal(true);
              return getCartContent();
            }}
          >
            Содержимое
          </Button>
          {!paid && <Button onClick={() => window.location.replace(`/pay?code=${link}`)}>Оплатить</Button>}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
