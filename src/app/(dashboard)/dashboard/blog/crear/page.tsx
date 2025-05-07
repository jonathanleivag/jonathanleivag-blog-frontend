'use client'

import {FC, useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {validationSchemaFormBlog} from "@/validateSchema";
import {Blog, BlogFormValues} from "@/type";
import EditorComponent from "@/components/dashboard/blogs/form/editor.component";
import UploadImageComponent from "@/components/dashboard/blogs/form/uploadImage.component";
import SelectCategories from "@/components/dashboard/blogs/form/selectCatagories.component";
import {toast} from "react-hot-toast";
import {useAppDispatch} from "@/lib/redux/hooks";
import {addBlog} from "@/lib/redux/features/blog/blog.slice";


const CreateBlogPage: FC = () => {
    const appDispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: BlogFormValues = {
        title: "",
        description: "",
        content: "",
        slug: "",
        category: "",
        image: "",
        isPopular: false,
        isPublished: false,
        tags: "",
        readingTime: 1
    };

    const handleSubmit = async (values: BlogFormValues, { setTouched, resetForm }: FormikHelpers<BlogFormValues>) => {
        if (!values.content) {
           await setTouched({ content: true }, true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
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

            appDispatch(addBlog(data));
            toast.success('Publicación creada exitosamente');
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
            <h1 className="text-3xl font-bold mb-6">Crear Nueva Publicación</h1>
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
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
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
                                    Contenido
                                </label>
                                <EditorComponent values={values} setFieldValue={setFieldValue} />
                                {touched.content && errors.content && (
                                  <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <Field
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Categoría
                                </label>
                                <SelectCategories />
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                            <UploadImageComponent values={values} setFieldValue={setFieldValue} />
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (separados por comas)
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
                                    Tiempo de lectura (minutos)
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
                                         flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creando...
                                    </>
                                ) : (
                                    'Crear Publicación'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateBlogPage;
