import React, { useState } from "react";

import { NewsList } from "../../components/Tables/NewsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { TextRich } from "../../components/TextRich/TextRich";
import { usePostContext } from "../../providers/PostContext";
export const News = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [editContent, setEditContent] = useState("");
  const { AllPosts } = usePostContext();
  const handleChange = (content) => {
    setEditContent(content);
  };

  return (
    <>
      <DefaultTemplate textButton={"Noticia"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form action="">
            <input type="text" placeholder="Título" />
            <input type="file" placeholder="Imagem" />
            <select name="" id=""></select>
            <TextRich onChange={handleChange} />
          </form>
        </DefaultModal>

        <NewsList array={AllPosts} />
      </DefaultTemplate>
    </>
  );
};
