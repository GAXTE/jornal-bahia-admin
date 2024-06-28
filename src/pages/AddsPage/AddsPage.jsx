import { useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { AddsList } from "../../components/Tables/AddsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { FileInput } from "../../components/Inputs/FileInput";

export const AddsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
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
          </form>
        </DefaultModal>
        <AddsList array={[]} />
      </DefaultTemplate>
    </>
  );
};
