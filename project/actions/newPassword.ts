"use server";

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/schema";
import { newPasswordType } from "@/types/auth";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: newPasswordType,
  token: string | null
) => {
  if (!token) return { error: "トークンが存在しません" };

  const validatedField = newPasswordSchema.safeParse(values);
  if (validatedField.error)
    return { error: "パスワードが正しく入力されていません" };

  const { password } = validatedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "与えられたトークンが存在しません" };
  }

  // 認証トークンの有効期限を確認
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "トークンの有効期限が切れています" };
  }

  // トークンを所有するユーザーが存在するか
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "トークンに対応するユーザーが見つかりませんでした" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // メール認証を実行
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashPassword },
  });

  // 不要になったトークンを削除(サインアウト後にログインする際に、再び2段階認証させるため?)
  // await db.verificationToken.delete({
  //   where: { id: existingToken.id },
  // });

  return { success: "パスワードの再設定に成功しました" };
};
