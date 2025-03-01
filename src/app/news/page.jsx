"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { getAllBerita } from "@/lib/berita";
import Header from "@/components/Header";

const Page = () => {
  const { user, setUser } = UseUser();
  const [berita, setBerita] = useState({});
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBerita();
        console.log("Ini adalah data berita", data);
        setBerita(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header
        judul={"Berita"}
        deskripsi={"Berita seputar RA Sabilul Khoirot"}
      />
      <div className="flex justify-start mb-5">
        {user ? (
          <Link
            href={"/news/add"}
            className="p-2 bg-bg_secondary rounded-md shadow-md mb-5"
          >
            <span>Tambah Berita</span>
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {berita?.payload?.length > 0 ? (
          berita?.payload?.map((item) => (
            <div
              key={item.uuid}
              className="max-w-sm h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <Image
                src={`${imageURL}/${item.file[0]}`}
                width={100}
                height={100}
                alt="Gambar Karya"
                className="w-full h-80 object-fill"
                priority
              />

              <div className="p-5">
                <Link href={`/news/${item.uuid}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate hover:text-clip">
                    {item.judul}
                  </h5>
                </Link>
                <Link
                  href={`/news/${item.uuid}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-bg_secondary rounded-md"
                >
                  Detail
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada Berita tersedia</p>
        )}
      </div>
    </div>
  );
};

export default Page;
