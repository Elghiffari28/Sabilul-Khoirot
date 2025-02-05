"use client";
import { getAllGuru } from "@/lib/guru";
import React, { useEffect, useState } from "react";

const GuruList = () => {
  const [gurus, setGurus] = useState([]);

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const data = await getAllGuru();
        console.log("ini data guru", data);
        setGurus(data?.payload || []);
      } catch (error) {
        console.error("gagal mengambil data guru", error);
      }
    };
    fetchGuru();
  }, []);
  console.log(gurus);
  return (
    <div>
      <h1>Ini data guru</h1>
      <table className="border border-black border-collapse">
        <tbody>
          {gurus.map((guru) => (
            <tr key={guru.uuid}>
              <td>{guru.name}</td>
              <td>{guru.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuruList;
