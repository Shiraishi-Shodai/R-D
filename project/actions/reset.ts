"use server";

import * as z from "zod";
import { resetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { resetType } from "@/types/auth";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: resetType) => {
  const validatedField = resetSchema.safeParse(values);

  if (validatedField.error)
    return { error: "メールアドレスが正しくありません" };

  const { email } = validatedField.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "ユーザーが存在しません" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "パスワードリセットメールを送信しました" };
};
