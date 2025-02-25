"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Carousel = ({ images, judul }) => {
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  console.log("ini carousel", images);
  return (
    <div>
      {!images ? (
        <figure className="p-2 bg-background w-full max-w-4xl mx-auto mb-12 border-b-2">
          <Image
            src={"/placeholder.jpg"}
            alt={"Slide"}
            width={100}
            height={100}
            className="w-full h-96 object-contain"
          />
          <figcaption className="lowercase text-center">{judul}</figcaption>
        </figure>
      ) : (
        <div className="  max-w-4xl mx-auto mb-12 border-b-2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="rounded-md overflow-hidden"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <figure className="p-2 bg-background w-full mb-10">
                  <Image
                    src={`${imageURL}/${src}`}
                    alt={`Slide ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-96 object-contain"
                  />
                  <figcaption className="lowercase text-center">
                    {judul}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Carousel;
