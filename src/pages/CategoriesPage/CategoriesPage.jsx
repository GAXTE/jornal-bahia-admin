import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useCategoryContext } from "../../providers/CategoryContext";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
export const CategoriesPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllCategories } = useCategoryContext();

  return (
    <>
      <DefaultTemplate textButton={"Categoria"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form action="">
            <DefaultInput
              type={"text"}
              placeholder={"Nome da categoria"}
              // handleInputChange={handleInputChange}
              name={"name"}
            />
            <DefaultInput
              type={"text"}
              placeholder={"Descrição"}
              // handleInputChange={handleInputChange}
              name={"name"}
            />
          </form>
        </DefaultModal>
        <CategoryList array={ListAllCategories} />
      </DefaultTemplate>
    </>
  );
};
