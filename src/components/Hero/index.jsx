import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Link2Icon } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <section className="bg-[#443627]">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              RA SABILUL KHOIROT
            </h1>
            <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-gray-400">
              Bersama UMMI dan RA Sabilul Khoirot, Mari membangun generasi
              Qur'ani
            </p>
            <div className="p-2 border-2 rounded-md shadow-md bg-bg_secondary w-52 flex justify-center">
              <Link href={"/kontak"} className="flex text-white ">
                Hubungi Kami
                <span className="text-white ml-2">
                  <Link2Icon />
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src={"/placeholder.jpg"}
              width={250}
              height={250}
              alt="Foto Hero"
              className="h-96 w-96"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
