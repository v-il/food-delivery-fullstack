import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DessertsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items)
  useEffect(() => {
    dispatch(fetchItemsReducer({category: "desserts"}));
  }, [dispatch])
  return (
    <>
      <CatalogueSkeleton title="Десерты" categoryName="Десерты" items={items.items}/>
    </>
  );
};

export default DessertsPage;
