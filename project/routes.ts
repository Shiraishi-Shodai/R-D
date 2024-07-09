/**
 * ログインしていなくてもアクセスできるパスの配列
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/newVerification"];

/**
 * 認証に使用されるパスの配列
 * これらのルートはユーザーがログイン後/settingへとリダイレクトされる
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/signUp",
  "/auth/login",
  "/auth/error",
  "/auth/reset",
  "/auth/newPassword", // 一度アカウント情報を登録しているため、パブリックではなくauthRouteとする
];

/**
 * 認証用のapiプレフィックス
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * ログイン後にリダイレクトされるパス
 *@type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
