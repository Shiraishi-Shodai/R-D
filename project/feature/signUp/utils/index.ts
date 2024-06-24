import { Dispatch, SetStateAction } from "react";
import { UserType } from "../types";
import { SIGN_UP_API_URL } from "../constants";

// Feature: 既存のメールアドレスリストを返す
// Execution Timing: useEffect内でSignUpFormコンポーネントが最初にレンダリングされる際に1度だけ実行
// Returns: alreadyEmails : string[]
export const getAlreadyEmails = async () => {
  const response: Response = await fetch(SIGN_UP_API_URL);
  const { alreadyEmails } = await response.json();
  return alreadyEmails;
};

// Feature: 現在入力しているメアドが既存のメアドリストに含まれているかをチェックし、含まれていればtrue, そうでなければfalseを返す
// Execution Timing: サインアップ画面のemail入力欄の値が変更される度に実行
// Returns: true or false ; boolean
export const isAlready = (watchEmail: string, alreadyEmails: string[]) => {
  for (let alredyEmail of alreadyEmails) {
    if (watchEmail === alredyEmail) {
      return true;
    }
  }
  return false;
};

// Feature: ユーザー作成の際にfetch関数でPOST送信する際のオプションを取得する
// Execute Timing: /api/api/signUpにPOST送信する際に実行
// Returns: Object
const getRequestOption = (bodyData: UserType) => {
  // fetchリクエストのオプションを指定
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  };

  return requestOption;
};

// Feature: UserType型のオブジェクトを引数で受取り/app/api/signUpに引数で受け取ったデータをPOST送信する
// Execute Timing: サインアップ画面で入力し、送信ボタンを押された際に実行
// Returns: serverMessage : string
export const createUser = async (user: UserType) => {
  const response = await fetch(SIGN_UP_API_URL, getRequestOption(user));
  const { serverMessage } = await response.json();
  return serverMessage;
};
