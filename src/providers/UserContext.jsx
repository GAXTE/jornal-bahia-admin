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
    } catch (error) {}
  };
  const forgot = async (email) => {
    try {
      const { data } = await Api.post("/user/password", { email });
      localStorage.setItem("user-validation", data.userId);
      alert("Email enviado com sucesso");
      navi("/password");
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data.error === "Failed to: Failed to find user") {
        alert("Usuario nao encontrado");
      } else {
        alert("Erro ao enviar email");
      }
    }
  };
  const validationCode = async (password, get_codePassword) => {
    const userId = localStorage.getItem("user-validation");
    try {
      const { data } = await Api.post(`/user/password/new/${userId}`, { password, get_codePassword });
      navi("/login");
    } catch (error) {
      alert("Codigo invalido");
    }
  };
  return <UserContext.Provider value={{ login, forgot, validationCode }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
