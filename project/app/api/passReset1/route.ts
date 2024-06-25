import { SendEmailDto } from "@/feature/passReset1/types";
import {
  getSendEmailDto,
  sendEmail,
} from "@/feature/passReset1/utils/nodeMailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = await body;

  try {
    const sendDtoObj: SendEmailDto = getSendEmailDto(email);
    const result = await sendEmail(sendDtoObj);
    return NextResponse.json({ message: "送信完了" });
  } catch (error) {
    return NextResponse.json(
      { message: "送信エラーが発生しました" },
      { status: 500 }
    );
  }
}
