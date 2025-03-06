import { getUserById } from "@/lib/user";

export const fetchUserById = async (id) => {
  if (!id) {
    throw new Error("ID tidak boleh kosong");
  }

  try {
    const user = await getUserById(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error("Gagal mengambil user:", error);
    throw error; // Kembalikan null atau bisa lempar error lagi tergantung kebutuhan
  }
};
