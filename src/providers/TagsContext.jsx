import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";

const TagsContext = createContext({});

export const TagsProvider = ({ children }) => {
  const navi = useNavigate();
  const [ListAlltags, setListAllTags] = useState([]);
  const getAllTags = async () => {
    try {
      const { data } = await Api.get("/tag");
      localStorage.setItem("tags", JSON.stringify(data));
      setListAllTags(data);
    } catch (error) {}
  };
  const createTag = async (name) => {
    const obj = {
      name: name,
    };
    try {
      const { data } = await Api.post("/tag", obj);
      getAllTags();
    } catch (error) {}
  };
  const deleteTag = async (id) => {
    try {
      const { data } = await Api.delete(`/tag/${id}`);
      getAllTags();
    } catch (error) {}
  };
  const updateTag = async (tag) => {
    try {
      const { data } = await Api.put(`/tag/`, tag);
      getAllTags();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <TagsContext.Provider value={{ ListAlltags, createTag, deleteTag, updateTag }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTagsContext = () => useContext(TagsContext);
