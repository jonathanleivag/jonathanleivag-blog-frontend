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
            className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-gray-50 leading-tight"
                            variants={itemVariants}
                        >
                            Explora el Mundo del
                            <span className="text-accent-400"> Desarrollo Web</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300"
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
                                className="px-8 py-3 bg-accent-400 hover:bg-accent-500 text-white font-medium rounded-lg transition-colors duration-300">
                                Explorar Blog
                            </button>
                            <button
                                className="px-8 py-3 border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-white font-medium rounded-lg transition-colors duration-300">
                                Suscribirse
                            </button>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-6"
                            variants={itemVariants}
                        >
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-accent-400">500+</span>
                                <span className="text-gray-300">Artículos</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-accent-400">10K+</span>
                                <span className="text-gray-300">Lectores</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-accent-400">50+</span>
                                <span className="text-gray-300">Tutoriales</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="relative h-[500px]"
                        variants={itemVariants}
                    >
                        <div className="absolute inset-0 bg-accent-400/10 rounded-2xl backdrop-blur-sm"></div>
                        <div
                            className="absolute -inset-0.5 bg-gradient-to-r from-accent-400 to-primary-700 rounded-2xl opacity-30 blur-2xl"></div>
                        <div className="relative h-full w-full rounded-2xl overflow-hidden">
                            <Image
                                src="/hero-image.webp"
                                alt="Desarrollo Web Ilustración"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary-900 to-transparent"></div>
        </motion.section>
    );
}

export default HeroComponent;