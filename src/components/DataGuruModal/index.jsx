import React, { useEffect, useState } from "react";
import { UseUser } from "@/context/UserContext";
import { InputField } from "@/utils/config";
import ModalForm from "../ModalForm";
import { createGuru, updateGuru } from "@/lib/guru";
import { useToast } from "@/hooks/use-toast";

const DataGuruModal = ({ isOpen, onClose, guru }) => {
  const { user, setUser } = UseUser();
  const [formData, setFormData] = useState({
    name: "",
    nrg: "",
    nik: "",
    no_sk_awal: "",
    gender: "",
    agama: "",
    nohp: "",
    tahun_masuk: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    jabatan: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const isEditing = !!guru;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: guru.name || "",
        nrg: guru.nrg || "",
        nik: guru.nik || "",
        no_sk_awal: guru.no_sk_awal || "",
        gender: guru.gender || "",
        agama: guru.agama || "",
        nohp: guru.nohp || "",
        tahun_masuk: guru.tahun_masuk || "",
        tempat_lahir: guru.tempat_lahir || "",
        tanggal_lahir: guru.tanggal_lahir || "",
        alamat: guru.alamat || "",
        jabatan: guru.jabatan || "",
      });
    } else {
      setFormData({
        name: "",
        nrg: "",
        nik: "",
        no_sk_awal: "",
        gender: "",
        agama: "",
        nohp: "",
        tahun_masuk: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        alamat: "",
        jabatan: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [guru, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Mode Edit: Panggil API update
        await updateGuru(guru?.uuid, formData);
        toast({ description: "Update guru berhasil" });
      } else {
        // Mode Tambah: Panggil API tambah guru
        await createGuru(formData);
        toast({ description: "Tambah guru berhasil" });
      }
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        description: "update user gagal!",
      });
    }
  };

  // console.log("ini data guru", guru);
  return (
    <div>
      <ModalForm isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-semibold mb-4">Ubah Informasi Pribadi</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Nama"
                id="nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="NRG"
                id="nrg"
                name="nrg"
                value={formData.nrg}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="NIK"
                id="nik"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="No SK Awal"
                id="no_sk_awal"
                name="no_sk_awal"
                value={formData.no_sk_awal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Gender"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Agama"
                id="agama"
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="No HP"
                id="no_hp"
                name="nohp"
                value={formData.nohp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Tahun Masuk"
                id="tahun_masuk"
                name="tahun_masuk"
                value={formData.tahun_masuk}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Tempat Lahir"
                id="tempat_lahir"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Tanggal Lahir"
                id="tanggal_lahir"
                name="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
              />
            </div>

            {/* Textarea khusus untuk Alamat */}
            <div className="col-span-2">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.alamat}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label="Jabatan"
                id="jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                required
              />
              <p className="text-xs">
                (Pisahkan dengan tanda , (Koma) untuk yang mempunyai jabatan
                lebih dari satu)
              </p>
            </div>
            {!isEditing && (
              <div className="col-span-2 grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-1">
                  <InputField
                    label="password"
                    id="password"
                    name="password"
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-1">
                  <InputField
                    label="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            {isEditing ? "Update" : "Tambah"}
          </button>
        </form>
      </ModalForm>
    </div>
  );
};

export default DataGuruModal;
