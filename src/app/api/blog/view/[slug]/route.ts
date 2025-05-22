import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET(req: NextRequest, {params}: { params: Promise<{ slug: string }> },) {
    try {
        const url = getEnv(ENV.BACKEND_URL);
        const response = await fetch(`${url}/blog/view/${(await params).slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }
        return NextResponse.json({error: "Fetch failed"}, {status: 500});
    }
}


export async function PATCH(req: NextRequest, {params}: { params: Promise<{ slug: string }> },) {
    try {
        const slug = (await params).slug;
        const url = getEnv(ENV.BACKEND_URL)
        const token = req.cookies.get('token')?.value || '';
        
        if (token !== '') return NextResponse.json({}, {status: 200});

        const response = await fetch(`${url}/blog/view/${slug}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }
        return NextResponse.json({error: "Fetch failed"}, {status: 500});
    }
}
