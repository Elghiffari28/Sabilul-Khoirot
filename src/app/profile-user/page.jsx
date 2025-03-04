"use client";
import { UseUser } from "@/context/UserContext";
import Image from "next/image";
import React, { useState } from "react";
import { IMAGE_URL } from "@/utils/config";
import ModalForm from "@/components/ModalForm";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { user, setUser } = UseUser();
  const guru = user?.guru;
  console.log("ini data guru", guru);
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      description: "Form Submitted",
    });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Open Form
        </button>

        <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-semibold mb-4">Form Modal</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded-lg"
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
      {/* Profile Section */}
      <div id="Photo-Profile">
        <h1>Foto Profil</h1>
        <div className="flex">
          <div>
            <Image
              src={`${IMAGE_URL}/${guru?.foto}`}
              width={100}
              height={100}
              alt="Foto Guru"
            />
          </div>
        </div>
      </div>
      <h1>ini adalah halaman profile user</h1>
      <p>{user?.guru?.nrg}</p>
    </div>
  );
};

export default page;
