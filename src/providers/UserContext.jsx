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
  // const userLogged = JSON.parse(localStorage.getItem("user"));
  // setUser(userLogged);

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
          return data.message || "Erro ao realizar login";
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
      navi("/login");
      return data;
    };

    toast.promise(validationPromise(), {
      pending: "Validando código...",
      success: "Código validado com sucesso!",
      error: "Código inválido",
    });
  };
  const listAllUsers = async () => {
    try {
      const { data } = await Api.get("/user");
      setListAllUsers(data);
    } catch (error) {}
  };
  const listAllRoles = async () => {
    try {
      const { data } = await Api.get("/role");
      setRoleList(data);
    } catch (error) {}
  };
  const createUser = async (user) => {
    if (!user.username || !user.email || !user.password || !user.roleId) {
      toast.warning("Preencha todos os campos");
      throw new Error("Preencha todos os campos");
    }
    const createPromise = async () => {
      const { data } = await Api.post("/user", user);
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
      const { data } = await Api.delete(`/user/${id}`);
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
      const { data } = await Api.put(`/user/${id}`, user);
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
  useEffect(() => {
    listAllUsers();
    listAllRoles();
  }, []);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
