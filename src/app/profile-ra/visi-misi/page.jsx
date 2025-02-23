import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="py-12 px-10">
        <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-4">
          Visi
        </h1>
        <p className="text-center text-xl md:text-2xl lg:text-3xl font-extralight">
          Terwujudnya RA Sabilul Khoirot yang Madani (Maju, Berdaya Saing dan
          Mumpuni)
        </p>
      </div>
      <div className="py-12 px-8">
        <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-4">
          Misi
        </h1>
        <ul className="list-disc text-justify md:text-xl lg:text-2xl font-light">
          <li className="mb-2">
            Meningkatkan Kualitas dan Kompetensi Pendidik
          </li>
          <li className="mb-2">
            Membentuk Karakter Santri yang Cendekia dan Berakhlakul Karimah
          </li>
          <li className="mb-2">
            Meningkatkan Kualitas, Kuantitas Sarana dan Prasarana Pendidikan
            Secara Berkesinambungan
          </li>
          <li className="mb-2">
            Menciptakan Suasana Sekolah / Belajar yang Kondusif
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
