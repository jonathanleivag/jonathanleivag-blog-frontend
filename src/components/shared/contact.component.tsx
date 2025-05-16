"use client"
import {FC} from "react";
import {motion} from "framer-motion";
import {useAppSelector} from "@/lib/redux/hooks";
import IconComponent from "@/components/shared/icon.component";
import Link from "next/link";
import {FormikHelpers, useFormik} from "formik";
import {InitialValuesContact} from "@/type";
import {validationSchemaContact} from "@/validateSchema";
import toast from "react-hot-toast";

const ContactComponent: FC = () => {

    const socials = useAppSelector(state => state.social.socials)

    const infoContact = [
        {
            icon: <IconComponent icon={'linkedin'}/>,
            title: "Linkedin",
            content: "jonathanleivag",
            link: socials.data.socials.find(social => social.icon === 'linkedin')?.url ?? ''
        },
        {
            icon: <IconComponent icon={'instagram'}/>,
            title: "Escríbenos",
            content: "@jonathanleivag",
            link: socials.data.socials.find(social => social.icon === 'instagram')?.url ?? ''
        }
    ]

    const initialValues: InitialValuesContact = {
        name: '',
        email: '',
        content: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaContact,
        onSubmit: async (values: InitialValuesContact, formikHelpers: FormikHelpers<InitialValuesContact>) => {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })

                const data = await response.json();
                if (data.error === null) {
                    toast.success(data.message)
                    formikHelpers.resetForm()
                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                    toast.error(e.message)
                }
            }
        }
    })

    return (
        <section className="min-h-screen relative overflow-hidden py-20">
            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: false}}
                transition={{duration: 1}}
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50"
            ></motion.div>

            <div className="absolute inset-0">
                <motion.div
                    initial={{opacity: 0, scale: 0.8, x: 100}}
                    whileInView={{opacity: 0.2, scale: 1, x: 0}}
                    viewport={{once: false}}
                    transition={{duration: 1.5, ease: "easeOut"}}
                    className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-br from-blue-200/20 to-cyan-200/20 blur-3xl"
                />

                <motion.div
                    initial={{opacity: 0, scale: 0.8, x: -100}}
                    whileInView={{opacity: 0.2, scale: 1, x: 0}}
                    viewport={{once: false}}
                    transition={{duration: 1.5, ease: "easeOut", delay: 0.2}}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-tr from-emerald-200/20 to-sky-200/20 blur-3xl"
                />

                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 0.1}}
                    viewport={{once: false}}
                    transition={{duration: 1, delay: 0.5}}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: false}}
                    transition={{duration: 1}}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">
                        Conectemos
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Estamos aquí para transformar tus ideas en realidad
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: false}}
                        transition={{duration: 1}}
                        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                    >
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className={'w-full'}>
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        id='name'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
                                    )}
                                </div>
                                <div className={'w-full'}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id='email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className={'w-full'}>
                              <textarea
                                  rows={6}
                                  placeholder="Tu mensaje"
                                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                  id='content'
                                  onChange={formik.handleChange}
                                  value={formik.values.content}
                                  onBlur={formik.handleBlur}
                              />
                                {formik.touched.content && formik.errors.content && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.content}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    'Enviar Mensaje'
                                )}
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: false}}
                        transition={{duration: 1}}
                        className="space-y-6"
                    >
                        {infoContact.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: false}}
                                transition={{duration: 0.8, delay: index * 0.2}}
                                className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            >
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center w-full cursor-pointer"
                                >
                                    <div className="text-2xl bg-emerald-100 p-4 rounded-xl">
                                        {item.icon}
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {item.content}
                                        </p>
                                    </div>
                                </Link>

                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;
