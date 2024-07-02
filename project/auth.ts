import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "auth/signIn",
    error: "auth/error",
  },
  // 認証に関連するアクションが実行されたときに呼び出される非同期関数を定義する
  events: {
    // OAuthで印象する際に実行される。(googleやgithubでサインインやアカウント作成をするときに実行される)
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // クライアントサイドやサーバーサイドでセッションデータを取得する際に実行される
    // session関数では引数にjwt関数からリターンしたtokenを受け取る。token.subにはユーザの識別子などJWTの主体が格納される
    async session({ token, session }) {
      // トークンの識別子とセッションにユーザーが存在するとき、sessionのuserにtokenの識別子を代入する
      if (token.sub && session.user) session.user.id = token.sub;

      // トークンがroleプロパティを持ち、session.userが存在する時、tokenのroleをsession.userのプロパティに追加する
      if (token.role && session.user)
        session.user.role = token.role as UserRole;
      return session;
    },

    // 認証が必要なリクエストごとに呼び出される
    async jwt({ token }) {
      // トークンの識別子が存在していなければtokenをそのまま返す
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      // 受け取ったトークンに対応するユーザーがいなければトークンをそのまま返す
      if (!existingUser) return token;

      // tokenにroleプロパティを追加する
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
