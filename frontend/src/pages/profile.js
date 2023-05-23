import DocHead from "@/components/DocHead";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Button from "@/components/UI/Button";
import {
  fetchUserInfoReducer,
  updateUserInfoReducer,
} from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({
    rl_name: user.rl_name,
    address: user.address,
    phone: user.phone,
    birthday: user.birthday,
  });

  useEffect(() => {
    setUpdateData({
      rl_name: user.rl_name,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
    });
  }, [user, setUpdateData]);

  const saveHandler = async () => {
    await dispatch(
      updateUserInfoReducer({
        tg_id: user.tg_id,
        rl_name: updateData.rl_name,
        address: updateData.address,
        phone: updateData.phone,
        birthday: updateData.birthday,
      })
    );
    dispatch(fetchUserInfoReducer());
  };
  return (
    <>
      <DocHead title="Профиль" />
      <Header />
      <div className="container mx-auto max-w-8xl mt-8">
        <h1 className="text-4xl font-bold">Ваш профиль</h1>
        <div className="flex flex-col">
          <div className="p-5 flex flex-col rounded-xl border-2 mt-3 max-w-[50%]">
            <b>Изменение данных</b>

            <div className="mt-5">
              <div>Имя</div>
              <Input
                value={updateData.rl_name}
                onChange={(e) => {
                  setButtonDisabled(false);
                  return setUpdateData({
                    ...updateData,
                    rl_name: e.target.value,
                  });
                }}
                className="w-full"
              />
            </div>

            <div className="mt-5">
              <div>Адрес</div>
              <Input
                value={updateData.address}
                onChange={(e) => {
                  setButtonDisabled(false);
                  return setUpdateData({
                    ...updateData,
                    address: e.target.value,
                  });
                }}
                className="w-full"
              />
            </div>

            <div className="mt-5">
              <div>Телефон</div>
              <Input
                value={updateData.phone}
                onChange={(e) => {
                  setButtonDisabled(false);
                  return setUpdateData({
                    ...updateData,
                    phone: e.target.value,
                  });
                }}
                className="w-full"
              />
            </div>

            <div className="mt-5">
              <div>День рождения</div>
              <Input
                value={updateData.birthday}
                onChange={(e) => {
                  setButtonDisabled(false);
                  return setUpdateData({
                    ...updateData,
                    birthday: e.target.value,
                  });
                }}
                className="w-full"
              />
            </div>

            <Button
              disabled={buttonDisabled}
              onClick={() => saveHandler()}
              className="mt-6 p-2"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
