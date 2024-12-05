"use client";

import { useState, useTransition } from "react";
import { AuthFieldType, signUpType } from "../../../../types/auth";
import FormField from "@/app/components/elements/auth/AuthField";
import { signUpSchema } from "@/schema";
import { signUp } from "@/actions/signUp";
import FormError from "@/app/components/elements/auth/FormError";
import FormSuccess from "@/app/components/elements/auth/FormSuccess";
import BackButton from "@/app/components/elements/auth/BackButton";
import Social from "@/app/components/elements/auth/Social";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  });

  // フォームのデータを受取ユーザーを作成
  const onSubmit: SubmitHandler<signUpType> = async (values: signUpType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signUp(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: AuthFieldType = {
    name: { placeholder: "John Doe", inputType: "text" },
    email: { placeholder: "exmaple@mail.com", inputType: "email" },
    password: { placeholder: "******", inputType: "password" },
    confirmPassword: { placeholder: "******", inputType: "password" },
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

        <FormError message={error} />
        <FormSuccess message={success} />
        <button  type="submit" disabled={isPending}>
          Sign up
        </button>
      </form>
      <Social />
      <BackButton href="/auth/login" message="ログインはこちら" />
    </div>
  );
};

export default SignUpForm;
