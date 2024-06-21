'use client';

import { Button } from '../ui/button';
// import GoogleSignInButton from '../GoogleSignInButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpType, UserType } from '../../../types/types';
import { signUpSchema } from '@/lib/zodSchema';
import { useState, Dispatch, SetStateAction } from 'react';

const SignUpForm : React.FC= () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const [errorMessage, setErrorMessage] : [string, Dispatch<SetStateAction<string>>] = useState<string>("")

  const onSubmit: SubmitHandler<signUpType> = async (data: signUpType) => {

        const {email, password, username} = data;
        const user : UserType = {email, password, username};

        // ここでサインアップ処理を行う
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
          }
          
          try{

            const res = await fetch('http://localhost:3000/api/user/', requestOption)
            const {message} = await res.json();

            // res.ok: このレスポンスが（ステータスが 200-299 で）成功したかどうかを表す論理値
            if(!res.ok) {
              // emailまたはusernameがすでに登録されていた場合
              console.log("レスポンスに問題あり");
              console.log(typeof message)
              console.log(message); // サーバーから送られたエラーメッセージを表示
              setErrorMessage(message)
            } else {
              // 正常にデータベースにデータが登録されたとき
              console.log("正常に完了")
              console.log(message); // リダイレクト
            }
          
        }catch(error) {
          console.error("ネットワークはまたはアクセス権の問題が発生しました")
        }
          
  }
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}  className='w-full'>
        <div className='space-y-2'>
          <div>
            <label htmlFor="username">Username</label>
            <input {...register("username")} />
            {errors.username && <p style={{color: "red"}}>{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input {...register("email")} />
            {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register("password")} />
            {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Re-Enter your password</label>
            <input {...register("confirmPassword")} /><br></br>
            {errors.confirmPassword && <p style={{color: "red"}}>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <p style={{color: "red"}}>{errorMessage}</p>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
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