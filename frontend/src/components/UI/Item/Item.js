import Button from "../Button";

const Item = () => {
  return (
    <div className="border rounded-2xl p-5">
      <div className=" rounded-2xl h-72 bg-cover bg-[url(/pizza.webp)]"></div>

      <h4 className="text-xl mt-7">Название</h4>

      <p className="text-sm">
        Описание описание описание описание описание описание описание описание
        описание описание описание описание описание описание описание описание
      </p>

      <Button className="w-full mt-6 py-1.5 text-xl">в корзину <b>0 ₽</b></Button>
    </div>
  );
};

export default Item;