import DocHead from "@/components/DocHead";
import Header from "@/components/Header/Header";
import Button from "@/components/UI/Button";
import { getTokenReducer } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const router = useRouter();
  const link = router.query["code"];
  console.log(link);
  const tokenError = useSelector((state) => state.user.tokenError);
  const tokenPreloader = useSelector((state) => state.user.tokenPreloader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenReducer({ link }));
  }, [link]);
  return (
    <>
      <DocHead title={tokenError ? "Ошибка входа" : "Добро пожаловать"} />
      <Header />
      {tokenPreloader && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white">
          <div className="mt-20 p-10 h-72 rounded-xl animate-pulse bg-[#E3E3E3] container mx-auto max-w-md"></div>
        </div>
      )}
      <div className="container mx-auto max-w-md px-5 pt-9 pb-4 mt-9 text-center flex flex-col items-center border-2 rounded-xl">
        {!tokenError && (
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
        )}

        {tokenError && (
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
        )}
        {tokenError ? (
          <h1 className="text-4xl font-bold mt-9">Произошла ошибка</h1>
        ) : (
          <h1 className="text-4xl font-bold mt-9">Добро пожаловать</h1>
        )}
        <Link href="/" className="w-full">
          <Button className="w-full py-3 mt-9">На главную</Button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
