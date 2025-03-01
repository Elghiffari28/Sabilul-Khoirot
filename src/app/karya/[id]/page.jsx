"use client";
import { getKaryaById } from "@/lib/karya";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import Comment from "@/components/Comment";
import { FormatTanggal } from "@/utils/FormatTanggal";
import Header from "@/components/Header";

const page = () => {
  const { user, setUser } = UseUser();
  const [karya, setKarya] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { toast } = useToast();

  if (!params?.id) return;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getKaryaById(params?.id);
      // console.log(data);
      setKarya(data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params?.id]);

  // console.log("ini params", params.id);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        <div>
          <Header judul={`Karya ${karya.author}`} />
          <div className="flex flex-col md:flex-row p-12 bg-bg_third my-12 mx-12 rounded-md">
            <div className="w-full md:w-1/2 px-0 md:px-4 flex justify-center items-center">
              <Image
                src={
                  karya.file ? `${imageURL}/${karya.file}` : "/placeholder.jpg"
                }
                width={100}
                height={100}
                alt="Gambar Karya"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                quality={60}
                format="webp"
                className="h-96 w-full object-contain"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8 uppercase">
                {karya.judul}
              </h1>
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-base md:text-xl font-semibold text-gray-900 dark:text-white"
                    >
                      <span>Oleh: </span>
                      {karya?.author}
                    </a>

                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                      <time pubdate="true">
                        {FormatTanggal(karya?.createdAt)}
                      </time>
                    </p>
                  </div>
                </div>
              </address>

              <div className="max-w-4xl mx-auto text-justify">
                {karya?.deskripsi
                  ?.split("\n")
                  .map((paragraph, index) =>
                    paragraph.trim() ? (
                      <p key={index}>{paragraph}</p>
                    ) : (
                      <br key={index} />
                    )
                  )}
              </div>
            </div>
          </div>

          <Comment karya={karya} fetchData={fetchData} />
        </div>
      )}
    </div>
  );
};

export default page;
