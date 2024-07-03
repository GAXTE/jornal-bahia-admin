import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { useCategoryContext } from "../../providers/CategoryContext";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { YesButton } from "../../components/Buttons/YesButton";
import { TextArea } from "../../components/Inputs/TextArea";

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
    const category = {
      name: categoryName,
      description: categoryDescription,
    };
    createCategory(category)
      .then((response) => {
        setIsModalOpenCreate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DefaultTemplate textButton={"Categoria"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <DefaultInput
                type="text"
                placeholder="Nome da categoria"
                handleInputChange={handleInputChange}
                name="categoryName"
                value={categoryName}
              />
              <TextArea
                type="text"
                placeholder="Nome da categoria"
                handleInputChange={handleInputChange}
                name="categoryDescription"
                value={categoryDescription}
              />
              <YesButton textButton={"Enviar"} type={"submit"} />
            </div>
          </form>
        </DefaultModal>
        <CategoryList array={ListAllCategories} />
      </DefaultTemplate>
    </>
  );
};
