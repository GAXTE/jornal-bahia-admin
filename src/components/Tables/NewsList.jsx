import React, { useState, useEffect } from "react";
import { Trash } from "../Buttons/TrashButton";
import { Edit } from "../Buttons/EditButton";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { DefaultModal } from "../Modals/DefaultModal";
import { TextRich } from "../TextRich/TextRich";
import { DefaultInput } from "../Inputs/DefaultInput";
import { usePostContext } from "../../providers/PostContext";
import { useNavigate, useLocation } from "react-router-dom";
import { YesButton } from "../Buttons/YesButton";

export const NewsList = () => {
  const { deletePost, updatePost, getPostsPaginations } = usePostContext();
  const [posts, setPosts] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalEdit] = useState(false);
  const [editPost, setEditPost] = useState({ id: null, title: "", content: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  const loadPosts = async (page) => {
    try {
      const data = await getPostsPaginations(page, limit);
      setPosts(data);
      setTotalPages(Math.ceil(data.totalPages));
    } catch (error) {}
  };
  const getPostIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("postId");
  };

  const deletePostById = () => {
    const postId = getPostIdFromUrl();
    if (postId) {
      deletePost(postId);
      setIsModalOpenDelete(false);
      navigate(location.pathname);
      loadPosts(currentPage);
    }
  };

  const handleDeleteClick = (id) => {
    setIsModalOpenDelete(true);
    navigate(`${location.pathname}?postId=${id}`);
  };

  const truncateTitle = (title) => {
    if (title.length > 100) {
      return `${title.substring(0, 80)}...`;
    }
    return title;
  };

  const handleEditClick = (post) => {
    setEditPost({ id: post.id, title: post.title, content: post.content });
    setIsModalEdit(true);
  };

  const handleChange = (content) => {
    setEditPost((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { id, title, content } = editPost;
    updatePost(id, { title, content })
      .then(() => {
        setIsModalEdit(false);
        loadPosts(currentPage);
      })
      .catch((error) => {});
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Notícias</h2>
        <span className="px-3 py-1 text-xs text-gray-950 bg-red-100 rounded-full">
          Total = {posts.totalPosts}
        </span>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Título
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Categoria
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Data
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Opções
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {posts.posts?.map((post, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {truncateTitle(post.title)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {post.categories[0].name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap flex gap-1 max-w-[70px] min-w-[70px] justify-between">
                        <Trash setIsModalOpenDelete={() => handleDeleteClick(post.id)} />
                        <Edit handleEditClick={() => handleEditClick(post)} />
                      </td>
                    </tr>
                  ))}
                  <ConfirmModal
                    isModalOpenDelete={isModalOpenDelete}
                    setIsModalOpenDelete={setIsModalOpenDelete}
                    onConfirm={deletePostById}
                  />
                  <DefaultModal isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalEdit}>
                    <form onSubmit={handleEditSubmit}>
                      <div className="flex flex-col gap-6 items-center">
                        <DefaultInput
                          type="text"
                          placeholder="Título"
                          value={editPost.title}
                          handleInputChange={handleInputChange}
                          name="title"
                        />
                        <div className="flex flex-col gap-6 items-center">
                          <TextRich value={editPost.content} onChange={handleChange} />
                          <YesButton textButton="Enviar" type="submit" />
                        </div>
                      </div>
                    </form>
                  </DefaultModal>
                </tbody>
              </table>
              {/* Paginação */}
              <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  } text-sm text-gray-700 dark:text-gray-300`}
                >
                  Anterior
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                  } text-sm text-gray-700 dark:text-gray-300`}
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
