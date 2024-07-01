import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Trash } from "../Buttons/TrashButton";
import { Edit } from "../Buttons/EditButton";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { DefaultModal } from "../Modals/DefaultModal";
import { DefaultInput } from "../Inputs/DefaultInput";
import { FileInput } from "../Inputs/FileInput";
import { SelectInput } from "../Inputs/SelectInput";
import { YesButton } from "../Buttons/YesButton";

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência!"); // Feedback simples para o usuário
  } catch (err) {
    console.error("Falha ao copiar: ", err);
  }
};

export const AddsList = ({ array }) => {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalEdit] = useState(false);
  const types = [
    { name: "banner", id: 0 },
    { name: "normal", id: 1 },
  ];
  const truncateTitle = (title) => {
    if (title.length > 100) {
      return `${title.substring(0, 80)}...`;
    }
    return title;
  };

  return (
    <section className="">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Propaganda
        </h2>
        <span className="px-3 py-1 text-xs text-gray-950  bg-red-100 rounded-full">
          Total = {array?.length}
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
                      Descricao
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Imagem
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Video
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Link
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
                  {array.map((add, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {truncateTitle(add.description)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ">
                        <button onClick={() => copyToClipboard(add.imageUrl)}>
                          Copiar Link
                          <Copy
                            style={{ maxHeight: "15px", cursor: "pointer" }}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <button onClick={() => copyToClipboard(add.videoUrl)}>
                          Copiar Link
                          <Copy
                            style={{ maxHeight: "15px", cursor: "pointer" }}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {add.type == 0 ? "Intitucional" : "Normal"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <button onClick={() => copyToClipboard(add.videoUrl)}>
                          Copiar Link
                          <Copy
                            style={{ maxHeight: "15px", cursor: "pointer" }}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap flex gap-1 max-w-[70px] min-w-[70px] justify-between h-[56px]">
                        <>
                          <Trash
                            isModalOpenDelete={isModalOpenDelete}
                            setIsModalOpenDelete={setIsModalOpenDelete}
                          />
                          <Edit
                            isModalOpenEdit={isModalOpenEdit}
                            setIsModalEdit={setIsModalEdit}
                          />
                        </>
                      </td>
                    </tr>
                  ))}
                  <ConfirmModal
                    isModalOpenDelete={isModalOpenDelete}
                    setIsModalOpenDelete={setIsModalOpenDelete}
                  />
                  <DefaultModal
                    isModalOpen={isModalOpenEdit}
                    setIsModalOpen={setIsModalEdit}
                  >
                    <form action="">
                      <div className="flex flex-col gap-6 items-center">
                        <DefaultInput
                          type={"text"}
                          placeholder={"Descrição da propaganda"}
                          // handleInputChange={handleInputChange}
                          name={"name"}
                        />
                        <FileInput
                          type={"file"}
                          accept={"image/*, video/*"}
                          // handleFileChange={handleFileChange}
                        />
                        <DefaultInput
                          type={"url"}
                          placeholder={"Link do anunciante"}
                          // handleInputChange={handleInputChange}
                          name={"name"}
                        />
                        <SelectInput
                          name1={"type"}
                          array={types}
                          placeholder={"Escolha uma tipo"}
                          // handleInputChange={handleInputChange}
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
