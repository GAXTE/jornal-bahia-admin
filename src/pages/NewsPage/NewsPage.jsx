import React, { useEffect, useState } from "react";
import { NewsList } from "../../components/Tables/NewsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { TextRich } from "../../components/TextRich/TextRich";
import { usePostContext } from "../../providers/PostContext";
import { useTagsContext } from "../../providers/TagsContext";
import parse from "html-react-parser";
import { FileInput } from "../../components/Inputs/FileInput";
import { DefaultInput } from "../../components/Inputs/DefaultInput";
import { CheckBoxInput } from "../../components/Inputs/CheckBoxInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { YesButton } from "../../components/Buttons/YesButton";

export const NewsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { AllPosts } = usePostContext();
  const { ListAlltags } = useTagsContext();
  const categories = JSON.parse(localStorage.getItem("categories"));

  const handleChange = (content) => {
    setEditContent(content);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "category") setCategory(value);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: title,
      content: editContent,
      categoryId: category,
      tagIds: selectedTags,
      files: image,
    };
    // createPost(post);
    console.log(post);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 items-center">
              <FileInput
                type={"file"}
                text={"Escolha uma imagem de capa"}
                accept={"image/*"}
                handleFileChange={handleFileChange}
              />
              <DefaultInput
                type={"text"}
                placeholder={"Título da notícia"}
                handleInputChange={handleInputChange}
                name={"title"}
              />
              <div className="flex gap-3">
                {ListAlltags.map((tag) => (
                  <div key={tag.id}>
                    <CheckBoxInput
                      id={`tag-${tag.id}`}
                      value={tag.id}
                      name={tag.name}
                      htmlFor={`tag-${tag.id}`}
                      handleTagChange={handleTagChange}
                    />
                  </div>
                ))}
              </div>
              <SelectInput
                name1={"category"}
                array={categories}
                placeholder={"Escolha uma categoria"}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <TextRich onChange={handleChange} />

              <YesButton type={"submit"} textButton={"Enviar"} />
            </div>
          </form>
        </DefaultModal>

        <NewsList array={AllPosts} />
      </DefaultTemplate>
    </>
  );
};
