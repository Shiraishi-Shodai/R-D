"use client";

import { Button } from "../ui/button";
// import GoogleSignInButton from '../GoogleSignInButton';
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpType, UserType } from "../../../types/types";
import { signUpSchema } from "@/lib/zodSchema";
import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";

const SignUpForm: React.FC = () => {
  /* APIエンドポイント */
  const create_user_URL = "http://localhost:3000/api/signIn/create_user"; // formデータ送信時にユーザー作成
  const is_already_URL = "http://localhost:3000/api/signIn/is_already"; // メールアドレスがすでに存在するかチェック

  // fetch関数でPOST送信する際のオプションを取得する
  const getRequestOption = (bodyData: string | UserType) => {
    // fetchリクエストのオプションを指定
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };

    return requestOption;
  };

  // formデータのバリデーションチェック準備
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // signUpTypeのプロパティが変更される度にバリデーションチェックを行う
  });

  // 重複したデータがすでに存在するかサーバーに問い合わせる対象のデータを監視する
  const watchField = useWatch({
    control,
    name: ["email"],
    defaultValue: {
      email: "",
    },
  });

  // watchFieldsで監視しているデータの内、どちらが変更されたかを判断するために一つ前のwatchFieldsの値を一時的に保持する
  const watchSaveData = useRef("");
  // 現在入力しているメールアドレスが登録済みか
  const [alreadyEmailFlag, setAlreadyEmailFlag] = useState(false);

  // emailが変更される度にサーバーに変更された値を送信して、すでに登録されているデータかチェックする
  // useEffectはレンダー(変更されたDOMの計算)の結果がブラウザに描画された後に動作する
  useEffect(() => {
    let checkData: string = ""; // 登録済みかチェックしたいプロパティとそのデータを格納

    // どちらの値が変更されたか判断する
    watchSaveData.current = watchField[0]; // useRefで管理しているデータを更新
    checkData = watchSaveData.current; // サーバー側で存在の有無を確認するデータを設定

    // 変更されたメールアドレスを送信しすでに存在するか確認
    const isAlready = async (checkData: string) => {
      const res: Response = await fetch(
        is_already_URL,
        getRequestOption(checkData)
      );

      const { alreadyFlag } = await res.json();
      return alreadyFlag;
    };

    // 非同期関数を実行するための関数
    const getRes = async () => {
      const alreadyFlag = await isAlready(checkData);
      setAlreadyEmailFlag(alreadyFlag);
    };

    getRes();
    console.log(alreadyEmailFlag);
  }, [watchField]);

  const [serverMessage, setServerMessage]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>("");

  const onSubmit: SubmitHandler<signUpType> = async (data: signUpType) => {
    const { email, password, username } = data;
    const user: UserType = { email, password, username };

    try {
      const res = await fetch(create_user_URL, getRequestOption(user));
      const { serverMessage } = await res.json();

      // res.ok: このレスポンスが（ステータスが 200-299 で）成功したかどうかを表す論理値
      if (!res.ok) {
        // emailまたはusernameがすでに登録されていた場合
        console.log("レスポンスに問題あり");
        setServerMessage(serverMessage); // サーバーから送られたエラーメッセージをセット
      } else {
        // 正常にデータベースにデータが登録されたとき
        console.log("正常に完了");
        console.log(serverMessage); // リダイレクト
      }
    } catch (error) {
      console.error("ネットワークはまたはアクセス権の問題が発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
        <div>
          <label htmlFor="username">Username</label>
          <input {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Re-Enter your password</label>
          <input {...register("confirmPassword")} />
          <br></br>
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {alreadyEmailFlag && (
        <p style={{ color: "red" }}>
          このメールアドレスはすでに登録されています
        </p>
      )}

      <Button className="w-full mt-6" type="submit">
        Sign up
      </Button>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      {/* <p className='text-center text-sm text-gray-600 mt-2'>
          If you don&apos;t have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Sign in
          </Link>
        </p> */}
    </form>
  );
};

export default SignUpForm;
