import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || '';
        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page') ?? '1';
        const limit = searchParams.get('limit') ?? '5';
        const search = searchParams.get('search');
        const role = searchParams.get('role');

        const url = getEnv(ENV.BACKEND_URL);
        const query = new URLSearchParams();
        query.set('page', page);
        query.set('limit', limit);

        if (search) query.set('search', search);
        if (role) query.set('role', role);

        const response = await fetch(`${url}/user?${query.toString()}`, {
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
