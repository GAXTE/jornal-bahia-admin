import React, { useState } from "react";

import { NewsList } from "../../components/Tables/NewsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { TextRich } from "../../components/TextRich/TextRich";

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
  const [editContent, setEditContent] = useState("");

  const handleChange = (content) => {
    setEditContent(content);
  };

  return (
    <>
      <DefaultTemplate
        textButton={"Noticia"}
        setIsModalOpenCreate={setIsModalOpenCreate}
      >
        <DefaultModal
          isModalOpen={isModalOpenCreate}
          setIsModalOpen={setIsModalOpenCreate}
        >
          <form action="">
            <input type="text" placeholder="Título" />
            <input type="file" placeholder="Imagem" />
            <select name="" id=""></select>
            <TextRich onChange={handleChange} />
          </form>
        </DefaultModal>

        <NewsList array={posts} />
      </DefaultTemplate>
    </>
  );
};
