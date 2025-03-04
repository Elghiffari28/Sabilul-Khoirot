"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getBeritaById, getTopBerita } from "@/lib/berita";
import Image from "next/image";
import Carousel from "@/components/CarouselBerita";
import { FormatTanggal } from "@/utils/FormatTanggal";
import Link from "next/link";
import { IMAGE_URL } from "@/utils/config";

const page = () => {
  const params = useParams();
  const [berita, setBerita] = useState({});
  const [topBerita, setTopBerita] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    if (!params?.id) return;
    setIsLoading(true);
    try {
      const data = await getBeritaById(params?.id);
      // console.log(data);
      setBerita(data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopData = async () => {
    if (!params?.id) return;
    setIsLoading(true);
    try {
      const data = await getTopBerita(params?.id);
      // console.log(data);
      setTopBerita(data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
      fetchTopData();
    }
  }, [params?.id]);
  console.log("ini top berita", topBerita);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        <div className="p-4 lg:p-6 mx-4 my-4 md:mx-28 lg:mx-52 lg:my-12 bg-background">
          <article className="border-b-2 py-6 mb-10">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {berita?.judul}
              </h1>
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      <span>Oleh: </span>
                      {berita?.user?.name}
                    </a>

                    <p className="text-base text-gray-500 dark:text-gray-400">
                      <time pubdate="true">
                        {FormatTanggal(berita?.createdAt)}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
            </header>
            <Carousel images={berita?.file} judul={berita?.judul} />
            <div className="max-w-4xl mx-auto text-justify">
              {berita?.deskripsi
                ?.split("\n")
                .map((paragraph, index) =>
                  paragraph.trim() ? (
                    <p key={index}>{paragraph}</p>
                  ) : (
                    <br key={index} />
                  )
                )}
            </div>
          </article>
          <div className="py-5">
            <h1 className="text-center text-2xl lg:text-4xl font-bold">
              Berita Terbaru
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 max-w-3xl mx-auto">
            {topBerita?.map((item) => (
              <div
                key={item.uuid}
                className="group relative w-full h-44 overflow-hidden rounded-sm border-2 border-black"
              >
                <Image
                  src={`${IMAGE_URL}/${item.file[0]}`}
                  alt={item.judul}
                  width={400} // Atur ukuran sesuai kebutuhan
                  height={320} // Atur ukuran sesuai kebutuhan
                  className="object-cover w-full h-full"
                />
                <Link
                  href={`/news/${item.uuid}`}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <h5 className="text-white text-center text-xl font-bold">
                    {item.judul}
                  </h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
