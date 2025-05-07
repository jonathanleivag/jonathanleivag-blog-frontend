import {FC} from "react";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {Editor} from "@tinymce/tinymce-react";
import {EditorComponentProps} from "@/type";

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

    const content_style = 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }';

    const images_upload_handler = ( blobInfo: { blob: () => Blob; filename: () => string }, success: (url: string) => void, failure: (errorMessage: string) => void) => {
        try {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

        } catch (err) {
            console.error('Upload error:', err);
            failure('Error en la subida de imagen');
        }
    }

    return <Editor
        apiKey={getEnv(ENV.NEXT_PUBLIC_TINY_API_KEY)}
        init={{
            height: 500,
            menubar: true,
            plugins,
            toolbar,
            content_style,
            file_picker_types: 'image',
            automatic_uploads: true,
            images_upload_handler
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
