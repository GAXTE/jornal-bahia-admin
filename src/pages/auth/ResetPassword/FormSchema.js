import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "São necessários pelo menos oito caracteres"),
    code: z.string().nonempty("Codigo é obrigatório"),
    confirmPassword: z.string().nonempty("Confirmar a senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });
