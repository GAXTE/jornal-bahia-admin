import React, { useState } from "react";
import { Trash } from "../Buttons/TrashButton";
import { Edit } from "../Buttons/EditButton";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { DefaultModal } from "../Modals/DefaultModal";
import { TextRich } from "../TextRich/TextRich";
import { DefaultInput } from "../Inputs/DefaultInput";
import { usePostContext } from "../../providers/PostContext";
import { useNavigate, useLocation } from "react-router-dom";

export const NewsList = ({ array }) => {
  const { deletePost } = usePostContext();
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const getPostIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("postId");
  };

  const deletePostById = () => {
    const postId = getPostIdFromUrl();
    if (postId) {
      deletePost(postId);
      setIsModalOpenDelete(false);
      navigate(location.pathname); // Remove o ID da URL após a exclusão
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "category") setCategory(value);
  };

  const handleChange = (content) => {
    setEditContent(content);
  };

  return (
    <section className="">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Noticias</h2>
        <span className="px-3 py-1 text-xs text-gray-950 bg-red-100 rounded-full">
          Total = {array.length}
        </span>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Titulo
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {array
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post, index) => (
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
                          <Edit isModalOpenEdit={isModalOpenEdit} setIsModalEdit={setIsModalEdit} />
                        </td>
                        <ConfirmModal
                          isModalOpenDelete={isModalOpenDelete}
                          setIsModalOpenDelete={setIsModalOpenDelete}
                          onConfirm={deletePostById}
                        />
                        <DefaultModal isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalEdit}>
                          <form action="">
                            <DefaultInput
                              type={"text"}
                              placeholder={"Título"}
                              handleInputChange={handleInputChange}
                              name={"title"}
                            />
                            <TextRich onChange={handleChange} />
                          </form>
                        </DefaultModal>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
