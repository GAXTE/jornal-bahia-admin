import { createContext, useContext } from "react";
import { Api } from "../services/api";
import { useNavigate } from "react-router-dom";
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const navi = useNavigate();
  const login = async (user) => {
    try {
      const { data } = await Api.post("/user/session", user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navi("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <UserContext.Provider value={{ login }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
