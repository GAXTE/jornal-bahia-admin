import { createContext, useContext } from "react";
import { Api } from "../services/api";
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const login = async (user) => {
    try {
      const { data } = await Api.post("/user/session", user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };
  return <UserContext.Provider value={{ login }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
