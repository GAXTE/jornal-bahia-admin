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
  useEffect(() => {
    getAllTags();
  }, []);

  return <TagsContext.Provider value={{ ListAlltags }}>{children}</TagsContext.Provider>;
};

export const useTagsContext = () => useContext(TagsContext);
