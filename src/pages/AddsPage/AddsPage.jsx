import React, { useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { AddsList } from "../../components/Tables/AddsList";
import { usePublicityContext } from "../../providers/PublicityContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { FileInput } from "../../components/Inputs/FileInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { YesButton } from "../../components/Buttons/YesButton";
import { toast } from "react-toastify";

export const AddsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllPublicity, createPublicity } = usePublicityContext();
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [link, setLink] = useState("");
  const [type, setType] = useState("");

  const types = [
    { name: "banner", id: 0 },
    { name: "normal", id: 1 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") setDescription(value);
    else if (name === "link") setLink(value);
    else if (name === "type") setType(value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (description === "" || link === "" || type === "" || files.length === 0) {
        toast.warning("Preencha todos os campos");
        return;
      }
      const formData = new FormData();
      formData.append("description", description);
      formData.append("link", link);
      formData.append("type", type);
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      await createPublicity(formData)
        .then(() => {
          setIsModalOpenCreate(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Erro ao criar propaganda:", error);
    }
  };

  return (
    <>
      <DefaultTemplate textButton={"Propaganda"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <DefaultInput
                type={"text"}
                placeholder={"Descrição da propaganda"}
                handleInputChange={handleInputChange}
                name={"description"}
                value={description}
              />
              <FileInput type={"file"} accept={"image/*, video/*"} handleFileChange={handleFileChange} />
              <DefaultInput
                type={"text"}
                placeholder={"Link do anunciante"}
                handleInputChange={handleInputChange}
                name={"link"}
                value={link}
              />
              <SelectInput
                name1={"type"}
                array={types}
                placeholder={"Escolha um tipo"}
                handleInputChange={handleInputChange}
                value={type}
              />
              <YesButton textButton={"Enviar"} type={"submit"} />
            </div>
          </form>
        </DefaultModal>

        <AddsList array={ListAllPublicity} />
      </DefaultTemplate>
    </>
  );
};
