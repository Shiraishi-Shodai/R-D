"use client";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/elements/button";
import { useRouter } from "next/navigation";
import { passReset2Type } from "@/types";
import { passReset2Schema } from "@/lib/zodSchema";
import FormField from "@/app/components/elements/AuthField";

const PassResetForm1: React.FC = () => {
  // アカウント作成成功時にサインイン画面にリダイレクトするためのルーターを用意
  const router = useRouter();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<passReset2Type>({
    resolver: zodResolver(passReset2Schema),
    mode: "onChange", // signUpTypeのプロパティが変更される度にバリデーションチェックを行う
  });

  // 重複したデータがすでに存在するかサーバーに問い合わせる対象のデータを監視する
  const watchEmail = useWatch({
    control,
    name: ["password", "confirmPassword"],
  });

  // 入力されたメアド宛にセキュリティコードを送る
  const onSubmit: SubmitHandler<passReset2Type> = async (
    data: passReset2Type
  ) => {
    await fetch("/api/passReset1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // router.push("/signIn"); // パスワード再設定画面へリダイレクト
      })
      .catch((error) => console.log(error.message));
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: passReset2Type = {
    password: "",
    confirmPassword: "",
    securityCode: 0,
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

      <Button className="w-full mt-6" type="submit">
        Sign up
      </Button>
    </form>
  );
};

export default PassResetForm1;
