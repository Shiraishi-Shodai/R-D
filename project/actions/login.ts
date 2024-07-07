"use server";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginType } from "@/types/auth";
import { loginSchema } from "@/schema";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const login = async (values: loginType) => {
  const validationFields = loginSchema.safeParse(values);
  if (!validationFields) {
    return { error: "データが存在しません" };
  }

  const { email, password }: loginType = validationFields.data!;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Emailが存在しません" };
  }

  // サインイン後初めてのログイン時にemailVerifiedがなければ、トークンを生成し、認証リンクを送信
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "メールを送信しました!" };
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
          return { error: "メールアドレスまたはパスワードまたは" };
        default:
          return { error: "メールアドレスまたはパスワードまたは" };
      }
    }

    throw error;
  }

  return { success: "サインイン成功" };
};
