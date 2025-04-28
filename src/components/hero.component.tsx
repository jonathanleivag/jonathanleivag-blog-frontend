'use client';

import {FC} from "react";
import {motion} from "framer-motion";
import Image from "next/image";

const HeroComponent: FC = () => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            className="relative min-h-screen pt-24 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-400/20 rounded-full filter blur-[100px] animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8 z-10">
                        <motion.div
                            className="flex items-center gap-2 mb-6"
                            variants={itemVariants}
                        >
                            <span
                                className="px-4 py-1 bg-accent-400/10 text-accent-400 rounded-full text-sm font-medium">
                                Nuevo Blog
                            </span>
                            <span className="h-1 w-1 bg-accent-400 rounded-full"></span>
                            <span className="text-gray-400 text-sm">Desarrollo Web & Tecnología</span>
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-7xl font-bold text-gray-50 leading-tight"
                            variants={itemVariants}
                        >
                            Explora el Mundo del
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-primary-400"> Desarrollo Web</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 leading-relaxed"
                            variants={itemVariants}
                        >
                            Descubre las últimas tendencias, tutoriales y mejores prácticas en desarrollo web,
                            programación y tecnología.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            variants={itemVariants}
                        >
                            <button
                                className="group px-8 py-4 bg-gradient-to-r from-accent-400 to-accent-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-400/20 hover:-translate-y-0.5">
                                Explorar Blog
                                <span
                                    className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </button>
                            <button
                                className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-gray-300 font-medium rounded-xl border border-gray-700 transition-all duration-300 hover:border-accent-400 hover:text-accent-400">
                                Suscribirse
                            </button>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800"
                            variants={itemVariants}
                        >
                            <div className="flex flex-col">
                                <span
                                    className="text-4xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">500+</span>
                                <span className="text-gray-400 mt-1">Artículos</span>
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="text-4xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">10K+</span>
                                <span className="text-gray-400 mt-1">Lectores</span>
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="text-4xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">50+</span>
                                <span className="text-gray-400 mt-1">Tutoriales</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="lg:col-span-5 relative h-[600px] hidden lg:block"
                        variants={itemVariants}
                    >
                        <div className="relative h-full w-full">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <Image
                                    src="/hero-image.webp"
                                    alt="Desarrollo Web Ilustración"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                            </div>
                            <div
                                className="absolute -right-4 top-4 w-24 h-24 bg-accent-400/10 backdrop-blur-xl rounded-2xl border border-accent-400/20 animate-float"></div>
                            <div
                                className="absolute -left-4 bottom-4 w-32 h-32 bg-primary-600/10 backdrop-blur-xl rounded-2xl border border-primary-600/20 animate-float-delayed"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div
                className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-10"></div>
        </motion.section>
    );
}

export default HeroComponent;