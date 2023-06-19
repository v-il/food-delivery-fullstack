import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderItem from "./OrderItem";

const OrdersList = ({orders}) => {

    return (
        <>
            <div className="p-5 flex flex-col rounded-xl border-2 mt-3 w-full">
                <b>Список заказов</b>
                {orders.length === 0 && <span>Заказов еще не было</span>}
                <div className="overflow-auto flex flex-col">
                    {orders.map(order => <OrderItem total={order.total} id={order.id} paid={order.paid} done={order.done} cartId={order.cart_id} link={order.payment_link}/>)}
                </div>
            </div>
        </>
    )
}

export default OrdersList;