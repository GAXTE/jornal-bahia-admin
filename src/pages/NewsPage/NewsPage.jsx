import React, { useState } from "react";

import { NewsList } from "../../components/Tables/NewsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
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

export const News = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  return (
    <>
      <DefaultTemplate
        textButton={"Noticia"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <DefaultModal
          isModalOpen={isModalOpenCreate}
          setIsModalOpen={setIsModalOpenCreate}
        ></DefaultModal>
        <NewsList array={posts} />
      </DefaultTemplate>
    </>
  );
};
