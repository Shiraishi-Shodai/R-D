"use client";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/elements/button";
import { passReset2Type } from "@/types";
import { passReset2Schema } from "@/lib/zodSchema";
import FormField from "@/app/components/elements/auth/AuthField";
import { useRouter } from "next/navigation";

const PassResetForm2: React.FC = () => {
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

  const onSubmit: SubmitHandler<passReset2Type> = async (
    data: passReset2Type
  ) => {
    await fetch("/api/passReset2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // router.push("/passReset3"); // パスワード再設定画面へリダイレクト
      })
      .catch((error) => console.log(error.message));
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: passReset2Type = {
    securityCode: "0",
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

      <Button type="submit">Send Security Code</Button>
    </form>
  );
};

export default PassResetForm2;
