"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getMe } from "@/lib/api";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import GetTopBerita from "@/components/GetTopBerita";

const page = () => {
  return (
    <div>
      <Hero />
      <GetTopBerita />
      <section
        className="bg-white dark:bg-gray-900 my-10 rounded-lg"
        id="fasilitas"
      >
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Fasilitas Sekolah
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Fasilitas sekolah merujuk pada berbagai sarana dan prasarana yang
              disediakan untuk mendukung proses pembelajaran dan kegiatan lain
              di lingkungan sekolah.
            </p>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Perpustakaan
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Perpustakaan yang bisa digunakan oleh siswa siswa RA Sabilul
                Khoirot
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Permainan Anak
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Banyak berbagai macam permainan yang bisa digunakan oleh
                anak-anak
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Kelas Belajar
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Terdapat 4 ruang kelas yang dipakai untuk kegiatan belajar
                mengajar
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                Kantin Sekolah
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Tersedia juga kantin sekolah
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y-2 border-gray-400 my-10">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                "Pendidikan Bukan Hanya Pergi Ke Sekolah dan Mendapatkan Gelar,
                Tapi juga soal Pengetahuan dan Menyerap Ilmu Pengetahuan."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <Image
                className="w-6 h-6 rounded-full"
                src="https://th-thumbnailer.cdn-si-edu.com/NsbtEgnTLcs0MQ321HpZ1lyGLT0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/20130423093032Shakuntala-devi.jpg"
                alt="profile picture"
                width={100}
                height={100}
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Sakunthala Devi
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Astrologer & Writer
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default page;
