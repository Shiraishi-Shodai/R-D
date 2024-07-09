import { z } from "zod";
import {
  loginSchema,
  newPasswordSchema,
  resetSchema,
  signUpSchema,
} from "@/schema/index";
import Mail from "nodemailer/lib/mailer";

// サインアップ時にデータベースに新規登録するデータの型を定義
export type UserType = {
  email: string;
  password: string;
  username: string;
};

// サインアップ画面のフォーム入力の際に使用する項目(username, email...)の型をsignUpSchemaから推測し定義
export type signUpType = z.infer<typeof signUpSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type resetType = z.infer<typeof resetSchema>;
export type newPasswordType = z.infer<typeof newPasswordSchema>;

export type AuthFieldType = {
  [key: string]: { placeholder: string; inputType: string };
};

export type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  html: string;
};
