'use client'

import Link from 'next/link';
import {motion} from 'framer-motion';
import {FC} from "react";

const NotFound: FC = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <h1 className="text-8xl font-bold text-primary-600">404</h1>
            </motion.div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.2, duration: 0.5}}
            >
                <h2 className="mt-4 text-3xl font-semibold text-gray-800">Página no encontrada</h2>
            </motion.div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.4, duration: 0.5}}
            >
                <p className="mt-4 text-lg text-gray-600 max-w-md">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
            </motion.div>

            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.6, duration: 0.5}}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
            >
                <Link
                    href="/"
                    className="inline-block px-6 py-3 mt-8 text-gray-50 bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                >
                    Volver al inicio
                </Link>
            </motion.div>
        </section>
    );
}


export default NotFound;
