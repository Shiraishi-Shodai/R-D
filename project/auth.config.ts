import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schema";
import { getUserByEmail } from "./data/user";
import { signInType } from "./types";

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validationFields = signInSchema.safeParse(credentials);
        if (!validationFields) return null;

        const { email, password }: signInType = validationFields.data!;
        const user = await getUserByEmail(email);

        if (!user || !password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password!);
        // パスワードが一致していればユーザーを返す
        if (passwordMatch) return user;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
