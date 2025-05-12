import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET( request: NextRequest) {
    try {
        const url = getEnv(ENV.BACKEND_URL);
        const token = request.cookies.get('token')?.value || '';

        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') ?? '1';
        const limit = searchParams.get('limit') ?? '5';

        const query = new URLSearchParams();
        query.set('page', page);
        query.set('limit', limit);

        const response = await fetch(`${url}/audit-log?${query.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}
