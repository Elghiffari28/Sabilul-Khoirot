"use client";
import { UseUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";

const page = () => {
  const { user, setUser } = UseUser();
  const guru = user?.guru;
  console.log("ini data guru", guru);
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  console.log(user);
  return (
    <div>
      {/* Profile Section */}
      <div id="Photo-Profile">
        <h1>Foto Profil</h1>
        <div className="flex">
          <div>
            <Image
              src={`${imageURL}/${guru?.foto}`}
              width={100}
              height={100}
              alt="Foto Guru"
            />
          </div>
        </div>
      </div>
      <h1>ini adalah halaman profile user</h1>
      <p>{user?.guru?.nrg}</p>
    </div>
  );
};

export default page;
