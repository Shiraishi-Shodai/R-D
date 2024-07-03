"use server";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginType } from "@/types/auth";
import { loginSchema } from "@/schema";

export const login = async (values: loginType) => {
  const validationFields = loginSchema.safeParse(values);
  if (!validationFields) {
    return { error: "データが存在しません" };
  }

  const { email, password }: loginType = validationFields.data!;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return { error: "メールアドレスまたはパスワードが違います" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "credentialsエラー" };
        default:
          return { error: "原因不明のエラー" };
      }
    }
    throw error;
  }

  return { success: "サインイン成功" };
};
