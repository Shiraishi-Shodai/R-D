"use server";

import { resetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { SendEmailDto, resetType } from "@/types/auth";
import { generatePasswordResetToken } from "@/lib/token";
import { getResetPasswordDto, sendEmail } from "@/lib/mail";

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

  //認証メールを送信

  //Reset用
  // sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  // nodemailer用
  // パスワードリセット用の認証メール設定を生成
  const resetPasswordDto: SendEmailDto = getResetPasswordDto(
    "パスワードリセット用の認証メール",
    passwordResetToken.email,
    passwordResetToken.token
  );

  await sendEmail(resetPasswordDto);

  return { success: "パスワードリセットメールを送信しました" };
};
