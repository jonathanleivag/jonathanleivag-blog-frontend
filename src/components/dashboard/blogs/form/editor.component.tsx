import {FC} from "react";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {Editor} from "@tinymce/tinymce-react";
import {EditorComponentProps} from "@/type";
import {toast} from "react-hot-toast";

const EditorComponent:FC<EditorComponentProps> = ({values, setFieldValue}) => {

    const plugins = [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
        'emoticons'
    ]

    const toolbar = 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image media | emoticons | help'


const images_upload_handler = async (
    blobInfo: { blob: () => Blob; filename: () => string },
) => {
    try {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        const response = await fetch('/api/blog/cloudinary', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error en la respuesta:', errorData);
            toast.error('Error al subir la imagen');
            return;
        }
        const data = await response.json();
        if (!data?.url || typeof data.url !== 'string') {
            console.error('Respuesta inválida:', data);
            toast.error('Error al procesar la imagen');
            return;
        }
        console.log('Imagen subida correctamente:', data.url);
        toast.success('Imagen subida correctamente');
        return data.url
    } catch (err) {
        console.error('Error de subida:', err);
        toast.error('Error al subir la imagen');
    }
};

    return <Editor
        apiKey={getEnv(ENV.NEXT_PUBLIC_TINY_API_KEY)}
        init={{
            height: 500,
            menubar: true,
            plugins,
            toolbar,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img { max-width: 100%; height: auto; }',
            images_upload_handler,
            automatic_uploads: true,
            file_picker_types: 'image',
            images_file_types: 'jpg,jpeg,png,gif,webp',
            image_dimensions: false,
            image_advtab: false,
            image_toolbar: 'alignleft aligncenter alignright'
        }}
        value={values.content}
        onEditorChange={(content) => {
            setFieldValue('content', content);
        }}
        onBlur={() => {
            setFieldValue('content', values.content, true);
        }}
    />
}

export default EditorComponent;
