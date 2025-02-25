"use client";

import React, { useState } from "react";

import Image from "next/image";
import Navigation from "./Navigation";
import { usePathname, useRouter } from "next/navigation";
import CurrentTime from "@/components/CurrentTime";
import Link from "next/link";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { UseUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { user, setUser } = UseUser("");
  const [isOpen, setIsOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const isAdminRoute = pathname.startsWith("/admin");
  const { toast } = useToast();
  if (isAdminRoute) return null;

  const handleLogout = async () => {
    if (user) {
      try {
        const response = await fetch("http://localhost:3001/logout", {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          console.log("Logout gagal:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        console.log(data);
        if (data) {
          toast({
            description: "Logout Berhasil",
          });
          console.log("Logout berhasil");
          localStorage.removeItem("user");
          setUser(null);
          setIsOpen(false);
          setIsMobileMenuOpen(false);
          router.push("/dashboard");
        } else {
          console.log("Logout gagal");
        }
      } catch (error) {
        console.error("Error sebelum logout", error);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="">
      <nav className="bg-bg_secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0 flex gap-4 items-center justify-center">
                <Image
                  className="size-8"
                  src="/logora.png"
                  alt="RA Sabilul Khoirot"
                  width={350}
                  height={350}
                  priority
                />
                <Link
                  href={"/dashboard"}
                  className="text-dark font-semibold text-xl md:text-2xl md:hidden lg:block"
                >
                  RA SABILUL KHOIROT
                </Link>
              </div>
              <div className="hidden md:block">
                <Navigation />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div>
                    {user ? (
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="size-8 rounded-full bg-bg_primary"
                          src={
                            user?.guru?.foto
                              ? `${BASE_URL}/image/${user?.guru?.foto}`
                              : "/placeholder.jpg"
                          }
                          alt="Foto Guru"
                          width={350}
                          height={350}
                          placeholder="blur"
                          blurDataURL="/placeholder.jpg"
                        />
                      </button>
                    ) : (
                      <Link
                        href="/"
                        className="px-2 py-1 bg-bg_secondary border-2 border-black text-black font-medium rounded-lg shadow-lg flex"
                      >
                        <span className="mr-2">Login</span>
                        <SignIn size={24} />
                      </Link>
                    )}
                  </div>

                  {/* <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              --> */}
                  {isOpen && (
                    <div
                      className="absolute px-2 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-bg_primary py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      {/* <!-- Active: "bg-gray-100 outline-none", Not Active: "" --> */}
                      <Link
                        href="/profile-user"
                        className="block px-4 py-2 text-sm text-dark hover:bg-bg_secondary rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>

                      <button
                        className="block px-4 py-2 text-sm w-full text-dark hover:bg-bg_secondary rounded-md"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                        onClick={handleLogout}
                      >
                        <span className="flex justify-start">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md bg-bg_primary p-2 text-dark  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {isMobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link
                href="/dashboard"
                className="block rounded-md  px-3 py-2 text-base font-medium text-dark"
                aria-current="page"
              >
                Beranda
              </Link>
              <Link
                href="/guru"
                className="block rounded-md px-3 py-2 text-base font-medium text-dark hover:bg-gray-700 hover:text-white"
              >
                Guru
              </Link>
              <Link
                href="/karya"
                className="block rounded-md px-3 py-2 text-base font-medium text-dark hover:bg-gray-700 hover:text-white"
              >
                Karya
              </Link>
              <Link
                href="/news"
                className="block rounded-md px-3 py-2 text-base font-medium text-dark hover:bg-gray-700 hover:text-white"
              >
                Berita
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-dark hover:bg-gray-700 hover:text-white"
              >
                Kontak
              </Link>
            </div>
            {user ? (
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <Image
                      className="size-10 rounded-full"
                      src={
                        user?.guru?.foto
                          ? `${BASE_URL}/image/${user?.guru?.foto}`
                          : "/placeholder.jpg"
                      }
                      alt="Foto Guru"
                      width={350}
                      height={350}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base/5 font-medium text-dark">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-dark">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {user && (
                    <Link
                      href="/profile-user"
                      className="block rounded-md px-3 py-2 mx-auto text-base font-medium text-dark hover:bg-bg_primary "
                    >
                      Your Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block rounded-md w-full ml-auto px-3 py-2 text-base font-medium text-dark hover:bg-bg_primary"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center mb-3">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/"
                  className="w-auto mb-4  px-3 py-2 text-base rounded-lg shadow-lg font-medium text-black hover:bg-gray-700 hover:text-white text-center bg-white flex"
                >
                  <span className="mr-2">Login</span>
                  <SignIn size={24} />
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
