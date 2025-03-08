import { UseUser } from "@/context/UserContext";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ModalForm from "../ModalForm";
import Image from "next/image";
import { IMAGE_URL } from "@/utils/config";

const FotoModal = ({ isOpen, onClose, guru }) => {
  const { user, setUser } = UseUser();
  const [preview, setPreview] = useState("");
  const [oldPreview, setOldPreview] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (guru?.foto) {
      setOldPreview(`${IMAGE_URL}/${guru?.foto}`);
    }
  }, [guru]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFile(selectedFiles[0]);

    // Preview images
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foto", file);
    try {
      const data = await updateGuru(guru?.uuid, formData);
      // console.log("ini data update", data);

      toast({
        description: "Foto berhasil diubah",
      });
      setUser((prevUser) => ({
        ...prevUser,
        guru: {
          ...prevUser.guru,
          foto: data.payload?.foto, // Pastikan ini sesuai dengan struktur response dari API
        },
      }));
      onClose();
    } catch (error) {
      // console.error(error);
      toast({
        variant: "destructive",
        description: "Foto Gagal diubah",
      });
    }

    // setTimeout(() => {
    //   onClose;
    // }, 2000);
  };
  return (
    <div>
      <ModalForm isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-semibold mb-4">Ganti Foto Profil</h2>
        <div>
          <div>
            <Image
              src={preview[0] || oldPreview}
              alt="preview"
              width={80}
              height={80}
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              className="rounded-full"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="border p-2 rounded-lg"
            onChange={handleFileChange}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </ModalForm>
    </div>
  );
};

export default FotoModal;
