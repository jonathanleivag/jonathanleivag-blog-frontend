import {FC} from "react";
import {ErrorBlogComponentProps} from "@/type";

const ErrorBlogComponent:FC<ErrorBlogComponentProps> = ({error}) => {
    return  <div className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                    <div className="relative">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600
                                     transform -skew-y-6 rounded-3xl opacity-20"
                        ></div>
                        <svg
                            className="w-full h-auto max-w-lg mx-auto animate-float"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                className="text-primary-600"
                            />
                        </svg>
                    </div>
                    <div className="absolute -z-10 opacity-70">
                        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float-delayed" />
                        <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-accent-100 rounded-full blur-3xl animate-float" />
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                ¡Ups! Algo salió mal
                            </h1>
                            <p className="text-xl text-gray-600">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ErrorBlogComponent;
