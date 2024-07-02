import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../services/api";
import { useNavigate } from "react-router-dom";
const PublicityContext = createContext({});
export const PublicityProvider = ({ children }) => {
  const navi = useNavigate();
  const [ListAllPublicity, setListAllPublicity] = useState([]);
  const listAllPublicity = async () => {
    try {
      const { data } = await Api.get("/ad");
      setListAllPublicity(data);
    } catch (error) {}
  };
  const createPublicity = async (formData) => {
    try {
      const { data } = await Api.post("/ad/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      listAllPublicity();
    } catch (error) {
      throw new Error("Erro ao criar propaganda: " + error.message);
    }
  };

  const deleteAdd = async (id) => {
    try {
      const { data } = await Api.delete(`ad/delete/${id}`);
      listAllPublicity();
    } catch (error) {
      console.log(error);
    }
  };
  const updateAdd = async (add, link) => {
    console.log(add);
    console.log(link);
    const formData = new FormData();
    formData.append("link", link);
    try {
      const { data } = await Api.put(`/ad/update/${add}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      listAllPublicity();
    } catch (error) {
      console.log(error);
    }
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
