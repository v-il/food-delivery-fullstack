import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Ad from "@/components/UI/Ad/Ad";
import Item from "@/components/UI/Item/Item";

const CatalogueSkeleton = ({title, categoryName, items}) => {
  return (
    <>
      <Header />
      <div>
        <div className="container mx-auto md mt-9">
          <Ad />
          <div className="mt-16">
            <h1 className="text-4xl font-bold">{categoryName}</h1>

            <div className="grid grid-cols-4 gap-x-5 mt-11">
              <Item />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CatalogueSkeleton;
