"use client";
import React from "react";
import { UseUser } from "@/context/UserContext";
import Header from "@/components/Header";

const page = () => {
  const { user, setUser } = UseUser();

  return (
    <div>
      <Header judul={"Kontak"} />
      {user ? (
        <div>
          <h1>ini halaman dashboard</h1>
          <p>{user.name}</p>
        </div>
      ) : (
        <p>halo tamu</p>
      )}
    </div>
  );
};

export default page;
