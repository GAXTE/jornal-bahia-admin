import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../../providers/UserContext";
import { resetPasswordFormSchema } from "./FormSchema";
import { Input } from "./Input";

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { validationCode } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const submit = (formData) => {
    const { password, code } = formData;
    validationCode(password, code);
  };

  return (
    <main className="h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <p className="my-4 font-bold text-[16px]">
              Digite o codigo enviado para seu email e sua nova senha
            </p>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className="w-full mt-4">
              <Input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Digite sua nova senha"
                aria-label="Senha"
                error={errors.password}
                {...register("password")}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Confirme sua senha"
                aria-label="Confirmar Senha"
                error={errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Digite o Codigo"
                aria-label="Codigo"
                error={errors.code}
                {...register("code")}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
