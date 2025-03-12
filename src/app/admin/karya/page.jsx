"use client";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { deleteKarya, getAllKarya } from "@/lib/karya";
import { IMAGE_URL } from "@/utils/config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PencilIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [karya, setKarya] = useState({});
  const { toast } = useToast();
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllKarya();
      setKarya(data.payload);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus karya ini?"
    );
    if (!confirmed) return;
    try {
      await deleteKarya(id);
      toast({
        description: "Karya berhasil dihapus",
      });
      // router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("ini data karya", karya);
  if (!karya) {
    return <p>Forbidden</p>;
  }
  return (
    <div>
      <Loading isLoading={isLoading}>
        <div>
          <Header judul={"Karya"} />
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-collapse ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Pembuat</th>
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-6 py-3">Deskripsi</th>
                  <th className="px-6 py-3">file</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karya?.length > 0 ? (
                  karya.map((kry, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{kry.author}</td>
                      <td className="px-6 py-4">{kry.judul}</td>
                      <td className="px-6 py-4">{kry.deskripsi}</td>
                      <td className="px-6 py-4">
                        <Image
                          src={`${IMAGE_URL}/${kry.file}`}
                          width={200}
                          height={200}
                          alt={`Karya ${kry.author}`}
                        />
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center items-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                          onClick={() => handleDelete(kry.uuid)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Karya tidak ada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden grid gap-4">
            {karya?.length > 0 ? (
              karya.map((kry, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-lg overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    <p className="border-b-2">
                      <strong>Pembuat:</strong> {kry.author}
                    </p>
                    <p className="border-b-2">
                      <strong>Judul:</strong> {kry.judul}
                    </p>
                    <p className="border-b-2">
                      <strong>Deskripsi:</strong> {kry.deskripsi}
                    </p>
                    <p className="border-b-2">
                      <strong>Foto:</strong>
                      <Image
                        src={`${IMAGE_URL}/${kry.file}`}
                        width={200}
                        height={200}
                        alt={`Karya ${kry.author}`}
                      />
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded flex gap-2 justify-center items-center"
                      onClick={() => handleUpdate(guru.uuid)}
                    >
                      <span>Edit</span>
                      <PencilIcon />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(guru.uuid)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Karya tidak ada</p>
            )}
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default page;
