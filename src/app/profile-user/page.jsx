"use client";
import { UseUser } from "@/context/UserContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IMAGE_URL, InputField } from "@/utils/config";
import ModalForm from "@/components/ModalForm";
import { useToast } from "@/hooks/use-toast";
import { updateGuru } from "@/lib/guru";
import Header from "@/components/Header";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormatTanggal } from "@/utils/FormatTanggal";
import FotoModal from "@/components/FotoModal";
import DataUserModal from "@/components/DataUserModal";
import AccountUserModal from "@/components/AccountUserModal";

const page = () => {
  const { user, setUser } = UseUser();
  const guru = user?.guru;
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // console.log("ini data user updated", user);
  // console.log("ini data file", file);
  // console.log("ini guru id", guru?.uuid);

  return (
    <div>
      <Header judul={"Profil Guru"} />
      {user && (
        <div className="grid grid-cols-2 px-4 md:px-8 lg:px-12 gap-4">
          {/* Section Foto Profil */}
          <div className="flex flex-col border-2 rounded-lg shadow-lg bg-bg_secondary col-span-2 md:col-span-1 w-full overflow-hidden">
            <div className="py-4 px-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">Foto Profil</h1>
            </div>
            <div className="flex flex-grow items-center p-6">
              <div className="w-24 h-24 border-2 rounded-md bg-bg_primary overflow-hidden">
                <Image
                  src={`${IMAGE_URL}/${user.guru.foto}`}
                  width={96}
                  height={96}
                  alt={`foto ${user.name}`}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user?.guru?.jabatan}</p>
              </div>
            </div>
            <div className="px-6 pb-6 w-1/2 md:w-1/3 mt-auto">
              <button
                onClick={() => setIsFotoModalOpen(true)}
                className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Edit Foto
              </button>
            </div>

            <FotoModal
              isOpen={isFotoModalOpen}
              onClose={() => setIsFotoModalOpen(false)}
              guru={guru}
            />
          </div>

          {/* Section Pengaturan Akun */}
          <div className="flex flex-col border-2 rounded-lg shadow-lg bg-bg_secondary col-span-2 md:col-span-1 w-full overflow-hidden">
            <div className="py-4 px-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">
                Pengaturan Akun
              </h1>
            </div>
            <div className="p-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 mb-2">
                  <strong>Nama:</strong> {user.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6 w-1/2 md:w-1/3">
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Ubah Data
              </button>
            </div>

            <AccountUserModal
              isOpen={isAccountModalOpen}
              onClose={() => setIsAccountModalOpen(false)}
              user={user}
            />
          </div>

          {/* Section Informasi Pribadi */}
          <div className="flex flex-col border-2 rounded-lg shadow-lg bg-bg_secondary col-span-2 w-full overflow-hidden">
            <div className="py-4 px-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">
                Informasi Pribadi
              </h1>
            </div>
            <div className="p-6 border-b-2">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <p className="text-gray-700 mb-2">
                    <strong>Nama:</strong> {user.name}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Jabatan:</strong> {guru?.jabatan}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Gender:</strong> {guru.gender}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>NIK:</strong> {guru.nik}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Agama:</strong> {guru.agama}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>No Handphone:</strong> {guru.nohp}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Tempat Lahir:</strong> {guru.tempat_lahir}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Tanggal Lahir:</strong>{" "}
                    {FormatTanggal(guru.tanggal_lahir)}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-700 mb-2">
                    <strong>NRG:</strong> {guru.nrg}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>No SK Awal:</strong> {guru.no_sk_awal}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Tahun Masuk:</strong> {guru.tahun_masuk}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Alamat:</strong> {guru.alamat}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-6 w-1/2 md:w-1/3 mt-auto ">
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Ubah Data
              </button>
            </div>

            <DataUserModal
              isOpen={isFormModalOpen}
              onClose={() => setIsFormModalOpen(false)}
              guru={guru}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
