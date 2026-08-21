import * as z from "zod";

export const eventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { error: "Nome inválido! Preencha corretamente" }),
  date: z.coerce.date(),
  theme: z.string(),
});
