import {NextRequest, NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const id = (await params).id;
        const token = request.cookies.get('token')?.value || '';
        const url = getEnv(ENV.BACKEND_URL);

        const response = await fetch(`${url}/category/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(await request.json())
        });

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}
