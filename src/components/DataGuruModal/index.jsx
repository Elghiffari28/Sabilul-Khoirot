import React, { useEffect, useState } from "react";
import { UseUser } from "@/context/UserContext";
import { InputField } from "@/utils/config";
import ModalForm from "../ModalForm";
import { updateGuru } from "@/lib/guru";
import { useToast } from "@/hooks/use-toast";

const DataGuruModal = ({ isOpen, onClose, guru }) => {
  const { user, setUser } = UseUser();
  const [formData, setFormData] = useState({
    name: "",
    nrg: "",
    agama: "",
    nohp: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    jabatan: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (guru) {
      setFormData({
        name: guru.name || "",
        nrg: guru.nrg || "",
        agama: guru.agama || "",
        nohp: guru.nohp || "",
        tempat_lahir: guru.tempat_lahir || "",
        tanggal_lahir: guru.tanggal_lahir || "",
        alamat: guru.alamat || "",
        jabatan: guru.jabatan || "",
      });
    }
  }, [guru]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateGuru(guru?.uuid, formData); // Kirim data ke backend
      toast({
        description: "update user berhasil",
      });
      setUser((prevUser) => ({
        ...prevUser,
        guru: {
          ...prevUser.guru,
          name: data.payload?.name,
          nrg: data.payload?.nrg,
          agama: data.payload?.agama,
          nohp: data.payload?.nohp,
          tempat_lahir: data.payload?.tempat_lahir,
          tanggal_lahir: data.payload?.tanggal_lahir,
          alamat: data.payload?.alamat,
          jabatan: data.payload?.jabatan, // Pastikan ini sesuai dengan struktur response dari API
        },
      }));
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        description: "update user gagal!",
      });
    }
  };
  return (
    <div>
      <ModalForm isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-semibold mb-4">Ubah Informasi Pribadi</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"nama"}
                id={"nama"}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"nrg"}
                id={"nrg"}
                name="nrg"
                value={formData.nrg}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"agama"}
                id={"agama"}
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"nohp"}
                id={"nohp"}
                name="nohp"
                value={formData.nohp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"tempat Lahir"}
                id={"tempatLahir"}
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"tanggal Lahir"}
                id={"tanggalLahir"}
                name="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <label htmlFor="alamat" className="font-medium capitalize">
                Alamat
              </label>
              <textarea
                name="alamat"
                id="alamat"
                onChange={handleChange}
                value={formData.alamat}
                className="border-2 rounded-md p-2 min-h-32"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Simpan
          </button>
        </form>
      </ModalForm>
    </div>
  );
};

export default DataGuruModal;
