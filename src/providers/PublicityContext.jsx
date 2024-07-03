import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";
import { toast } from "react-toastify";

const PublicityContext = createContext({});

export const PublicityProvider = ({ children }) => {
  const navi = useNavigate();
  const [ListAllPublicity, setListAllPublicity] = useState([]);

  const listAllPublicity = async () => {
    try {
      const { data } = await Api.get("/ad");
      setListAllPublicity(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPublicity = async (formData) => {
    const createPromise = async () => {
      const { data } = await Api.post("/ad/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await listAllPublicity();
      return data;
    };

    toast.promise(createPromise(), {
      pending: "Criando propaganda...",
      success: "Propaganda criada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao criar propaganda";
        },
      },
    });
  };

  const deleteAdd = async (id) => {
    const deletePromise = async () => {
      const { data } = await Api.delete(`/ad/delete/${id}`);
      await listAllPublicity();
      return data;
    };

    toast.promise(deletePromise(), {
      pending: "Deletando propaganda...",
      success: "Propaganda deletada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao deletar propaganda";
        },
      },
    });
  };

  const updateAdd = async (add, link) => {
    if (!add || !link) {
      toast.warning("Preencha todos os campos");
      throw new Error("Informe o link da propaganda para atualizar");
    }
    const formData = new FormData();
    formData.append("link", link);

    const updatePromise = async () => {
      const { data } = await Api.put(`/ad/update/${add}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await listAllPublicity();
      return data;
    };

    toast.promise(updatePromise(), {
      pending: "Atualizando propaganda...",
      success: "Propaganda atualizada com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao atualizar propaganda";
        },
      },
    });
  };

  useEffect(() => {
    listAllPublicity();
  }, []);

  return (
    <PublicityContext.Provider value={{ ListAllPublicity, createPublicity, deleteAdd, updateAdd }}>
      {children}
    </PublicityContext.Provider>
  );
};

export const usePublicityContext = () => useContext(PublicityContext);
