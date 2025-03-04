"use client";
import { useRouter } from "next/navigation";
import {
  ChartPieSlice,
  Student,
  User,
  ImageSquare,
  ArticleNyTimes,
  Users,
  SignOut,
} from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const { user, setUser } = UseUser();
  const router = useRouter();
  const ADMIN_PREFIX = "/admin";
  const { toast } = useToast();

  const handleLogout = async () => {
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
      // console.log(data);
      if (data) {
        toast({
          description: "Logout Berhasil",
        });
        console.log("Logout berhasil");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
      } else {
        console.log("Logout gagal");
      }
    } catch (error) {
      console.error("Error sebelum logout", error);
    }
  };

  return (
    <div className="">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
          <div>
            <ul className="space-y-2 font-medium">
              <li className="mb-10 border-b-2 border-gray-300">
                <Link
                  href={`${ADMIN_PREFIX}/dashboard`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Image
                    src={"/logora.png"}
                    width={100}
                    height={100}
                    alt="logo RA"
                    className="h-12 w-auto"
                  />

                  <span className="ms-3">RA SABILUL KHOIROT</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/dashboard`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ChartPieSlice size={32} color="#b8b8b8" weight="fill" />

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/guru`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <User size={32} color="#b8b8b8" weight="fill" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Guru</span>
                  {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/siswa`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Student size={32} color="#b8b8b8" weight="fill" />

                  <span className="flex-1 ms-3 whitespace-nowrap">Siswa</span>
                  {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/karya`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ImageSquare size={32} color="#b8b8b8" weight="fill" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Karya</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/news`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ArticleNyTimes size={32} color="#b8b8b8" weight="fill" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Berita</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${ADMIN_PREFIX}/user`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Users size={32} color="#b8b8b8" weight="fill" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className=" border-t-2 border-gray-300">
            <button
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <SignOut size={32} color="#b8b8b8" weight="fill" />
              <span
                className="flex-1 ms-3 whitespace-nowrap"
                onClick={handleLogout}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
