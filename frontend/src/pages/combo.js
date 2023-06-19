import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ComboPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);
  useEffect(() => {
    dispatch(fetchItemsReducer({category: "combo"}))
  }, [dispatch])
  return (
    <>
      <CatalogueSkeleton title="Комбо" categoryName="Комбо" items={items.items}/>
    </>
  );
};

export default ComboPage;
