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
      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategory = async (category) => {
    try {
      const { data } = await Api.put("/category", category);
      getAllCategories();
    } catch (error) {}
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ ListAllCategories, createCategory, deleteCategory, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
