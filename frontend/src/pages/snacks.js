import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SnacksPage() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items)
  useEffect(() => {
    dispatch(fetchItemsReducer({category: "snacks"}));
  }, [dispatch])


  return (
    <>
      <CatalogueSkeleton title="Закуски" categoryName="Закуски" items={items.items} />
    </>
  );
}
