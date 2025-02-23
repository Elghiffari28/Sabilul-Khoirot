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
    <div className="flex whitespace-nowrap w-full py-1 bg-gray-900 text-white ">
      <div className=" w-full runningText  my-auto ">
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
