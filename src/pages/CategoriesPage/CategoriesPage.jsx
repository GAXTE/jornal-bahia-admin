import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useCategoryContext } from "../../providers/CategoryContext";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { TextArea } from "../../components/Inputs/TextArea";
import { YesButton } from "../../components/Buttons/YesButton";
export const CategoriesPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllCategories } = useCategoryContext();

  return (
    <>
      <DefaultTemplate
        textButton={"Categoria"}
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
                placeholder={"Nome da categoria"}
                // handleInputChange={handleInputChange}
                name={"name"}
              />
              <TextArea />
              <YesButton type={"submit"} textButton={"Enviar"} />
            </div>
          </form>
        </DefaultModal>
        <CategoryList array={ListAllCategories} />
      </DefaultTemplate>
    </>
  );
};
