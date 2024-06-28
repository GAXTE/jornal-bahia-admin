import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useCategoryContext } from "../../providers/CategoryContext";
import { DefaultInput } from "../../components/Inputs/DefaultInput";

export const CategoriesPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const { ListAllCategories, createCategory } = useCategoryContext();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setCategoryName(value);
    } else if (name === "categoryDescription") {
      setCategoryDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpenCreate(false);
    const category = {
      name: categoryName,
      description: categoryDescription,
    };
    // createCategory(category);
    console.log(category);
  };

  return (
    <>
      <DefaultTemplate textButton={"Categoria"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <DefaultInput
              type="text"
              placeholder="Nome da categoria"
              handleInputChange={handleInputChange}
              name="categoryName"
              value={categoryName}
            />
            <DefaultInput
              type="text"
              placeholder="Descrição"
              handleInputChange={handleInputChange}
              name="categoryDescription"
              value={categoryDescription}
            />
          </form>
        </DefaultModal>
        <CategoryList array={ListAllCategories} />
      </DefaultTemplate>
    </>
  );
};
