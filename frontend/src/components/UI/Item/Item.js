import { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";

const Item = ({ image, title, description, sizes, itemPrice }) => {
  const picClassName = `rounded-2xl h-72 bg-cover`;

  const [price, setPrice] = useState(0);

  useEffect(() => {
    sizes.length > 0 && setPrice(sizes[0].price);
  }, [sizes]);

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
          {sizes && sizes.map((size) => size.in_stock && <div className={price === size.price ? "transition-all cursor-pointer text-center font-bold text-[#0EC645]" : "transition-all  text-center font-normal cursor-pointer hover:opacity-70 text-[#6D6A6A]"} onClick={() => setPrice(size.price)}>{size.tg_frontend_type}</div>)}
        </div>

        <Button className="w-full mt-6 py-1.5 text-xl">
          в корзину{" "}
          {sizes.length > 0 ? <b>{`${price ? price : "---"} Р`}</b> : <b>{itemPrice} Р</b>}
        </Button>
      </div>
    </div>
  );
};

export default Item;
