"use client";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { UserType, signUpType } from "../../types";
import { signUpSchema } from "../../lib/zodSchema";
import { Button } from "@/app/components/elements/button";
import { getAlreadyEmails, isAlready, createUser } from "../../utils";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  // アカウント作成成功時にサインイン画面にリダイレクトするためのルーターを用意
  const router = useRouter();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // signUpTypeのプロパティが変更される度にバリデーションチェックを行う
  });

  // 重複したデータがすでに存在するかサーバーに問い合わせる対象のデータを監視する
  const watchEmail = useWatch({
    control,
    name: "email",
  });

  // 現在入力しているメールアドレスが登録済みか
  const [alreadyEmailFlag, setAlreadyEmailFlag]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  // コンポーネント表示時の登録済みメールアドレスリスト
  const alreadyEmails = useRef<string[]>([]);

  // コンポーネントを初回のみすでに登録されているemail一覧を取得
  useEffect(() => {
    getAlreadyEmails()
      .then((emails: string[]) => {
        alreadyEmails.current = emails;
      })
      .catch((error) =>
        console.log("登録済みのメールアドレス取得時にエラーが発生しました")
      );
  }, []);

  // useEffectはレンダー(変更されたDOMの計算)の結果がブラウザに描画された後に動作する
  useEffect(() => {
    // emailが変更される度にサーバーに変更された値を送信して、すでに登録されているデータかチェックする
    const result: boolean = isAlready(watchEmail, alreadyEmails.current);
    setAlreadyEmailFlag(result);
  }, [watchEmail]);

  const onSubmit: SubmitHandler<signUpType> = async (data: signUpType) => {
    const { email, password, username } = data;
    const user: UserType = { email, password, username };

    createUser(user)
      .then((res) => {
        router.push("/signIn"); // リダイレクト
      })
      .catch((error) => {
        console.log(error);
      });
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

      {Object.keys(errors).length > 0 || alreadyEmailFlag ? (
        <Button className="w-full mt-6" type="submit" disabled>
          Sign up
        </Button>
      ) : (
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
      )}
    </form>
  );
};

export default SignUpForm;
