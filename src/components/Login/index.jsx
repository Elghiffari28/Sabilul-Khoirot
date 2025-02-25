"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/lib/api";
import { UseUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const Login = () => {
  const { user, setUser } = UseUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [user, router]);

  const Auth = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // console.log(email, password);

    try {
      const data = await LoginUser({ email, password });
      if (data?.message.name === "admin") {
        localStorage.setItem("user", data?.message);
        setUser(data?.message);
        router.push("/admin/dashboard");
      } else {
        localStorage.setItem("user", data?.message);
        setUser(data?.message);
        router.push("/dashboard");
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 detik
      toast({
        title: "Login Berhasil",
        description: `Selamat datang ${data?.message.name}!`,
      });
      // alert("Login berhasil!");
      // console.log(data.message.name);
    } catch (error) {
      setError(error.message || "Ada Yang salah");
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: `Coba periksa kembali`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" min-h-screen flex justify-center ">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-[#FFE8B6] border-gray-300 rounded-md shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 border-r-2 border-black text-center hidden lg:flex items-center justify-center">
          <Image
            src={"/logora.png"}
            width={350}
            height={350}
            alt="Logo Ra"
            className="m-12 xl:m-16 bg-contain bg-center bg-no-repeat"
          />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="flex justify-center items-center gap-3 mb-5">
            <Image
              src={"/logora.png"}
              width={100}
              height={100}
              alt="Logo ra"
              className="w-12"
            />
            <a href="/" className="text-gray-900 font-semibold text-xl">
              RA Sabilul Khoirot
            </a>
          </div>
          <div className="w-full bg-bg_primary rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-gray-900 font-bold text-center">
                Login Ke akun
              </h1>
              {error && <p className="text-red-500 mb-3">{error}</p>}
              <form onSubmit={Auth} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email"></label>
                  <input
                    className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password"></label>
                  <input
                    className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="**************"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-gray-900 w-full font-medium text-sm px-5 py-3 text-center bg-bg_secondary rounded-lg shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="flex justify-center items-center p-1">
                        <div className="login-loader"></div>
                      </div>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
