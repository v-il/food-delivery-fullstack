import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Ad from "@/components/UI/Ad/Ad";
import Item from "@/components/UI/Item/Item";
import Preloader from "../Preloader/Preloader";
import { useSelector } from "react-redux";
import DocHead from "@/components/DocHead";

const CatalogueSkeleton = ({items, title, categoryName}) => {
  const preloader = useSelector(state => state.items.itemsPreloader)
  return (
    <>
      <DocHead title={title}/>
      <Header />
      <div>
        <div className="container mx-auto md mt-9">
          <Ad />
          <div className="mt-16">
            <h1 className="text-4xl font-bold">{categoryName}</h1>

            {preloader && <Preloader/>}
            {!preloader && <div className="grid grid-cols-4 gap-x-5 mt-11">
              {items && items.map(item => <Item image={item.image_url} description={item.description} title={item.name} sizes={item.sizes} itemPrice={item.price}/>)}
            </div>}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CatalogueSkeleton;
