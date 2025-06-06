import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value || '';

    try {
        const response = await fetch(`${getEnv(ENV.BACKEND_URL)}/auth/revalidate`, {
            headers: {Authorization: `Bearer ${token}`},
            credentials: 'include'
        });

        const data = await response.json();
        if (data.token) {
            return NextResponse.json({ok: true}, {status: 200});
        } else {

            return NextResponse.json({ok: false}, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ok: false}, {status: 500});
    }
}
