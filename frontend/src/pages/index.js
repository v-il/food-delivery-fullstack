import CatalogueSkeleton from "@/components/UI/CatalogueSkeleton/CatalogueSkeleton";
import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { fetchItemsReducer } from "@/redux/slices/itemsSlice";
import axios from "axios";
import { useRouter } from "next/router";
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
      <CatalogueSkeleton categoryName="Пицца" items={items.items} />
    </>
  );
}
