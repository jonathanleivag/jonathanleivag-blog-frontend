import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function PATCH(req: NextRequest,  { params }: { params: Promise<{ id: string }> },) {
    try {
        const id = (await params).id;
        const token = req.cookies.get('token')?.value || '';
        const url = getEnv(ENV.BACKEND_URL)
        const response = await  fetch(`${url}/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(await req.json())
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
