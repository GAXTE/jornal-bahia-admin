import { useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { AddsList } from "../../components/Tables/AddsList";
import { usePublicityContext } from "../../providers/PublicityContext";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { FileInput } from "../../components/Inputs/FileInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { YesButton } from "../../components/Buttons/YesButton";

export const AddsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllPublicity } = usePublicityContext();
  const types = [
    { name: "banner", id: 0 },
    { name: "normal", id: 1 },
  ];
  // console.log(ListAllPublicity);
  return (
    <>
      <DefaultTemplate
        textButton={"Propaganda"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <DefaultModal
          isModalOpen={isModalOpenCreate}
          setIsModalOpen={setIsModalOpenCreate}
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

        <AddsList array={ListAllPublicity} />
      </DefaultTemplate>
    </>
  );
};
