import {ENV} from "@/enum";
import {getEnv} from "@/utils/getEnv.util";
import {type NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const url = getEnv(ENV.BACKEND_URL)
        const response = await  fetch(`${url}/category/find/blogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return NextResponse.json(data, { status: 200 });
    }  catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || '';
        const url = getEnv(ENV.BACKEND_URL)
        const response = await fetch(`${url}/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(await req.json())
        })

        const data = await response.json()
        return NextResponse.json(data, { status: 200 });
    }catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}
