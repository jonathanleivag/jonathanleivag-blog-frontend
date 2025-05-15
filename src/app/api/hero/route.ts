import {NextResponse} from "next/server";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export async function GET() {
    try {
        const url = getEnv(ENV.BACKEND_URL);

        const response = await fetch(`${url}/blog/count/published`, {
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
