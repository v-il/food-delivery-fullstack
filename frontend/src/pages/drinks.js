import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DrinksPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items)
  useEffect(() => {
    dispatch(fetchItemsReducer({category: "drinks"}));
  }, [dispatch])
  return (
    <>
      <CatalogueSkeleton title="Напитки" categoryName="Напитки" items={items.items}/>
    </>
  );
};

export default DrinksPage;
