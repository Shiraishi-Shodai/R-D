"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { UserType } from "@/feature/signUp/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // パスワードをハッシュ化
    const hashedPassword = await hash(password, 10);
    // ユーザーオブジェクトを作成
    const user: UserType = { email, password: hashedPassword, username };
    // データベースにユーザーオブジェクトレコードを挿入(INSERT)
    await db.user.create({
      data: user,
    });

    return NextResponse.json(
      { serverMessage: "User created succesesfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { serverMessage: error.message },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    //登録済みのemail一覧を取得。alreadyDataは[{email: "aaa"}, (email: "bbb")]といった構造
    const alreadyData = await db.user.findMany({
      select: {
        email: true,
      },
    });

    // alreadyDataからemailの文字列のみを取り出し、リストに格納。[{email: "aaa"}, {email: "bbb"}] => ["aaa", "bbb"]
    const alreadyEmails: string[] = [];
    for (let obj of alreadyData) {
      alreadyEmails.push(obj.email);
    }

    return NextResponse.json({ alreadyEmails: alreadyEmails });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { serverMessage: error.message },
        { status: 500 }
      );
    }
  }
}
