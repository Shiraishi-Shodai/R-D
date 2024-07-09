"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
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

  // メール認証を実行
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  // 不要になったトークンを削除(サインアウト後にログインする際に、再び2段階認証させるため?)
  // await db.verificationToken.delete({
  //   where: { id: existingToken.id },
  // });

  return { success: "メール認証に成功しました" };
};
