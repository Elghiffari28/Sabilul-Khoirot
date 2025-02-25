import React from "react";

const Header = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date();
  const tanggal = now.toLocaleString("id-ID", options);
  const jam = now.toLocaleTimeString("id-ID");
  return (
    <div className="flex whitespace-nowrap w-full py-1 bg-yellow-500 text-black justify-center">
      <div className="">
        <div>
          <span> Tanggal/Waktu : </span>
          <span>{tanggal} </span>
          <span>Jam </span>
          <span>{jam} </span>
          <span>WIB</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
