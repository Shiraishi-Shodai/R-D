import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 3600ミリ * 1000(1時間)

  const existingToken = await getVerificationTokenByEmail(email);

  // トークンがすでに存在していれば削除する
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
