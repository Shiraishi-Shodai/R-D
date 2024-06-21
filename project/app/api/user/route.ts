import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"
import { hash } from 'bcrypt'
import { UserType } from '@/types/types';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, username, password } = body;
        
        //emailもしくはusernameが重なってないかチェック
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email },
        });

        if(existingUserByEmail) {
            throw Error("このメールアドレスは使われています。")
        }
        
        //usernameが重なってないかチェック
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if(existingUserByUsername) {
            throw Error("このユーザーネームは使われています。")
        }

        const hashedPassword = await hash(password, 10)
        const user : UserType = {email, password: hashedPassword, username};
        
        // const newUser = await db.user.create({
        //     data: user
        // });
        // const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({"message": "User created succesesfully" },  {status: 200});
        
    } catch(error: unknown) {
        if(error instanceof Error) {
            return NextResponse.json({"message": error.message }, { status: 500 });
        }
    }
}