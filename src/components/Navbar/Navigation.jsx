import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // if (pathname === "/") return null;
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
      <Link
        href="/dashboard"
        className="rounded-md px-3 py-2 text-sm font-medium text-dark hover:bg-bg_primary"
        aria-current="page"
      >
        Beranda
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium text-dark  hover:bg-bg_primary fle"
        >
          <span>Profile RA</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {isOpen && (
          <div className="absolute p-2 top-full w-36  rounded-md shadow-2xl  bg-bg_secondary ">
            <Link
              href="/profile-ra/visi-misi"
              className="block rounded-md px-4 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
            >
              Visi & Misi
            </Link>
            <Link
              href="/profile-ra/komite"
              className="block rounded-md px-4 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
            >
              Komite
            </Link>
            <Link
              href="/profile-ra/logo"
              className="block rounded-md px-4 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
            >
              Logo RA
            </Link>
            <Link
              href="/profile-ra/logo"
              className="block rounded-md px-4 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
            >
              Sejarah RA
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/karya"
        className="rounded-md px-3 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
      >
        Karya
      </Link>
      <Link
        href="/news"
        className="rounded-md px-3 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
      >
        Berita
      </Link>
      <Link
        href="/kontak"
        className="rounded-md px-3 py-2 text-sm font-medium text-dark  hover:bg-bg_primary"
      >
        Kontak
      </Link>
    </div>
  );
};

export default Navigation;
