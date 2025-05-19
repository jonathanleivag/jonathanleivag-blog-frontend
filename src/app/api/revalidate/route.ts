import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value || '';

    try {
        const response = await fetch(`${getEnv(ENV.BACKEND_URL)}/auth/revalidate`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const data = await response.json();

        if (data.token) {
            NextResponse.json({ok: true}, {status: 200}).cookies.set({
                name: 'token',
                value: data.token,
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            return
        } else {
            NextResponse.json({ok: false}, {status: 200}).cookies.set({
                name: 'token',
                value: '',
                path: '/',
                maxAge: 0
            });
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({ok: false}, {status: 500});
    }
}
