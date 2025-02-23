"use client";
import { UseUser } from "@/context/UserContext";
import React from "react";

const page = () => {
  const { user, setUser } = UseUser();
  console.log(user);
  return (
    <div>
      <h1>ini adalah halaman profile user</h1>
      <p>{user?.guru?.nrg}</p>
    </div>
  );
};

export default page;
