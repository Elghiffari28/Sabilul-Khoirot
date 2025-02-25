"use client";
import { getKaryaById } from "@/lib/karya";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import Comment from "@/components/Comment";
import { FormatTanggal } from "@/utils/FormatTanggal";

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
          <h1>ini detai page</h1>
          <h2>{karya.judul}</h2>
          <h3>{FormatTanggal(karya.createdAt)}</h3>
          <h3>{karya.author}</h3>
          <Image
            src={karya.file ? `${imageURL}/${karya.file}` : "/placeholder.jpg"}
            width={100}
            height={100}
            alt="Gambar Karya"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            quality={60}
            format="webp"
            className=""
          />
          <p>{karya.deskripsi}</p>

          <Comment karya={karya} fetchData={fetchData} />
        </div>
      )}
    </div>
  );
};

export default page;
