"use client";
import { createKarya } from "@/lib/karya";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [author, setAuthor] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [judul, setJudul] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    // Preview images
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("author", author);

    files.forEach((file, index) => {
      formData.append("file", file);
    });

    try {
      const data = await createKarya(formData);
      console.log("Response: ", data);
      toast({
        description: "Karya berhasil ditambahkan",
      });

      // Reset form
      setJudul("");
      setAuthor("");
      setDeskripsi("");
      setFiles([]);
      setPreview([]);
      router.push("/karya");
    } catch (error) {
      console.error("Error: ", error);
      toast({
        variant: "destructive",
        description: "Karya gagal ditambahkan",
      });
    }
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Nama
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Judul
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Deskripsi
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              rows="6"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex mt-4 space-x-2">
            {preview.map((src, index) => (
              <img key={index} src={src} alt="preview" className="w-20 h-20" />
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
