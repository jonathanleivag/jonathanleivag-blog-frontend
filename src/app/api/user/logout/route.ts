import {NextResponse} from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'Sesión cerrada exitosamente'
        }, {
            status: 200
        });

        response.cookies.set({
            name: 'token',
            value: '',
            expires: new Date(0),
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 });
    }
}
