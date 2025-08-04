import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  price: z.number().min(0),
  image: z.string().url(),
  categoryId: z.string().min(1),
});

export type BookInput = z.infer<typeof bookSchema>;
