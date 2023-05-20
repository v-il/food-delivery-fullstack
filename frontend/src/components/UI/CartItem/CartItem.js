import Quantity from "@/components/UI/Quantity/Quantity";

const CartItem = ({name, size, price, number}) => {
  return (
    <div className="rounded-2xl border-2 p-7 flex justify-between">
      <div className="flex gap-6">
        <div className="w-32 h-32">
          <img
            src="https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_292x292.webp	"
            height="100%"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{name}</h3>
          {size && <p className="text-base">{size}</p>}
        </div>
      </div>

      <div className="flex gap-x-11 items-center">
        <h3 className="text-2xl font-bold">{price} ₽</h3>
        <Quantity value={number}/>
      </div>
    </div>
  );
};

export default CartItem;
