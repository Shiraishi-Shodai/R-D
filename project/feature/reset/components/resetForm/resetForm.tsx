"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { AuthFieldType, resetType } from "../../../../types/auth";
import BackButton from "@/app/components/elements/auth/BackButton";
import FormError from "@/app/components/elements/auth/FormError";
import FormSuccess from "@/app/components/elements/auth/FormSuccess";
import { Button } from "@/app/components/elements/button";
import FormField from "@/app/components/elements/auth/AuthField";
import { resetSchema } from "@/schema";
import { reset } from "@/actions/reset";

const ResetForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  // formデータのバリデーションチェック準備
  const {
    register, // フォームの入力フィールドをReact-Hook-Formの管理下に置くためのメソッド
    handleSubmit,
    formState: { errors }, // バリデーションチェックに失敗したときに表示するエラーオブジェクト
    control,
  } = useForm<resetType>({
    resolver: zodResolver(resetSchema),
  });

  // フォームのデータを受取ユーザーを作成
  const onSubmit: SubmitHandler<resetType> = async (values: resetType) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  // FormFieldコンポーネントをマップで回すためにオブジェクトを用意
  const fieldObj: AuthFieldType = {
    email: { placeholder: "exmaple@mail.com", inputType: "email" },
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
        <Button className="w-full mt-6" type="submit" disabled={isPending}>
          メールを送信
        </Button>
      </form>
      <BackButton href="/auth/login" message="ログイン画面へ戻る" />
    </div>
  );
};

export default ResetForm;
