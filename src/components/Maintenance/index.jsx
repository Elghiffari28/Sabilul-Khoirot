import { CalendarCog, Cog } from "lucide-react";
import Link from "next/link";
import React from "react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex gap-2 md:gap-4 lg:gap-8">
        <Cog size={100} />
        <CalendarCog size={100} />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4 capitalize">
        Halaman masih dalam pengembangan
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8">
        Kami berusaha untuk mengimprove tampilan menjadi lebih baik Nantikan!
      </p>
    </div>
  );
};

export default Maintenance;
