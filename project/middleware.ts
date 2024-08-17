import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "./routes";

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRouter = apiAuthPrefix.startsWith(nextUrl.pathname);
  const isPublicRouter = publicRoutes.some((pattern) =>
    pattern.test(nextUrl.pathname)
  );

  const isAuthRouter = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRouter) return null;

  if (isAuthRouter) {
    // ログインしている状態で/auth/*のページにアクセスしようとした場合
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // ログインしていない状態で、パブリックじゃないページにアクセスした時
  if (!isLoggedIn && !isPublicRouter) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

// ミドルウェアを起動させないパス
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
