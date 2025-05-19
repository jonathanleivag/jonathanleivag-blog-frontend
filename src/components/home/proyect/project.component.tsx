'use client'
import {FC, useEffect} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import Image from "next/image";
import TitleComponent from "@/components/home/proyect/title.component";
import {ProjectWeb} from "@/type";
import CardProjectComponent from "@/components/home/proyect/cardProject.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataProject} from "@/lib/redux/features/project/project.slice";
import toast from "react-hot-toast";
import {extractImage, extractTechnologies, extractURL} from "@/utils/getPropsProject";


const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};


const ProjectComponent: FC = () => {

    const appDespatch = useAppDispatch()
    const project = useAppSelector(state => state.project.project)

    useEffect(() => {
        const dateFetch = async () => {
            const response = await fetch('/api/project', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data: ProjectWeb = await response.json()

            if (data.error === null) {
                appDespatch(initialDataProject(data))
            } else {
                toast.error(data.error)
            }

        }

        void dateFetch()
    }, [appDespatch]);

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
                <TitleComponent/>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: false}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16"
                >
                    {project.data.pinned.slice(0, 3).map((project, index) => (
                        <CardProjectComponent key={index} project={{
                            id: project.forkCount,
                            title: project.name,
                            description: '',
                            image: extractImage(project.description),
                            technologies: extractTechnologies(project.description),
                            category: extractTechnologies(project.description)[0],
                            link: project.url,
                            url: extractURL(project.description)
                        }}/>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectComponent;
