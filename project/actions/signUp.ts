"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { signUpSchema } from "@/schema";
import { signUpType } from "@/types/auth";
import bcrypt from "bcryptjs";

export const signUp = async (values: signUpType) => {
  const validationFields = signUpSchema.safeParse(values);
  if (!validationFields) {
    return { error: "データが存在しません" };
  }

  const { name, email, password }: signUpType = validationFields.data!;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Emailがすでに存在します" };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // 生成した認証トークンインスタンスを作成し、データベースにデータを挿入
  const verificationToken = await generateVerificationToken(email);
  // 生成した認証トークンをメアドに送信
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "サインアップ成功" };
};
