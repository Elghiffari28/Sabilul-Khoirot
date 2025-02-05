"use client";
import React from "react";
import { UseUser } from "@/context/UserContext";

const Page = () => {
  const { user, setUser } = UseUser();

  return (
    <div>
      <h1 className="text-gray-900">Halo {user?.name}</h1>
    </div>
  );
};

export default Page;
