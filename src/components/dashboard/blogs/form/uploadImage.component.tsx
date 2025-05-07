import {ChangeEvent, FC, useState} from "react";
import Image from "next/image";
import {ErrorMessage} from "formik";
import {toast} from "react-hot-toast";
import {UploadImageComponentProps} from "@/type";

const UploadImageComponent:FC<UploadImageComponentProps> = ({ setFieldValue, values }) => {
    const [isUploading, setIsUploading] = useState(false);


    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/blog/cloudinary', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al subir la imagen');
            }

            await setFieldValue("image", data.url);
            toast.success('Imagen subida correctamente');

        } catch (error) {
            console.error('Error al subir:', error);
            toast.error('Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    }

    return <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen
        </label>
        <div className="relative">
            <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
                id="imageUpload"
                disabled={isUploading}
            />
            <label
                htmlFor="imageUpload"
                className={`border border-gray-300 rounded-lg p-2 hover:bg-gray-50 cursor-pointer inline-block
                ${isUploading ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
            >
                {isUploading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Subiendo...</span>
                    </div>
                ) : (
                    'Subir Imagen'
                )}
            </label>
        </div>
        {values.image && (
            <div className="mt-2 relative w-fit">
                <Image
                    src={values.image}
                    alt="Vista previa"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover border"
                />
            </div>
        )}
        <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1"/>
    </div>
}

export default UploadImageComponent;
