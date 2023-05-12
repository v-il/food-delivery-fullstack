import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0EC645] py-16 mt-20 text-white">
      <div className="container mx-auto lg flex items-center justify-between">
        <div>
          <h1 className="font-bold text-4xl">
            <Link href="/">еда.</Link>
          </h1>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} ООО "Еда" <br></br> 
            ИНН 1234567890 ОГРН <br></br>
            1234567890123
          </p>
        </div>

        <div>
            <h1 className="text-4xl font-bold">+ 7 913 123 45 67</h1>
            <p className="text-right">заказ по телефону</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
