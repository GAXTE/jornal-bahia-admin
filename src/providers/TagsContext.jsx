import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";
import { toast } from "react-toastify";

const TagsContext = createContext({});

export const TagsProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const navi = useNavigate();
  const [ListAlltags, setListAllTags] = useState([]);
  const getAllTags = async () => {
    try {
      const { data } = await Api.get("/tag");
      localStorage.setItem("tags", JSON.stringify(data));
      setListAllTags(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTag = async (name) => {
    if (!name) {
      toast.warning("Preencha o campo de nome");
      throw new Error("Preencha o campo de nome");
    }

    const obj = { name };

    const createPromise = async () => {
      const { data } = await Api.post("/tag", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllTags();
      return data;
    };

    toast.promise(createPromise(), {
      pending: "Criando tag...",
      success: "Tag criada com sucesso!",
      error: {
        render({ data }) {
          if (data.response.data.error === "Failed to create tag: Tag already exists") {
            return "Tag ja existe";
          }
          console.log(data.response.data.error);
        },
      },
    });
  };

  const deleteTag = async (id) => {
    const deletePromise = async () => {
      const { data } = await Api.delete(`/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllTags();
      return data;
    };

    toast.promise(deletePromise(), {
      pending: "Deletando tag...",
      success: "Tag deletada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao deletar a tag";
        },
      },
    });
  };

  const updateTag = async (tag) => {
    if (!tag.name) {
      toast.warning("Preencha o campo de nome");
      throw new Error("Preencha o campo de nome");
    }

    const updatePromise = async () => {
      const { data } = await Api.put(`/tag/`, tag, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllTags();
      return data;
    };

    toast.promise(updatePromise(), {
      pending: "Atualizando tag...",
      success: "Tag atualizada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao atualizar a tag";
        },
      },
    });
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
