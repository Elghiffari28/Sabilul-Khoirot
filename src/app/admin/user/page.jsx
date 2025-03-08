"use client";
import { deleteUser, getAllUser, updateUser, getUserById } from "@/lib/user";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { TrashIcon, PencilIcon } from "lucide-react";
import ModalAdminUser from "@/components/ModalAdminUser";

const page = () => {
  const [dataUser, setDataUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { toast } = useToast();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUser();
      setDataUser(data.payload);
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
      "Apakah Anda yakin ingin menghapus komentar ini?"
    );
    if (!confirmed) return;
    try {
      await deleteUser(id);
      toast({
        description: "User berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (uuid) => {
    try {
      const data = await getUserById(uuid); // Ambil data user berdasarkan UUID
      // console.log("ini data user", data);
      setSelectedUser(data); // Simpan data user ke state
      setIsModalOpen(true); // Buka modal setelah data siap
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // console.log(dataUser);
  if (!dataUser) {
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
          <div className="relative max-w-full w-full overflow-x-auto rounded-lg">
            <table className="w-full min-w-[600px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
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
                {dataUser.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.role !== "admin" && (
                        <div className="flex flex-wrap justify-center items-center gap-2">
                          <button
                            onClick={() => handleDelete(user.uuid)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Hapus
                          </button>

                          <button
                            onClick={() => handleUpdate(user.uuid)}
                            className="bg-green-500 text-white p-2 rounded flex justify-center gap-2 items-center"
                          >
                            <span>Ubah</span>
                            <PencilIcon />
                          </button>

                          <ModalAdminUser
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            userData={selectedUser}
                          />
                        </div>
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
