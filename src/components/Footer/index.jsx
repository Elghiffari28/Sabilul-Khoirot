"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  XLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <footer className="relative bg-bg_secondary pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl fonat-semibold text-blueGray-700">
                Hubungi Kami!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Temukan kami di platform mana pun, kami akan merespons dalam 1-2
                hari kerja.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6 flex gap-4">
                <Link
                  href="/"
                  className="bg-white text-lightBlue-400 shadow-lg w-12 h-12 flex items-center justify-center rounded-full outline-none focus:outline-none overflow-hidden transition-all duration-300 hover:bg-gray-200"
                >
                  <FacebookLogo size={32} />
                </Link>

                <Link
                  href="/"
                  className="bg-white text-black shadow-lg w-12 h-12 flex items-center justify-center rounded-full outline-none focus:outline-none overflow-hidden transition-all duration-300 hover:bg-gray-200"
                >
                  <TiktokLogo size={32} />
                </Link>

                <Link
                  href="/"
                  className="bg-white text-pink-500 shadow-lg w-12 h-12 flex items-center justify-center rounded-full outline-none focus:outline-none overflow-hidden transition-all duration-300 hover:bg-gray-200"
                >
                  <InstagramLogo size={32} />
                </Link>

                <Link
                  href="/"
                  className="bg-white text-blueGray-800 shadow-lg w-12 h-12 flex items-center justify-center rounded-full outline-none focus:outline-none overflow-hidden transition-all duration-300 hover:bg-gray-200"
                >
                  <XLogo size={32} />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/"
                      >
                        Beranda
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/karya"
                      >
                        Karya
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/news"
                      >
                        Berita
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="/kontak"
                      >
                        Kontak
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Partnership
                    </h3>
                    <ul className="text-gray-400 dark:text-gray-500 space-y-4">
                      <li className="flex items-center space-x-3">
                        <Image
                          src="/kemenag.png"
                          alt="Logo Kemenag Majalengka"
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                        <Link
                          href="https://www.madrasahmajalengka.info/"
                          className="text-black hover:underline"
                        >
                          Kemenag Majalengka
                        </Link>
                      </li>

                      <li className="flex items-center space-x-3">
                        <Image
                          src="/UMMI.png"
                          alt="Logo Ummi Foundation"
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                        <Link
                          href="https://ummifoundation.org/"
                          className="text-black dark:text-gray-300 hover:underline"
                        >
                          Ummi Foundation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">{year}</span>
                <span className="text-blueGray-500"> RA Sabilul Khoirot</span>
                <span> | Developed By </span>
                <Link
                  href="https://www.linkedin.com/in/elba-ghiffari-fitrasina/"
                  className="text-blueGray-500 hover:text-gray-800 hover:underline"
                >
                  <span>Elghiffari</span>
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
