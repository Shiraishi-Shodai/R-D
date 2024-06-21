import {z} from "zod";

export const signUpSchema = z.object({
    username: z.string().min(1, {message: "1文字以上のユーザー名を入力してください"}),
    email: z.string().email({message: "メールアドレスを入力してください"}),
    password: z.string().min(8).max(12).regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {message: "半角英数字で入力してください"}),
    confirmPassword: z.string().min(1, {message: "確認用のパスワードを入力してください"})

})
.superRefine(({password, confirmPassword}, ctx) => {
    if(password !== confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: "custom",
            message: "パスワードが一致しません"
        })
    }
})