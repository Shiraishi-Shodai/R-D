import React from 'react'
import { signIn } from '@/auth'

function SignIn() {
  return (
    <form
    action={async ()=> {
        "use server"
        await signIn('google', {redirectTo: "/dashboard"}) // サインインしたらリダイレクト
    }}>
        <button type='submit'>SignIn with Google</button>
    </form>
  )
}

export default SignIn