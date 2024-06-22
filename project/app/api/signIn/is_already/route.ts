import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { property, data } = await req.json(); // 使用済みかチェックしたいデータを取得(ユーザー名かメールアドレスのデータ)

    if (typeof property === "string") {
      //emailもしくはusernameが重なってないかチェック
      const existingUserByEmail = await db.user.findUnique({
        where: { email: data },
      });
    }

    // if (existingUserByEmail) {
    //   throw Error("このメールアドレスは使われています。");
    // }

    return NextResponse.json({ checked: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { serverMessage: error.message },
        { status: 500 }
      );
    }
  }
}
