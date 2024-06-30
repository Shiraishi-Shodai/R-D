import { getSession } from "@/feature/passReset1/lib/session";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await req.json();
    const { securityCode } = await response;
    const session = await getSession();
    session.securityCode = securityCode;
    return NextResponse.json({
      message: "送信完了",
    });
  } catch (error) {
    return NextResponse.json({ message: "エラーが発生しました" });
  }
}
