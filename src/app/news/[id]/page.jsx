"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getBeritaById } from "@/lib/berita";
import Image from "next/image";

const page = () => {
  const params = useParams();
  const [berita, setBerita] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
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

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        <div>
          <h1>{berita?.judul}</h1>
          {berita?.file?.length > 0 ? (
            berita?.file?.map((img, index) => (
              <div key={index}>
                <Image
                  src={`${imageURL}/${img}`}
                  width={100}
                  height={100}
                  alt="Gambar berita"
                />
              </div>
            ))
          ) : (
            <p>tidak ada gamabr</p>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
