import { z } from "zod";
import {
  passReset1Schema,
  passReset2Schema,
  signInSchema,
  signUpSchema,
} from "../lib/zodSchema";

// サインアップ時にデータベースに新規登録するデータの型を定義
export type UserType = {
  email: string;
  password: string;
  username: string;
};

// サインアップ画面のフォーム入力の際に使用する項目(username, email...)の型をsignUpSchemaから推測し定義
export type signUpType = z.infer<typeof signUpSchema>;
export type signInType = z.infer<typeof signInSchema>;
export type passReset1Type = z.infer<typeof passReset1Schema>;
export type passReset2Type = z.infer<typeof passReset2Schema>;
