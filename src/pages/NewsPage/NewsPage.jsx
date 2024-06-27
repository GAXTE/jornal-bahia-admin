import React, { useEffect, useState } from "react";
import { NewsList } from "../../components/Tables/NewsList";
import { DefaultModal } from "../../components/Modals/DefaultModal";
import { DefaultTemplate } from "../DefaultTemplate/DefaultTemplate";
import { TextRich } from "../../components/TextRich/TextRich";
import { usePostContext } from "../../providers/PostContext";
import { useTagsContext } from "../../providers/TagsContext";
import parse from "html-react-parser";

export const NewsPage = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { AllPosts, createPost } = usePostContext();
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
    createPost(post);
  };

  return (
    <>
      <DefaultTemplate textButton={"Noticia"} setIsModalOpenCreate={setIsModalOpenCreate}>
        <DefaultModal isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalOpenCreate}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Título" name="title" onChange={handleInputChange} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {ListAlltags.map((tag) => (
              <div key={tag.id}>
                <input type="checkbox" id={`tag-${tag.id}`} value={tag.id} onChange={handleTagChange} />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
            <select name="category" onChange={handleInputChange}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <TextRich onChange={handleChange} />
            <button type="submit">Enviar</button>
          </form>
        </DefaultModal>

        <NewsList array={AllPosts} />
      </DefaultTemplate>
      {parse(editContent)}
    </>
  );
};
