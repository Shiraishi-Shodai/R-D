"use server";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SendEmailDto, loginType } from "@/types/auth";
import { loginSchema } from "@/schema";
import { generateVerificationToken } from "@/lib/token";
import { getVerificationDto, sendEmail } from "@/lib/mail";

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

    // サインアップ用の認証メール設定を生成
    const verificationDto: SendEmailDto = getVerificationDto(
      "サインイン用の認証メール",
      verificationToken.email,
      verificationToken.token
    );

    await sendEmail(verificationDto);
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
          return { error: "メールアドレスまたはパスワードが正しくありません" };
        default:
          return { error: "メールアドレスまたはパスワードが正しくありません" };
      }
    }

    throw error;
  }

  return { success: "サインイン成功" };
};
