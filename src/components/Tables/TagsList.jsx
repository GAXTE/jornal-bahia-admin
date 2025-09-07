import React, { useState } from "react";
import { Trash } from "../Buttons/TrashButton";
import { Edit } from "../Buttons/EditButton";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { DefaultModal } from "../Modals/DefaultModal";
import { DefaultInput } from "../Inputs/DefaultInput";
import { useTagsContext } from "../../providers/TagsContext";
import { useNavigate } from "react-router-dom";
import { YesButton } from "../Buttons/YesButton";
import { toast } from "react-toastify";

export const TagsList = ({ array }) => {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalEdit] = useState(false);
  const [editValues, setEditValues] = useState({ name: "" });
  const [selectedTagId, setSelectedTagId] = useState(null);
  const { deleteTag, updateTag } = useTagsContext();
  const navi = useNavigate();

  const getTagFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tagId");
  };

  const deleteTagById = () => {
    const tagId = getTagFromUrl();
    if (tagId) {
      deleteTag(tagId);
      setIsModalOpenDelete(false);
      navi(location.pathname);
    }
  };

  const handleDeleteClick = (id) => {
    setIsModalOpenDelete(true);
    navi(`${location.pathname}?tagId=${id}`);
  };

  const handleEditClick = (tag) => {
    setSelectedTagId(tag.id);
    setEditValues({ name: tag.name });
    setIsModalEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  const truncateTitle = (title) => {
    if (title.length > 100) {
      return `${title.substring(0, 80)}...`;
    }
    return title;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { name } = editValues;
    const filteredValues = {};
    if (name.trim() !== "") filteredValues.name = name;
    const obj = {
      id: selectedTagId,
      ...filteredValues,
    };
    updateTag(obj)
      .then((response) => {
        setIsModalEdit(false);
      })
      .catch((error) => {});
  };

  return (
    <section className="">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3">
        <h2 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">Tags</h2>
        <span className="px-3 py-1 text-xs sm:text-sm text-gray-950 bg-red-100 rounded-full w-fit">
          Total = {array.length}
        </span>
      </div>
      <div className="flex flex-col mt-4 sm:mt-6">
        <div className="-mx-2 sm:-mx-4 lg:-mx-6 xl:-mx-8 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 sm:py-3.5 px-2 sm:px-4 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Opções
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {array?.map((category, index) => (
                    <tr key={index}>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-white">
                        <div className="truncate max-w-[150px] sm:max-w-none">
                          {truncateTitle(category.name)}
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                         <div className="flex gap-1 sm:gap-2 max-w-[60px] sm:max-w-[70px] min-w-[60px] sm:min-w-[70px] justify-between">
                           <Trash setIsModalOpenDelete={() => handleDeleteClick(category.id)} />
                           <Edit handleEditClick={() => handleEditClick(category)} />
                         </div>
                      </td>
                    </tr>
                  ))}
                  <ConfirmModal
                    isModalOpenDelete={isModalOpenDelete}
                    setIsModalOpenDelete={setIsModalOpenDelete}
                    onConfirm={deleteTagById}
                  />
                  <DefaultModal isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalEdit}>
                    <form onSubmit={handleEditSubmit}>
                      <div className="flex flex-col gap-6 items-center">
                        <DefaultInput
                          type={"text"}
                          placeholder={"Nome da tag"}
                          handleInputChange={handleInputChange}
                          name={"name"}
                          value={editValues.name}
                        />
                        <YesButton type={"submit"} textButton={"Enviar"} />
                      </div>
                    </form>
                  </DefaultModal>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
