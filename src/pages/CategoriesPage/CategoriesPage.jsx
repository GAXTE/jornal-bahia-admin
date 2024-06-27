import React, { useState } from "react";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";

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

export const Categories = () => {
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
            <input type="text" placeholder="nome" />
            <input type="text" placeholder="descrição" />
          </form>
        </DefaultModal>
        <CategoryList array={posts} />
      </DefaultTemplate>
    </>
  );
};
