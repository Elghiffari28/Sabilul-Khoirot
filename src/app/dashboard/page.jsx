"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getMe } from "@/lib/api";
import { UseUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import GetTopBerita from "@/components/GetTopBerita";

const page = () => {
  const { user, setUser } = UseUser();
  // const Me = async () => {
  //   try {
  //     const data = await getMe();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   Me();
  // }, []);
  const router = useRouter();

  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID");
  const jam = now.toLocaleTimeString("id-ID");
  const hari = now.toLocaleDateString("id-Id", { weekday: "long" });

  return (
    <div>
      <Hero />
      <GetTopBerita />
      {user ? (
        <div>
          <h1>ini halaman dashboard</h1>
          <p>Selamat Hari{hari}</p>
          <p>{(tanggal, jam)}</p>
          <p>{user.name}</p>
        </div>
      ) : (
        <p>halo tamu</p>
      )}
    </div>
  );
};

export default page;
