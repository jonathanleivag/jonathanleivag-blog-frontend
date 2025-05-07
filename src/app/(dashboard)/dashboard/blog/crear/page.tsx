'use client'

import {FC} from "react"; // Añade useState
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {validationSchemaFormBlog} from "@/validateSchema";
import {BlogFormValues} from "@/type";
import EditorComponent from "@/components/dashboard/blogs/form/editor.component";
import UploadImageComponent from "@/components/dashboard/blogs/form/uploadImage.component";
import SelectCategories from "@/components/dashboard/blogs/form/selectCatagories.component";


const CreateBlogPage: FC = () => {
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

    const handleSubmit = (values: BlogFormValues, { setTouched }: FormikHelpers<BlogFormValues>) => {
        if (!values.content) {
            setTouched({ content: true }, true);
        }
        console.log(values);
        // Aquí irá la lógica para enviar los datos
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
                                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700
                                         transition-colors duration-200"
                            >
                                Crear Publicación
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateBlogPage;
