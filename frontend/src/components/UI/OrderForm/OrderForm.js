import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import Button from "@/components/UI/Button";

const OrderForm = () => {
  return (
    <div className="flex flex-col mt-2.5">
      <Input placeholder="Имя" value={""} className="mb-2"/>
      <Input placeholder="Номер телефона" value={""} className="mb-2"/>
      <Input placeholder="Адрес доставки" value={""} className="mb-2"/>
      <Input placeholder="Время доставки" value={""} className="mb-2"/>
      <TextArea placeholder="Комментарий" value={""} className="mb-2"/>
      <Input placeholder="Промокод" value={""} className="mb-2"/>
      <Button className={"py-3 w-full mt-3.5"}>Оформить заказ</Button>
    </div>
  );
};

export default OrderForm;
