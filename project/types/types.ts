import { signUpSchema } from "@/lib/zodSchema";
import {z} from "zod";

export type UserType = {
    email: string
    password: string
    username: string
}

export type signUpType = z.infer<typeof signUpSchema>