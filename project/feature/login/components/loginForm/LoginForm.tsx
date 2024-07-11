"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { AuthFieldType, loginType } from "../../../../types/auth";
import { loginSchema } from "@/schema/index";
import FormField from "@/app/components/elements/auth/AuthField";
import FormError from "@/app/components/elements/auth/FormError";
import FormSuccess from "@/app/components/elements/auth/FormSuccess";
import Social from "@/app/components/elements/auth/Social";
import BackButton from "@/app/components/elements/auth/BackButton";
import { login } from "@/actions/login";

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  // フォームのデータを受取ユーザーを作成
  const onSubmit: SubmitHandler<loginType> = async (values: loginType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        console.log(data);
      });
    });
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: AuthFieldType = {
    email: { placeholder: "exmaple@mail.com", inputType: "email" },
    password: { placeholder: "******", inputType: "password" },
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          {Object.keys(fieldObj).map((value, key) => (
            <FormField
              key={key}
              name={value}
              register={register}
              errors={errors}
              isPending={isPending}
              placeholder={fieldObj[value].placeholder}
              type={fieldObj[value].inputType}
            />
          ))}
        </div>

        <button>
          <a href="/auth/reset">パスワードを忘れた方はこちら</a>
        </button>

        <FormError message={error} />
        <FormSuccess message={success} />
        <button className="w-full mt-6" type="submit" disabled={isPending}>
          ログイン
        </button>
      </form>
      <Social />
      <BackButton
        href="/auth/signUp"
        message="まだアカウントをお持ちでない方はこちら"
      />
    </div>
  );
};

export default LoginForm;
