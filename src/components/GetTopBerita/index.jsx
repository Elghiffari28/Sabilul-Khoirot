import React, { useState, useEffect, useCallback } from "react";
import { getTopBerita } from "@/lib/berita";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@/utils/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GetTopBerita = () => {
  const [topBerita, setTopBerita] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const fetchTopData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTopBerita();
      // console.log(data);
      setTopBerita(data?.payload || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopData();
  }, [fetchTopData]);

  console.log(topBerita);
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % topBerita.length); // Looping ke awal lagi
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + topBerita.length) % topBerita.length);
  };

  return (
    <div>
      <div className="py-5">
        <h1 className="text-center text-2xl lg:text-4xl font-bold">
          Berita Terbaru
        </h1>
      </div>
      <div className="w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation
          loop={true}
          modules={[Navigation]}
          className="w-full"
        >
          {topBerita.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[300px] group">
                <Link href={`/news/${item.uuid}`}>
                  <Image
                    src={`${IMAGE_URL}/${item.file[0]}`}
                    alt={item.judul}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full ">
                    {item.judul}
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GetTopBerita;
