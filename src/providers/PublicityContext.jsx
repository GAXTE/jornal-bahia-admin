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
  useEffect(() => {
    listAllPublicity();
  }, []);
  return <PublicityContext.Provider value={{ ListAllPublicity }}>{children}</PublicityContext.Provider>;
};

export const usePublicityContext = () => useContext(PublicityContext);
