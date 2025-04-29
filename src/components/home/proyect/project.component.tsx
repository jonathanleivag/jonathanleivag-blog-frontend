'use client'
import {FC} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import Image from "next/image";
import TitleComponent from "@/components/home/proyect/title.component";
import {Project} from "@/type";
import CardProjectComponent from "@/components/home/proyect/cardProject.component";


const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Digital",
        description: "Diseño y desarrollo de un portfolio personal utilizando las últimas tecnologías web",
        image: "/hero-image.webp",
        technologies: ["React", "Next.js", "TailwindCSS"],
        category: "Desarrollo Web",
        link: "#"
    },
    {
        id: 2,
        title: "E-commerce Dashboard",
        description: "Panel de administración para tienda online con análisis en tiempo real",
        image: "/hero-image.webp",
        technologies: ["TypeScript", "Node.js", "MongoDB"],
        category: "Aplicación Web",
        link: "#"
    },
    {
        id: 3,
        title: "App de Gestión",
        description: "Sistema de gestión de recursos empresariales con interfaz moderna",
        image: "/hero-image.webp",
        technologies: ["React", "Redux", "Firebase"],
        category: "Software Empresarial",
        link: "#"
    }
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};


const ProjectComponent: FC = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{
                    y: useTransform(useScroll().scrollYProgress, [0, 1], ['0%', '20%']),
                    scale: 1.2
                }}
            >
                <Image
                    src="/code-background.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 my-10">
                <TitleComponent />
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16"
                >
                    {projects.map((project) => (
                         <CardProjectComponent key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectComponent;
