"use client";
import { getKaryaById } from "@/lib/karya";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { createKomentar } from "@/lib/komentar";
import { useToast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-toast";

const page = () => {
  const { user, setUser } = UseUser();
  const [karya, setKarya] = useState({});
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { toast } = useToast();

  if (!params?.id) return;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getKaryaById(params?.id);
      // console.log(data);
      setKarya(data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params?.id]);

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCommentSubmmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const formData = new FormData();
    formData.append("isi", newComment);

    try {
      const data = await createKomentar(params.id, formData);
      console.log("ini komentar", data);
      toast({
        description: "Komentar berhasil ditambahkan",
      });
      setNewComment("");
      fetchData();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Komentar berhasil ditambahkan",
      });
    }
  };
  // console.log("ini params", params.id);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        <div>
          <h1>ini detai page</h1>
          <h2>{karya.judul}</h2>
          <h3>{formatTanggal(karya.createdAt)}</h3>
          <h3>{karya.author}</h3>
          <Image
            src={karya.file ? `${imageURL}/${karya.file}` : "/placeholder.jpg"}
            width={100}
            height={100}
            alt="Gambar Karya"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            quality={60}
            format="webp"
            className=""
          />
          <p>{karya.deskripsi}</p>

          {user && (
            <form
              className="mb-6 mt-12 mx-5 md:mx-12 lg:mx-32 "
              onSubmit={handleCommentSubmmit}
            >
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </form>
          )}
          <div>
            <h1 className="text-center font-semibold text-xl">Komentar</h1>
            {karya?.komentar?.length > 0 ? (
              karya?.komentar?.map((komen, index) => (
                <article
                  className="p-6 text-base rounded-lg shadow-lg mx-5 md:mx-12 lg:mx-32  "
                  key={komen.id || index}
                >
                  <footer className="flex justify-between items-center mb-2 ">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        {komen.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time>{formatTanggal(komen.createdAt)}</time>
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {komen.isi}
                  </p>
                  <hr />
                </article>
              ))
            ) : (
              <p>Komentar belum ada</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
