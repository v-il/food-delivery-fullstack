import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import axios from "axios";
import { useEffect } from "react";

const DrinksPage = () => {
    async function test() {
        await axios.get('http://localhost:5000/promobanners');
    }

    useEffect(() => {
        test()
    }, [])
  return (
    <>
      <CatalogueSkeleton categoryName="Напитки" />
    </>
  );
};

export default DrinksPage;
