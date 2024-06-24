import { z } from "zod";
import { signUpSchema } from "../lib/zodSchema";

// サインアップ時にデータベースに新規登録するデータの型を定義
export type UserType = {
  email: string;
  password: string;
  username: string;
};

// サインアップ画面のフォーム入力の際に使用する項目(username, email...)の型をsignUpSchemaから推測し定義
export type signUpType = z.infer<typeof signUpSchema>;
