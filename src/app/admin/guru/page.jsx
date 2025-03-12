"use client";
import React, { useEffect, useState } from "react";
import { getAllGuru, getGuruById } from "@/lib/guru";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Header from "@/components/Header";
import { PencilIcon, Plus } from "lucide-react";
import DataGuruModal from "@/components/DataGuruModal";
import { deleteGuru } from "@/lib/guru";
import Image from "next/image";
import { IMAGE_URL } from "@/utils/config";

const page = () => {
  const [dataGuru, setDataGuru] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState(null);
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
  const handleUpdate = async (uuid) => {
    try {
      const data = await getGuruById(uuid); // Ambil data user berdasarkan UUID
      // console.log("ini data user", data);
      setSelectedGuru(data); // Simpan data user ke state
      setIsModalOpen(true); // Buka modal setelah data siap
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

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
          <Header judul={"Data Guru"} />

          <div className="p-2 rounded-lg shadow-lg bg-bg_secondary flex gap-2 w-44 mb-4">
            <button className="" onClick={() => setIsModalOpen(true)}>
              Tambah Guru
            </button>
            <Plus />
          </div>
          {/* Tampilkan sebagai tabel di layar besar */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">NRG</th>
                  <th className="px-6 py-3">NIK</th>
                  <th className="px-6 py-3">No SK Awal</th>
                  <th className="px-6 py-3">Gender</th>
                  <th className="px-6 py-3">Agama</th>
                  <th className="px-6 py-3">No HP</th>
                  <th className="px-6 py-3">Tahun Masuk</th>
                  <th className="px-6 py-3">Tempat Lahir</th>
                  <th className="px-6 py-3">Tanggal Lahir</th>
                  <th className="px-6 py-3">Alamat</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3">Foto</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataGuru.map((guru, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{guru.name}</td>
                    <td className="px-6 py-4">{guru.nrg}</td>
                    <td className="px-6 py-4">{guru.nik}</td>
                    <td className="px-6 py-4">{guru.no_sk_awal}</td>
                    <td className="px-6 py-4">{guru.gender}</td>
                    <td className="px-6 py-4">{guru.agama}</td>
                    <td className="px-6 py-4">{guru.nohp}</td>
                    <td className="px-6 py-4">{guru.tahun_masuk}</td>
                    <td className="px-6 py-4">{guru.tempat_lahir}</td>
                    <td className="px-6 py-4">{guru.tanggal_lahir}</td>
                    <td className="px-6 py-4">{guru.alamat}</td>
                    <td className="px-6 py-4">{guru.jabatan}</td>
                    <td className="px-6 py-4">
                      <Image
                        src={`${IMAGE_URL}/${guru.foto}`}
                        width={100}
                        height={100}
                        alt={`Foto ${guru.name}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          onClick={() => handleUpdate(guru.uuid)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                          onClick={() => handleDelete(guru.uuid)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tampilkan sebagai kartu di layar kecil */}
          <div className="md:hidden grid gap-4">
            {dataGuru.map((guru, index) => (
              <div key={index} className="bg-white p-4 shadow rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <p className="border-b-2">
                    <strong>Nama:</strong> {guru.name}
                  </p>
                  <p className="border-b-2">
                    <strong>NRG:</strong> {guru.nrg}
                  </p>
                  <p className="border-b-2">
                    <strong>NIK:</strong> {guru.nik}
                  </p>
                  <p className="border-b-2">
                    <strong>No SK Awal:</strong> {guru.no_sk_awal}
                  </p>
                  <p className="border-b-2">
                    <strong>Gender:</strong> {guru.gender}
                  </p>
                  <p className="border-b-2">
                    <strong>Agama:</strong> {guru.agama}
                  </p>
                  <p className="border-b-2">
                    <strong>No Handphone:</strong> {guru.nohp}
                  </p>
                  <p className="border-b-2">
                    <strong>Tahun Masuk:</strong> {guru.tahun_masuk}
                  </p>
                  <p className="border-b-2">
                    <strong>Tempat Lahir:</strong> {guru.tempat_lahir}
                  </p>
                  <p className="border-b-2">
                    <strong>Tanggal Lahir:</strong> {guru.tanggal_lahir}
                  </p>
                  <p className=" border-b-2">
                    <strong>Alamat:</strong> {guru.alamat}
                  </p>
                  <p className="border-b-2">
                    <strong>Jabatan:</strong> {guru.jabatan}
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
            ))}
          </div>
          <DataGuruModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            guru={selectedGuru?.payload}
          />
        </div>
      )}
    </div>
  );
};

export default page;
