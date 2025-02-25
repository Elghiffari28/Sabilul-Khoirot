"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllKarya } from "@/lib/karya";

const page = () => {
  const [karya, setKarya] = useState({});
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
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
    <div className="p-12">
      <div className="mb-5 flex justify-end">
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
                src={`${imageURL}/${item.file}`}
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
