import { userLoginSchema, userRegiterSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type UserRegisterInput = z.infer<typeof userRegiterSchema>;
export type uerLoginInput = z.infer<typeof userLoginSchema>;
