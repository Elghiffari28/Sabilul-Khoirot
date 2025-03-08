import React, { useState, useEffect } from "react";
import ModalForm from "../ModalForm";
import { InputField } from "@/utils/config";
import { updateUser } from "@/lib/user";
import { useToast } from "@/hooks/use-toast";
import { ToastDescription } from "@radix-ui/react-toast";
import { UseUser } from "@/context/UserContext";

const AccountUserModal = ({ isOpen, onClose }) => {
  const { user, setUser } = UseUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Confirm Password harus sama!");
      return;
    }
    setError(""); // Reset error jika validasi berhasil
    try {
      const data = await updateUser(user?.uuid, formData); // Kirim data ke backend
      toast({
        description: "update user berhasil",
      });
      setUser((prevUser) => ({
        ...prevUser,
        email: data.payload?.email,
        password: data.payload?.password,
        confirmPassword: data.payload?.confirmPassword, // Pastikan ini sesuai dengan struktur response dari API
      }));
      // console.log(prevUser.user);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        description: "update user berhasil",
      });
    }
  };
  return (
    <div>
      <ModalForm isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-semibold mb-4">Ganti Foto Profil</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <InputField
                label={"email"}
                id={"email"}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"password"}
                id={"password"}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"Confirm Password"}
                id={"confirmPassword"}
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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

export default AccountUserModal;
