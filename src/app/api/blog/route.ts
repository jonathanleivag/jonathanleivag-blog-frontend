import {ENV} from "@/enum";
import {getEnv} from "@/utils/getEnv.util";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = getEnv(ENV.BACKEND_URL)
      const response = await  fetch(`${url}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `${req.headers.get('Authorization') || ''}`
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
