"use client";
import React from "react";
import { UseUser } from "@/context/UserContext";
import Header from "@/components/Header";
import { Mail, MapPin, MapPinned, Phone } from "lucide-react";

const page = () => {
  return (
    <div>
      <Header judul={"Kontak"} />
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Hubungi Kami
          </h1>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2 text-justify mb-10">
              Jika Anda ingin mengetahui lebih lanjut tentang sekolah kami,
              silakan hubungi kami melalui kontak di bawah ini. Kami dengan
              senang hati akan menjawab pertanyaan Anda.
            </p>
            <p className="flex items-center gap-2">
              <MapPinned className="text-blue-600 shrink-0" size={30} />
              Jl. Kilalawang, RT 002 RW 005 Desa Heuleut, Kecamatan
              Leuwimunding, Kabupaten Majalengka, Jawa Barat 45473
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-green-600 shrink-0" size={30} />
              +62 853 2443 4351
            </p>
            <p className="flex items-center gap-2">
              <Mail className="text-red-600 shrink-0" size={30} />
              sabilulkhoirot25@gmail.com
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <iframe
            className="w-full h-64 md:h-80 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.060937980522!2d108.3316383748338!3d-6.745707593250669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f21bc96e49cf5%3A0xc3e45289a4080f2c!2sRA%20SABILUL%20KHOIROT!5e1!3m2!1sen!2sid!4v1741790454152!5m2!1sen!2sid"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default page;
