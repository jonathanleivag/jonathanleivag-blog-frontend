import {v2 as cloudinary} from 'cloudinary';
import {NextRequest, NextResponse} from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No se ha proporcionado ningún archivo' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileStr = `data:${file.type};base64,${buffer.toString('base64')}`;

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: process.env.FORLDER,
            resource_type: 'auto',
            upload_preset: process.env.NEXT_PUBLIC_UPLOADPRESET
        });

        return NextResponse.json({
            message: 'Imagen subida correctamente',
            url: uploadResponse.secure_url,
            publicId: uploadResponse.public_id
        }, { status: 200 });

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}

