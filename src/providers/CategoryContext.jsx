import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";
import { toast } from "react-toastify";

const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const navi = useNavigate();
  const token = localStorage.getItem("token");
  const [ListAllCategories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")));

  const getAllCategories = async () => {
    try {
      const { data } = await Api.get("/category");
      localStorage.setItem("categories", JSON.stringify(data));
      setCategories(data);
    } catch (error) {}
  };

  const createCategory = async (category) => {
    if (!category.name || !category.description) {
      toast.warning("Todos os campos são obrigatórios");
      throw new Error("Todos os campos são obrigatórios");
    }

    const createPromise = async () => {
      const { data } = await Api.post("/category", category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllCategories();
      return data;
    };

    toast.promise(createPromise(), {
      pending: "Criando categoria...",
      success: "Categoria criada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao criar a categoria";
        },
      },
    });
  };

  const deleteCategory = async (id) => {
    const deletePromise = async () => {
      const { data } = await Api.delete("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id }, // Aqui estamos garantindo que o ID será enviado no corpo da requisição
      });
      await getAllCategories();
      return data;
    };

    toast.promise(deletePromise(), {
      pending: "Deletando categoria...",
      success: "Categoria deletada com sucesso!",
      error: {
        render({ data }) {
          console.log(data.response);
          return data.message || "Erro ao deletar a categoria";
        },
      },
    });
  };
  const updateCategory = async (category) => {
    if (!category.name && !category.description) {
      toast.warning("Pelo menos um campo deve ser preenchido");
      throw new Error("Pelo menos um campo deve ser preenchido");
    }

    const updatePromise = async () => {
      const { data } = await Api.put("/category", category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllCategories();
      return data;
    };

    toast.promise(updatePromise(), {
      pending: "Atualizando categoria...",
      success: "Categoria atualizada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao atualizar a categoria";
        },
      },
    });
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
