import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function POST(req: NextRequest) {
    try {
        console.log(req.body)
        const url = `${getEnv(ENV.BACKEND_URL)}/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(await req.json())
        })
        const data = await response.json()
        return NextResponse.json(data,{status: 200})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {status: 400})
        }
        return NextResponse.json('Error fetch', {status: 400})
    }
}
