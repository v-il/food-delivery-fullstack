import Header from "@/components/Header/Header";
import DocHead from "@/components/DocHead";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosQuery } from "@/helpers/queries/axiosInstance";
import Button from "@/components/UI/Button";
import Link from "next/link";

const PayPage = () => {
  const router = useRouter();
  const [cost, setCost] = useState(0);
  const code = router.query["code"];
  const [status, setStatus] = useState("");

  const getCost = async () => {
    await axiosQuery
      .get(`/orders/getcost/${code}`)
      .then((res) => setCost(res.data.cost))
      .catch(() => console.log("m"));
  };

  const pay = async () => {
    await axiosQuery.get(`/orders/pay/${code}`).then(() => setStatus('success')).catch(() => setStatus('fail'));
  };

  useEffect(() => {
    getCost();
  }, [router, code]);
  return (
    <>
      <DocHead title="Оплата" />
      <Header />
      <div className="flex flex-col gap-10 items-center text-center container mx-auto max-w-xl mt-20">
        {status === "" && (
          <>
            <h1 className="font-bold text-3xl">Оплата заказа на {cost} ₽</h1>
            <Button className="mt-7 py-3 w-full" onClick={() => pay()}>Оплатить</Button>
          </>
        )}

        {status === "success" && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" fill="#0EC645" />
              <path
                d="M7 13l3 3 7-7"
                stroke="white"
                stroke-width="2"
                fill="none"
              />
            </svg>
            <h1 className="font-bold text-3xl">Оплата прошла успешно</h1>
            <Link href="/" className="w-full">
              <Button className="mt-7 py-3 w-full">На главную</Button>
            </Link>
          </>
        )}

        {status === "fail" && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" fill="red" />
              <path
                d="M7 7l10 10M17 7l-10 10"
                stroke="white"
                stroke-width="2"
                fill="none"
              />
            </svg>
            <h1 className="font-bold text-3xl">Произошла ошибка</h1>
            <Link href="/" className="w-full">
              <Button className="mt-7 py-3 w-full">На главную</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default PayPage;
