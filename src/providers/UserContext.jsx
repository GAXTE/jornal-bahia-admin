import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserContext = createContext({});
export const UserProvider = ({ children }) => {
  const navi = useNavigate();
  const [ListAllUsers, setListAllUsers] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [roleList, setRoleList] = useState();
  const token = localStorage.getItem("token");

  const login = async (user) => {
    const loginPromise = async () => {
      const { data } = await Api.post("/user/session", user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navi("/dashboard");
      return data;
    };

    toast.promise(loginPromise(), {
      pending: "Entrando...",
      success: "Login realizado com sucesso!",
      error: {
        render({ data }) {
          if (data.response.data.error === "User/Password not found") {
            return "Usuário ou senha inválidos";
          } else {
            return "Erro ao realizar login";
          }
        },
      },
    });
  };

  const forgot = async (email) => {
    const forgotPromise = async () => {
      const { data } = await Api.post("/user/password", { email });
      localStorage.setItem("user-validation", data.userId);
      navi("/password");
      return data;
    };

    toast.promise(forgotPromise(), {
      pending: "Enviando email...",
      success: "Email enviado com sucesso!",
      error: {
        render({ data }) {
          if (data.response.data.error === "Failed to: Failed to find user") {
            return "Usuário não encontrado";
          }
          return "Erro ao enviar email";
        },
      },
    });
  };

  const validationCode = async (password, get_codePassword) => {
    const userId = localStorage.getItem("user-validation");

    const validationPromise = async () => {
      const { data } = await Api.post(`/user/password/new/${userId}`, {
        password,
        get_codePassword,
      });
      navi("/");
      return data;
    };

    toast.promise(validationPromise(), {
      pending: "Validando código...",
      success: "Código validado com sucesso!",
      error: {
        render({ data }) {
          if (data.response.data.error === "Failed to: User not found") {
            return "Usuário não solicitou codigo de recuperação";
          }
          if (data.response.data.error === "Failed to: Invalid code") {
            return "Código inválido";
          }
          if (data.response.data.error === "Failed to: Time expired to send code") {
            return "Código expirado";
          }
          return "Erro ao validar código";
        },
      },
    });
  };
  const listAllUsers = async () => {
    try {
      const { data } = await Api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListAllUsers(data);
    } catch (error) {}
  };
  const listAllRoles = async () => {
    try {
      const { data } = await Api.get("/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoleList(data);
    } catch (error) {}
  };
  const createUser = async (user) => {
    if (!user.username || !user.email || !user.password || !user.roleId) {
      toast.warning("Preencha todos os campos");
      throw new Error("Preencha todos os campos");
    }
    const createPromise = async () => {
      const { data } = await Api.post("/user", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await listAllUsers();
      return data;
    };

    toast.promise(createPromise(), {
      pending: "Criando usuário...",
      success: "Usuário criado com sucesso!",
      error: {
        render({ data }) {
          if (data.response.data.error === "Failed to create user: Email already exists") {
            return "Email já cadastrado";
          }
        },
      },
    });
  };
  const deleteUser = async (id) => {
    const deletePromise = async () => {
      const { data } = await Api.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await listAllUsers();
      return data;
    };

    toast.promise(deletePromise(), {
      pending: "Deletando usuário...",
      success: "Usuário deletado com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao deletar usuário";
        },
      },
    });
  };

  const updateUser = async (id, user) => {
    console.log(user);
    if (!user.username && !user.email) {
      toast.warning("Pelo menos um dos campos devem ser atualizados");
      throw new Error("Pelo menos um dos campos devem ser atualizados");
    }
    const updatePromise = async () => {
      const { data } = await Api.put(`/user/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await listAllUsers();
      return data;
    };

    toast.promise(updatePromise(), {
      pending: "Atualizando usuário...",
      success: "Usuário atualizado com sucesso!",
      error: {
        render({ data }) {
          return data.message || "Erro ao atualizar usuário";
        },
      },
    });
  };
  return (
    <UserContext.Provider
      value={{
        login,
        forgot,
        validationCode,
        listAllUsers,
        ListAllUsers,
        roleList,
        createUser,
        deleteUser,
        updateUser,
        user,
        setUser,
        listAllRoles,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
