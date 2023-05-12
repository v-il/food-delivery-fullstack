import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <div className="container mx-auto md mt-9">
          <div className="rounded-3xl h-72 bg-cover bg-[url(https://cdn.papajohns.ru//images/banners/a1612cd4ca3c0346180113c04e136ac1.webp)]"></div>
          <div className="mt-16">
            <h1 className="text-4xl font-bold">Пицца</h1>

            <div className="grid grid-cols-4 gap-x-5 mt-11">
              <div className="border rounded-2xl p-5">
                <div className=" rounded-2xl h-72 bg-cover bg-[url(https://cdn.papajohns.ru//images/catalog/thumbs/full/Pepperoni-traditional.webp)]"></div>

                <h4 className="text-xl mt-7">Название</h4>

                <p className="text-sm">
                  Описание описание описание описание описание описание описание
                  описание описание описание описание описание описание описание
                  описание описание
                </p>

                <div className="w-full mt-6">В корзину</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}
