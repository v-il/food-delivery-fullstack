import Link from "next/link";
import Button from "../Button";

const LoginModal = ({ close }) => {
  return (
    <div>
      <div className="container left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-11 fixed rounded-xl bg-white max-w-lg z-50">
        <h1 className="text-4xl font-bold">Войти на сайт</h1>
        <p className="mt-6 text-xl">
          Для входа на сайт нужно написать боту "Авторизация". В случае, если
          бот используется впервые, написать "/start" и пройти регистрацию
        </p>

        <Link className="w-full" href="https://t.me/tpl_food_bot" target="_blank">
          <Button className="w-full py-4 mt-8" onClick={() => close()}>Войти с помощью Telegram</Button>
        </Link>
      </div>
      <div
        className="fixed items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20"
        onClick={() => close()}
      ></div>
    </div>
  );
};

export default LoginModal;
