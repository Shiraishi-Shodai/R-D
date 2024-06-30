import Mail from "nodemailer/lib/mailer";
import "iron-session";
import { IronSession } from "iron-session";

export type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
};

// セッションのデータ型定義
export type sessionData = {
  securityCode: string;
};
