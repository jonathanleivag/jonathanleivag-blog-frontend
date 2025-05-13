import {ENV} from "@/enum";
import {getEnv} from "@/utils/getEnv.util";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value || '';
    const url = getEnv(ENV.BACKEND_URL)
      const response = await  fetch(`${url}/blog`, {
        method: 'POST',
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


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const published = searchParams.get('published');
        const popular = searchParams.get('popular');
        const page = searchParams.get('page') ?? '1';
        const limit = searchParams.get('limit') ?? '5';
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        const url = getEnv(ENV.BACKEND_URL);
        const query = new URLSearchParams();
        query.set('page', page);
        query.set('limit', limit);

        if (published) query.set('published', published);
        if (popular) query.set('popular', popular);
        if (search) query.set('search', search);
        if (category) query.set('category', category);

        const response = await fetch(`${url}/blog?${query.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
