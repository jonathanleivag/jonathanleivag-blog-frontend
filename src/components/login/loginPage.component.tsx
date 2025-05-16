'use client'

import {FC} from "react";
import {useRouter} from "next/navigation";
import {LoginFormInitialValue} from "@/type";
import {useFormik} from "formik";
import {SignupSchemaLogin} from "@/validateSchema";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {toast} from "react-hot-toast";
import {motion} from "framer-motion";

const LoginPageComponent: FC = () => {
    const router = useRouter()
    const initialValues: LoginFormInitialValue = {
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: SignupSchemaLogin,
        onSubmit: async (values: LoginFormInitialValue) => {
            try {
                const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_BACKEND_URL)}/auth/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })

                const data = await response.json();
                if (data.message === undefined) {
                    router.replace('/dashboard')
                }
                if (data.message) {
                    toast.error(data.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        }
    })

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Inicia sesión para continuar
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                placeholder="tu@ejemplo.com"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                            )}

                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                placeholder="••••••••"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{scale: 1.01}}
                        whileTap={{scale: 0.99}}
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors cursor-pointer"
                    >
                        Iniciar sesión
                    </motion.button>
                </form>
            </motion.div>
        </main>
    );
}

export default LoginPageComponent;
