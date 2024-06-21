import NextAuth, { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const config: NextAuthConfig = {
    providers: [google ({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: "consent", // ユーザーに表示される認証画面の種類を指定
                access_type: "offline", // 、アプリケーションがどのような種類のアクセスを要求するかを指定
                response_type: "code", // 、認証リクエストに対するレスポンスの形式を指定
            }
        }
    })],

    basePath: "/api/auth", // NextAuth.jsのAPIエンドポイントのベースパスを指定するオプション
    callbacks: {
        authorized({ request, auth }) {
            try {
                const {pathname} = request.nextUrl;
                if(pathname === "/dashboard") return !!auth; // /dashboardは認証しないと見れない
                return true; // それ以外は自由に見れる
            } catch (err) {
                console.log(err);
            }
        },
        jwt({token, trigger, session}) {
            if(trigger === "update") token.name = session.user.name;
            return token;
        
        },
    },
    session: {

    }
} satisfies NextAuthConfig;

export const {auth, handlers, signIn, signOut} = NextAuth(config);  