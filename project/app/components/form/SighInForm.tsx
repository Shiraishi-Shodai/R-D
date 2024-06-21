import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/zodSchema';

const SignInForm: FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form onSubmit={()=>handleSubmit} className='w-full'>
      <div className='space-y-2'>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            placeholder='mail@example.com'
            className='w-full p-2 border rounded'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            placeholder='パスワードを入力'
            className='w-full p-2 border rounded'
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
        </div>
      </div>
      <button type="submit" className='w-full mt-6 p-2 bg-blue-500 text-white rounded'>
        ログイン
      </button>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        または
      </div>
      <button className='w-full p-2 border rounded'>Googleでログイン</button>
      <p className='text-center text-sm text-gray-600 mt-2'>
        アカウントをお持ちでない場合は&nbsp;
        <Link href='/sign-up' className='text-blue-500 hover:underline'>
          新規登録
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;