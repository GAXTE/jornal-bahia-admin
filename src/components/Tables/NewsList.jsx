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
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3">
        <h2 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">Notícias</h2>
        <span className="px-3 py-1 text-xs sm:text-sm text-gray-950 bg-red-100 rounded-full w-fit">
          Total = {posts.totalPosts}
        </span>
      </div>
      <div className="flex flex-col mt-4 sm:mt-6">
        <div className="-mx-2 sm:-mx-4 lg:-mx-6 xl:-mx-8 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-2 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Título
                    </th>
                    <th className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Categoria
                    </th>
                    <th className="hidden md:table-cell px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Data
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Opções
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {posts.posts?.map((post, index) => (
                    <tr key={index}>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                        <div className="max-w-[200px] sm:max-w-none">
                          <div className="truncate sm:whitespace-normal">{truncateTitle(post.title)}</div>
                          <div className="sm:hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {post.categories[0].name} • {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {post.categories[0].name}
                      </td>
                      <td className="hidden md:table-cell px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="flex gap-1 sm:gap-2 justify-end sm:justify-between max-w-[60px] sm:max-w-[70px] min-w-[60px] sm:min-w-[70px]">
                          <Trash setIsModalOpenDelete={() => handleDeleteClick(post.id)} />
                          <Edit handleEditClick={() => handleEditClick(post)} />
                        </div>
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
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-2 sm:px-4 py-3 bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  } text-xs sm:text-sm text-gray-700 dark:text-gray-300 px-3 py-1 rounded transition-colors duration-200`}
                >
                  Anterior
                </button>
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 order-first sm:order-none">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  } text-xs sm:text-sm text-gray-700 dark:text-gray-300 px-3 py-1 rounded transition-colors duration-200`}
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
