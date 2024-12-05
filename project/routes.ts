/**
 * ログインしていなくてもアクセスできるパスの配列
 * @type {RegExp[]}
 */
export const publicRoutes: RegExp[] = [
  /^\/$/, // ルートパス
  /^\/home$/, // "/home" パス
  /^\/productDetail\/.+$/, // 正規表現での "/productDetail/anything" パス
  /^\/auth\/newVerification$/, // "/auth/newVerification" パス
];

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
export const DEFAULT_LOGIN_REDIRECT = "/home";
