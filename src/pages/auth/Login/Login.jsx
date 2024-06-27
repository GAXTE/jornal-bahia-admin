import React, { useState } from "react";
import logo from "../../../assets/Logo.png";
import { useUserContext } from "../../../providers/UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <main className="h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8 my-4" src={logo} alt=""></img>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Endereço de Email"
                aria-label="Email Address"
                value={email} // Passo 2: Vincula o estado ao input
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o valor do input
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Senha"
                aria-label="Password"
                value={password} // Vincula o estado ao input
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado com o valor do input
              />
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">Esqueceu sua senha? </span>

          <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
            Clique aqui
          </a>
        </div>
      </div>
    </main>
  );
};
