import React, { useState } from "react";
import logo from "../../../assets/Logo.png";
import { useUserContext } from "../../../providers/UserContext";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgot } = useUserContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    forgot(email);
  };

  return (
    <main className="h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <p className="my-4">Envie um codigo de redefinicao de senha para seu email</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Endereço de Email"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
