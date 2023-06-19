import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items)
  useEffect(() => {
    dispatch(fetchItemsReducer({category: "pizza"}));
  }, [dispatch])


  return (
    <>
      <CatalogueSkeleton title={"Пицца"} categoryName="Пицца" items={items.items} />
    </>
  );
}
