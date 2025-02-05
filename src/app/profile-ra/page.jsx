"use client";
import { UseUser } from "@/context/UserContext";
import React from "react";

const page = () => {
  const { user, setUser } = UseUser();
  return (
    <div>
      <h1>ini adalah halaman profile</h1>
      <p>{user?.name}</p>
    </div>
  );
};

export default page;
