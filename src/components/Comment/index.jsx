import { UseUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { createKomentar, deleteKomentar } from "@/lib/komentar";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { FormatTanggal } from "@/utils/FormatTanggal";
import { Trash2 } from "lucide-react";

const Comment = ({ karya, fetchData }) => {
  const { user, setUser } = UseUser();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { toast } = useToast();
  const params = useParams();

  if (!params?.id) return;

  useEffect(() => {
    setComments(karya?.komentar);
  }, [karya]);

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
        description: "Komentar gagal ditambahkan",
      });
    }
  };

  const handleDeleteComment = async (komenId) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus komentar ini?"
    );
    if (!confirmed) return;
    try {
      await deleteKomentar(komenId);
      setComments(comments.filter((comment) => comment.id !== komenId));
      toast({
        description: "Komentar berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Komentar gagal dihapus",
      });
    }
  };
  return (
    <div>
      {user?.role === "guru" ? (
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
              placeholder="Tulis komentar disini..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-bg_secondary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Kirim
          </button>
        </form>
      ) : null}
      <div>
        <h1 className="text-center font-semibold text-xl">Komentar</h1>
        {comments.length > 0 ? (
          comments.map((komen, index) => (
            <article
              className="p-6 text-base rounded-lg shadow-lg mx-5 md:mx-12 lg:mx-32  relative"
              key={komen.id || index}
            >
              {komen?.name === user?.name ? (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleDeleteComment(komen.id)}
                    className="text-3xl"
                  >
                    <Trash2 />
                  </button>
                </div>
              ) : null}

              <footer className="flex justify-between items-center mb-2 ">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    {komen.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>{FormatTanggal(komen.createdAt)}</time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{komen.isi}</p>
              <hr />
            </article>
          ))
        ) : (
          <p>Komentar belum ada</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
