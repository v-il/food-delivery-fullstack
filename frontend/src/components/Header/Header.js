import Link from "next/link";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfoReducer } from "@/redux/slices/userSlice";
import LoginModal from "../UI/LoginModal/LoginModal";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuth);
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch(fetchUserInfoReducer());
  }, [])

  const [isModal, setIsModal] = useState(false);
  return (<>
    {isModal && <LoginModal close={() => setIsModal(false)}/>}
    <header className="py-6 drop-shadow-md bg-white">
      <div className="container mx-auto md">
        <nav className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-[#0EC645]">
            <Link href="/">еда.</Link>
          </h3>
          <nav className="flex gap-x-10 text-xl">
            <Link href="/" onClick={() => window.location.replace('/')} className="transition-all hover:opacity-60">
              пицца
            </Link>
            <Link href="/snacks" onClick={() => window.location.replace('/snacks')} className="transition-all hover:opacity-60">
              закуски
            </Link>
            <Link href="/desserts" onClick={() => window.location.replace('/desserts')} className="transition-all hover:opacity-60">
              десерты
            </Link>
            <Link href="/drinks" onClick={() => window.location.replace('/drinks')} className="transition-all hover:opacity-60">
              напитки
            </Link>
            <Link href="/combo" onClick={() => window.location.replace('/combo')} className="transition-all hover:opacity-60">
              комбо
            </Link>
          </nav>

          <div className="flex gap-x-5 items-center">
            <Link href="/cart"><Button style="px-7">корзина</Button></Link>
            {isAuth ? <Link href="/profile"><Button variant="grey">профиль</Button></Link> : <Button variant="grey" onClick={() => setIsModal(true)}>войти</Button>}
          </div>
        </nav>
      </div>
    </header>
    </>
  );
};
export default Header;
