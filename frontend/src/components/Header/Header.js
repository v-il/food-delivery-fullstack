import Link from "next/link";
import Button from "../UI/Button";

const Header = () => {
  return (
    <header className="py-6 drop-shadow-md bg-white">
      <div className="container mx-auto md">
        <nav className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-[#0EC645]">
            <Link href="/">еда.</Link>
          </h3>
          <nav className="flex gap-x-10 text-xl">
            <Link href="/" className="transition-all hover:opacity-60">
              пицца
            </Link>
            <Link href="/snacks" className="transition-all hover:opacity-60">
              закуски
            </Link>
            <Link href="/desserts" className="transition-all hover:opacity-60">
              десерты
            </Link>
            <Link href="/drinks" className="transition-all hover:opacity-60">
              напитки
            </Link>
            <Link href="/combo" className="transition-all hover:opacity-60">
              комбо
            </Link>
          </nav>

          <div className="flex gap-x-5">
            <Button variant="grey">войти</Button>
            <Link href="/cart"><Button style="px-7">корзина</Button></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
