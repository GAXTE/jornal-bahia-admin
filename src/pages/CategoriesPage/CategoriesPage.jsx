import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { DefaultInput } from "../../components/Inputs/DefaultInput";

// Lista de posts de exemplo

const posts = [
  {
    title:
      "kojskljsgsfjgfjf jgjgfs sfgj jgsfjsfg fjg ghsjksdghsjsddskjgsdksdjsdg  djsdkjsdksdgsdkjdgksdg lbsa,bafbfssbflknalfnlknslknfs olkashlkasfhklasf lkhsaklfashklasfhafls ",
    category: "Categoria A",
    date: "01/01/2023",
  },
  { title: "Post 2", category: "Categoria B", date: "02/02/2023" },
  { title: "Post 3", category: "Categoria C", date: "03/03/2023" },
];

export const CategoriesPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

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
        <CategoryList array={posts} />
      </DefaultTemplate>
    </>
  );
};
