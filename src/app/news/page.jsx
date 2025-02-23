"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react";
import { UseUser } from "@/context/UserContext";

const Page = () => {
  const { user, setUser } = UseUser();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Berita</h1>
      {user ? (
        <Link
          href={"/news/add"}
          className="p-2 bg-bg_secondary rounded-md shadow-md"
        >
          <span>Tambah Berita</span>
        </Link>
      ) : null}
    </div>
  );
};

export default Page;
