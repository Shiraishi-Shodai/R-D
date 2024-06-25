"use client";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { UserType, signUpType } from "../../../../types";
import { signUpSchema } from "../../lib/zodSchema";
import { Button } from "@/app/components/elements/button";
import { getAlreadyEmails, isAlready } from "../../utils";
import { useRouter } from "next/navigation";
import FormField from "@/feature/components/authField/AuthField";
import { SIGN_UP_API_URL } from "../../constants";

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

  // フォームのデータを受取ユーザーを作成
  const onSubmit: SubmitHandler<signUpType> = async (data: signUpType) => {
    const { email, password, username } = data;
    const user: UserType = { email, password, username };

    await fetch(SIGN_UP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        router.push("/signIn"); // リダイレクト
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: signUpType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
        {Object.keys(fieldObj).map((value, key) => (
          <FormField
            key={key}
            name={value}
            register={register}
            errors={errors}
          />
        ))}
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
