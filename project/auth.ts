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
    // ユーザーがサインアップできるかどうかを制御する
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        // グーグル認証に使用したメアドがcredentialsで登録済みか？
        if (existingUser) {
          const existingGoogle = await db.account.findFirst({
            where: { userId: existingUser.id },
          });

          // credentialsで登録済みのメアドがすでにaccountテーブルに存在するか？
          if (!existingGoogle) {
            // 既存のアカウントとグーグルアカウントをリンクする
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: "bearer",
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state?.toString(),
              },
            });
          }
        }
      }
      // OAuth認証は常に許可する
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      // メール認証なしでサインインできないようにする
      if (!existingUser?.emailVerified) return false;

      // 2段階認証チェック
      return true;
    },
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

    //JWT トークンが作成または更新されるときに実行される
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
  jwt: { maxAge: 6 },
});
