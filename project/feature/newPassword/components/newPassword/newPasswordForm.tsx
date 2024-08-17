"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { AuthFieldType, newPasswordType } from "../../../../types/auth";
import BackButton from "@/app/components/elements/auth/BackButton";
import FormError from "@/app/components/elements/auth/FormError";
import FormSuccess from "@/app/components/elements/auth/FormSuccess";
import FormField from "@/app/components/elements/auth/AuthField";
import { newPasswordSchema } from "@/schema";
import { newPassword } from "@/actions/newPassword";
import { useSearchParams } from "next/navigation";

const ResetForm: React.FC = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<newPasswordType>({
    resolver: zodResolver(newPasswordSchema),
  });

  // フォームのデータを受取ユーザーを作成
  const onSubmit: SubmitHandler<newPasswordType> = async (
    values: newPasswordType
  ) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: AuthFieldType = {
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
        <button className="w-full mt-6" type="submit" disabled={isPending}>
          パスワードをリセット
        </button>
      </form>
      <BackButton href="/auth/login" message="ログイン画面へ戻る" />
    </div>
  );
};

export default ResetForm;
