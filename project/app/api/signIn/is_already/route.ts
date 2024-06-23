import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const checkData = await req.json(); // 使用済みかチェックしたいデータを取得(ユーザー名かメールアドレスのデータ)
    let alreadyFlag = false; //登録済みのメールアドレスであればtrue, そうでなければfalseを保持

    console.log(checkData);
    //emailもしくはusernameが重なってないかチェック
    const existingUserByEmail = await db.user.findUnique({
      where: { email: checkData },
    });

    if (!!existingUserByEmail) {
      alreadyFlag = true;
    }

    return NextResponse.json({ alreadyFlag: alreadyFlag });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { serverMessage: error.message },
        { status: 500 }
      );
    }
  }
}
