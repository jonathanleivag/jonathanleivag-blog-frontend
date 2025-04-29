import {FC} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {CardProjectComponentProps} from "@/type";

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

            <a
                href={project.link}
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            >
                Ver proyecto
                <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </a>
        </div>
    </motion.div>
}

export default CardProjectComponent;
