import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";

const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const navi = useNavigate();
  const [ListAllCategories, setCategories] = useState();

  const getAllCategories = async () => {
    try {
      const { data } = await Api.get("/category");
      localStorage.setItem("categories", JSON.stringify(data));
      setCategories(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const createCategory = async (category) => {
    try {
      const { data } = await Api.post("/category", category);
      getAllCategories();
    } catch (error) {}
  };
  const deleteCategory = async (id) => {
    const obj = {
      data: { id },
    };
    try {
      const { data } = await Api.delete("/category", obj);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoryContext.Provider value={{ ListAllCategories, createCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
