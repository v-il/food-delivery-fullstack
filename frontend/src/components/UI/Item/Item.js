import { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCartReducer } from "@/redux/slices/cartSlice";

const Item = ({ id, image, title, description, sizes, itemPrice }) => {
  const picClassName = `rounded-2xl h-72 bg-cover`;
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [sizeToSend, setSizeToSend] = useState('');

  const disabledButton = useSelector(state => state.cart.disabledAddToCartButton);

  const addHandler = () => {
    dispatch(addToCartReducer({itemId: id, size: sizeToSend}));
    console.log({itemId: id, size: sizeToSend})
  }

  useEffect(() => {
    sizes.length > 0 && setPrice(sizes[0].price);
    sizes.length > 0 && setSizeToSend(sizes[0].type);
  }, []);

  return (
    <div className="border rounded-2xl p-5 h-full flex flex-col justify-between">
      <div className={picClassName}>
        <img src={image} width={"100%"} height={"100%"} />
      </div>

      <h4 className="text-xl mt-7">{title}</h4>

      <p className="text-sm">{description}</p>

      <div className="mt-3">
        {/* {sizes && (
          <select className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" onChange={(e) => setPrice(e.target.value)}>
            {sizes.map((size) => (
              <option value={size.price}>{size.tg_frontend_type}</option>
            ))}
          </select>
        )} */}

        <div className="flex justify-between">
          {sizes && sizes.map((size) => size.in_stock && <div className={price === size.price ? "transition-all cursor-pointer text-center font-bold text-[#0EC645]" : "transition-all  text-center font-normal cursor-pointer hover:opacity-70 text-[#6D6A6A]"} onClick={() => {setPrice(size.price); setSizeToSend(size.type)}}>{size.tg_frontend_type}</div>)}
        </div>

        <Button disabled={disabledButton} onClick={addHandler} className="w-full mt-6 py-1.5 text-xl">
          в корзину{" "}
          {sizes.length > 0 ? <b>{`${price ? price : "---"} Р`}</b> : <b>{itemPrice} Р</b>}
        </Button>
      </div>
    </div>
  );
};

export default Item;
