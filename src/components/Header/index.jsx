import React from "react";

const Header = ({ judul, deskripsi }) => {
  return (
    <div className="max-w-3xl mx-auto text-center ">
      <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 border-t-4 border-b-4 border-bg_secondary py-4">
        {judul}
      </h1>
      <p className="text-lg text-gray-800 mb-8">{deskripsi}</p>
    </div>
  );
};

export default Header;
