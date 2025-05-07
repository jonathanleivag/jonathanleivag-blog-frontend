import {ChangeEvent, FC, useState} from "react";
import {useAppDispatch} from "@/lib/redux/hooks";
import {useRouter} from "next/navigation";
import {Blog, BlogFormValues, FormBlogComponentProps} from "@/type";
import {ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers, FormikValues} from "formik";
import {toast} from "react-hot-toast";
import {addBlog, updateBlog} from "@/lib/redux/features/blog/blog.slice";
import {validationSchemaFormBlog} from "@/validateSchema";
import EditorComponent from "@/components/dashboard/blogs/form/editor.component";
import SelectCategories from "@/components/dashboard/blogs/form/selectCatagories.component";
import UploadImageComponent from "@/components/dashboard/blogs/form/uploadImage.component";

const FormBlogComponent:FC<FormBlogComponentProps> = ({blog}) => {
    const appDispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const initialValues: BlogFormValues = {
        title: blog?.title || "",
        description: blog?.description || "",
        content: blog?.content || "",
        slug: blog?.slug || "",
        category: blog?.category._id || "",
        image: blog?.image || "",
        isPopular: blog?.popular || false,
        isPublished: blog?.published || false,
        tags: blog?.tags.join(',') || "",
        readingTime: blog?.readingTime || 1
    };

    const changeTitleSlug = async (e: ChangeEvent<HTMLInputElement>, setFieldValue:(field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>) => {
        const value = e.target.value;
        const slug = value
            .toLowerCase()
            .trim()
            .replace(/[áéíóúüñ]/g, char => {
                const chars: { [key: string]: string } = {
                    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u', 'ñ': 'n'
                };
                return chars[char] || char;
            })
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^-+|-+$/g, '');

        await setFieldValue('title', value);
        await setFieldValue('slug', slug);
    }

    const handleSubmit = async (values: BlogFormValues, { setTouched, resetForm }: FormikHelpers<BlogFormValues>) => {
        if (!values.content) {
            await setTouched({ content: true }, true);
            return;
        }

        setIsLoading(true);
        try {
            const url =  blog === undefined ? '/api/blog' : `/api/blog/${blog._id}`
            const method =  blog === undefined ? 'POST' : 'PATCH'
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...values, tags: values.tags.split(','), popular: values.isPopular, published: values.isPublished})
            });

            const data: Blog = await response.json();

            if (!response.ok) {
                toast.error('Error en la petición');
                return;
            }

            if (data.message !== undefined) {
                toast.error(data.message);
                return;
            }

            if (blog === undefined) {
                appDispatch(addBlog(data));
                toast.success('Publicación creada exitosamente');
            } else {
                appDispatch(updateBlog(data));
                toast.success(`Publicación ${blog.title} se ha actualizado con éxito`);
            }
            router.replace(`/dashboard/blog/view/${data.slug}`)
            resetForm();
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6"> {blog !== undefined ? `Editar Publicación ${blog.title}` : 'Crear Nueva Publicación'}</h1>
            <div className="mb-4 text-sm text-gray-600">
                Los campos marcados con <span className="text-red-500">*</span> son obligatorios
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaFormBlog}
                onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
            >
                {({setFieldValue, values, errors, touched}) => (
                    <Form className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Título <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => changeTitleSlug(e, setFieldValue)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contenido <span className="text-red-500">*</span>
                                </label>
                                <EditorComponent values={values} setFieldValue={setFieldValue} />
                                {touched.content && errors.content && (
                                    <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    disabled={true}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Categoría <span className="text-red-500">*</span>
                                </label>
                                <SelectCategories />
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <UploadImageComponent values={values} setFieldValue={setFieldValue} />
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (separados por comas) <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiempo de lectura (minutos) <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="number"
                                    id="readingTime"
                                    name="readingTime"
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="readingTime" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div className="flex space-x-6">
                                <div className="flex items-center">
                                    <Field
                                        type="checkbox"
                                        id="isPopular"
                                        name="isPopular"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-700">
                                        Es popular
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Field
                                        type="checkbox"
                                        id="isPublished"
                                        name="isPublished"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                                        Publicado
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700
                                         transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed
                                         flex items-center gap-2 cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {blog!== undefined ? 'Editando...': 'Creando...'}
                                    </>
                                ) : (
                                    blog!== undefined ? 'Editar Publicación' : 'Crear Publicación'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormBlogComponent;
