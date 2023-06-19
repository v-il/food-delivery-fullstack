import Quantity from "@/components/UI/Quantity/Quantity";

const CartItem = ({name, size, price, number, image, increment, decrement}) => {
  return (
    <div className="rounded-2xl border-2 p-7 flex justify-between mb-2">
      <div className="flex gap-6">
        <div className="w-32 h-32">
          <img
            src={image}
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
        <Quantity value={number} increment={increment} decrement={decrement}/>
      </div>
    </div>
  );
};

export default CartItem;
