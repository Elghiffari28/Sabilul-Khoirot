"use client";
import { deleteBerita, getAllBerita, getBeritaById } from "@/lib/berita";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { IMAGE_URL } from "@/utils/config";
import { PencilIcon, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FormatTanggal } from "@/utils/FormatTanggal";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [beritaData, setBeritaData] = useState({});
  const [selectedBerita, setSelectedBerita] = useState(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBerita();
      setBeritaData(data?.payload);
    } catch (error) {
      throw new Error("Gagal Fetch Berita", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus berita ini?"
    );
    if (!confirmed) return;
    try {
      await deleteBerita(id);
      toast({
        description: "Berita berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <div>
          <Header judul={"Daftar Berita"} />
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-collapse ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Tanggal Dibuat</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-6 py-3">Foto</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {beritaData?.length > 0 ? (
                  beritaData.map((berita, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        {FormatTanggal(berita.createdAt)}
                      </td>
                      <td className="px-6 py-4">{berita.user.name}</td>
                      <td className="px-6 py-4">{berita.judul}</td>
                      <td className="px-6 py-4">
                        {berita.file.map((img, index) => (
                          <div
                            key={index}
                            className="w-1/3 flex flex-col items-center justify-center border-b border-collapse gap-4"
                          >
                            <Image
                              src={`${IMAGE_URL}/${img}`}
                              width={200}
                              height={200}
                              alt={`Karya ${berita.author}`}
                            />
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center items-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                          onClick={() => handleDelete(berita.uuid)}
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
            {beritaData?.length > 0 ? (
              beritaData.map((berita, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-lg overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    <p className="border-b-2">
                      <strong>Dibuat:</strong> {FormatTanggal(berita.createdAt)}
                    </p>
                    <p className="border-b-2">
                      <strong>Author:</strong> {berita.user?.name}
                    </p>
                    <p className="border-b-2">
                      <strong>Judul:</strong> {berita.judul}
                    </p>
                    <div className="border-b-2">
                      <strong>Foto:</strong>
                      <Image
                        src={`${IMAGE_URL}/${berita.file[0]}`}
                        width={200}
                        height={200}
                        alt={`Karya ${berita.user?.name}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex gap-2"
                      onClick={() => handleDelete(berita.uuid)}
                    >
                      Hapus
                      <span>
                        <Trash />
                      </span>
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
