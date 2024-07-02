import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { sessionData } from "../types";
import { cookies } from "next/headers";

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "pass-reset",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true, // クライアント側のJavaScriptからアクセスできないようにする
    maxAge: 24 * 60 * 60, // クッキーの有効期限（例：24時間）
    sameSite: "lax", // サイト間のクッキー送信ポリシー
  },
};

export async function getSession() {
  const session = await getIronSession<sessionData>(cookies(), sessionOptions);
  return session;
}
