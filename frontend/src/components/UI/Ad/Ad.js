import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { useEffect, useState } from "react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const Ad = () => {
  const [banners, setBanners] = useState();

  const fetchBanners = async () => {
    const res = await axiosQuery.get("/promobanners");
    setBanners(res.data);
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  console.log(banners);
  return (
    <div className={`rounded-3xl max-h-72 overflow-hidden bg-cover`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {banners &&
          banners.map((banner) => (
            <SwiperSlide>
              <img src={banner.image_src} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Ad;
