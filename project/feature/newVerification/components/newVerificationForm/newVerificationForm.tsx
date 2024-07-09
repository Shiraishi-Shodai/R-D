"use client";

import { newVerification } from "@/actions/newVerification";
import BackButton from "@/app/components/elements/auth/BackButton";
import FormError from "@/app/components/elements/auth/FormError";
import FormSuccess from "@/app/components/elements/auth/FormSuccess";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // URLのクエリパラメータにアクセスするためのReact Hook
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // tokenかsuccess、またはerrorが変わったときのみ関数を再生成する
  const onSubmit = useCallback(() => {
    //   successまたはerrorに値が設定されていれば何もせず関数を抜ける
    if (success || error) return;
    if (!token) {
      setError("トークンが見つかりません");
      return;
    }

    //   トークンを検証
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("原因不明のエラーが発生しました");
      });
  }, [token, success, error]);

  // onSubmit関数が変更されるたびにこのuseEffectが再実行される
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <div>
        {/* successとerrorが設定されていないときビートローダーコンポーネントを表示 */}
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
      <BackButton href="/auth/signIn" message="ログイン" />
    </div>
  );
};

export default NewVerificationForm;
