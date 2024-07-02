// @prisma/clientからUserRoleをインポート
import { UserRole } from "@prisma/client";

// next-authのDefaultSession型をインポート
import { type DefaultSession } from "next-auth";

// ExtendedUser型を定義
// DefaultSession["user"]型にUserRoleを追加した型
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

// next-authモジュールの型定義を拡張
declare module "next-auth" {
  // Sessionインターフェースを拡張し、userプロパティにExtendedUser型を適用
  interface Session {
    user: ExtendedUser;
  }
}
