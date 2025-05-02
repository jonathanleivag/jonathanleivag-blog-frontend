import {FC, useEffect, useState} from "react";
import {Category, FormModalComponentInitialValue, FormModalComponentProps} from "@/type";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useFormik} from "formik";
import {CategorySchemaRegister} from "@/validateSchema";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {addCategory, setSelected, updateCategory} from "@/lib/redux/features/category/category.slice";

const FormModalComponent: FC<FormModalComponentProps> = ({ setShowModal }) => {
    const appDispatch = useAppDispatch()
    const selected = useAppSelector(state => state.category.selected)
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues: FormModalComponentInitialValue  = {
        name: '',
        description: '',
        isActive: true
    }

    const formik = useFormik({
        initialValues,
        validationSchema: CategorySchemaRegister,
        onSubmit: async (values: FormModalComponentInitialValue) => {
            try {
                values.isActive = values.isActive === 'true'
                const url = selected !== null ? `/api/category/${selected._id}`: '/api/category'
                const method = selected !== null ? 'PATCH': 'POST'

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })

                const data: Category = await response.json()

                if (data.message !== undefined) {
                    setErrorMessage(data.message)
                    return
                }

                if (selected !== null) {
                    appDispatch(updateCategory(data))
                } else {
                    appDispatch(addCategory(data))
                }
                handleClose()
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                    setErrorMessage('Ocurrió un error al guardar la categoría. Inténtalo nuevamente.');
                }
            }
        }
    })

    useEffect(() => {
        if (selected !== null) {
            formik.setFieldValue('name', selected.name)
            formik.setFieldValue('description', selected.description)
            formik.setFieldValue('isActive', selected.isActive.toString())
        }
        // eslint-disable-next-line
    }, [selected]);

    const handleClose = () => {
        setShowModal(false)
        if (selected !== null) appDispatch(setSelected(null))
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md transform transition-all">
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {selected !== null ? 'Editar Categoría': 'Crear Nueva Categoría'}
                        </h3>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {errorMessage && (
                      <div className="text-red-600 text-sm font-medium">
                        {errorMessage}
                      </div>
                    )}

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                placeholder="Ej: Desarrollo Web"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                                focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                                placeholder-gray-400 transition-all duration-200"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                placeholder="Describe la categoría..."
                                rows={4}
                                id='description'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                                focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                                placeholder-gray-400 transition-all duration-200 resize-none"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Estado
                            </label>
                            <div className="relative">
                                <select
                                    name="isActive"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                                    focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                                    appearance-none bg-white text-gray-700 transition-all duration-200"
                                    value={formik.values.isActive.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="true">Activa</option>
                                    <option value="false">Deshabilitada</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2.5 rounded-lg border border-gray-300
                                text-gray-700 hover:bg-gray-50 font-medium
                                transition-all duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-lg bg-primary-600
                                text-white hover:bg-primary-700 font-medium
                                transition-all duration-200 flex items-center gap-2 cursor-pointer"
                            >
                                {selected !== null ? 'Editar Categoría': 'Crear Categoría'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormModalComponent;
