import React, { useState, useEffect } from "react";
import ModalForm from "../ModalForm";
import { InputField } from "@/utils/config";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/user";

const ModalAdminUser = ({ isOpen, onClose, userData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const user = userData?.payload;
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // console.log("ini apalah", userData);
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
    try {
      await updateUser(user?.uuid, formData); // Kirim data ke backend
      toast({
        description: "update user berhasil",
      });

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
                value={formData.name ?? ""}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"email"}
                id={"email"}
                name="email"
                type="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"password"}
                id={"password"}
                name="password"
                type="password"
                value={formData.password ?? ""}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={"confirm Password"}
                id={"confirmPassword"}
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword ?? ""}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
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

export default ModalAdminUser;
