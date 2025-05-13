import {FC} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {CardProjectComponentProps} from "@/type";
import Link from "next/link";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const CardProjectComponent:FC<CardProjectComponentProps> = ({ project}) => {
    return <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
    >
        <div className="relative h-48 overflow-hidden">
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"/>
        </div>
        <div className="p-6">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-primary-500/10 text-primary-400 rounded-full">
                                    {project.category}
                                </span>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
            </h3>

            <p className="text-gray-400 mb-4">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                    <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full"
                    >
                                            {tech}
                                        </span>
                ))}
            </div>

            <div className="flex space-x-4">
                <Link
                    href={project.link}
                    target={'_blank'}
                    className="inline-flex items-center px-4 py-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 transition-all duration-300 text-sm font-medium"
                >
                    Ver código
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </Link>
                <Link
                    href={project.url}
                    target={'_blank'}
                    className="inline-flex items-center px-4 py-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 transition-all duration-300 text-sm font-medium"
                >
                    Ver Proyecto
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    </motion.div>
}

export default CardProjectComponent;
