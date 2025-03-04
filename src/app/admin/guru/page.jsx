"use client";
import React, { useEffect, useState } from "react";
import { getAllGuru } from "@/lib/guru";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const page = () => {
  const [dataGuru, setDataGuru] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllGuru();
      setDataGuru(data.payload);
    } catch (error) {
      console.error(console.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus guru ini?"
    );
    if (!confirmed) return;
    try {
      await deleteGuru(id);
      toast({
        description: "Guru berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(dataGuru);
  if (!dataGuru) {
    return <p>Forbidden</p>;
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        <div>
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataGuru.map((guru, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {guru.name}
                    </th>
                    <td className="px-6 py-4">{guru.role}</td>
                    <td className="px-6 py-4">{guru.email}</td>
                    <td className="px-6 py-4">
                      {guru.role !== "admin" && (
                        <button
                          onClick={() => handleDelete(guru.uuid)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
