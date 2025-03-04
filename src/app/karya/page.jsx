"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllKarya } from "@/lib/karya";
import Header from "@/components/Header";
import { IMAGE_URL } from "@/utils/config";

const page = () => {
  const [karya, setKarya] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllKarya();
        console.log("ini data karya", data);
        setKarya(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header
        judul={"Karya Siswa"}
        deskripsi={"Kumpulan karya siswa RA Sabilul Khoirot"}
      />
      <div className="mb-5 flex justify-center md:justify-end">
        <Link
          href={"/karya/add"}
          className="p-2 bg-bg_secondary rounded-md shadow-md"
        >
          Tambah Karyamu Disini
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {karya?.payload?.length > 0 ? (
          karya?.payload?.map((item) => (
            <div
              key={item.uuid}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <Image
                src={`${IMAGE_URL}/${item.file}`}
                width={100}
                height={100}
                alt="Gambar Karya"
                className="w-full h-80 object-fill"
                priority
              />

              <div className="p-5">
                <Link href={`/karya/${item.uuid}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.judul}
                  </h5>
                </Link>
                <Link
                  href={`/karya/${item.uuid}`}
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
          <p>Tidak ada Karya tersedia</p>
        )}
      </div>
    </div>
  );
};

export default page;
