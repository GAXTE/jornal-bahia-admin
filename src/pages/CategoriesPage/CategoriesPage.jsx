import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useCategoryContext } from "../../providers/CategoryContext";

export const CategoriesPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllCategories } = useCategoryContext();

  return (
    <>
      <DefaultTemplate textButton={"Categoria"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form action="">
            <input type="text" placeholder="nome" />
            <input type="text" placeholder="descrição" />
          </form>
        </DefaultModal>
        <CategoryList array={ListAllCategories} />
      </DefaultTemplate>
    </>
  );
};
