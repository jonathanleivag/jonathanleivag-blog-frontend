'use client'
import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {ProjectWeb} from "@/type";
import {initialDataProject} from "@/lib/redux/features/project/project.slice";
import toast from "react-hot-toast";
import LoadingComponent from "@/components/shared/loading.component";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {extractTechnologies} from "@/utils/getPropsProject";

const ProjectPageComponent: FC = () => {
    const appDespatch = useAppDispatch()
    const project = useAppSelector(state => state.project.project)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const socials = useAppSelector(state => state.social.socials)

    useEffect(() => {
        const dateFetch = async () => {
            try {
                setIsLoading(true)
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
                setIsLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                    toast.error(e.message)
                    setIsLoading(false)
                }
            }
        }

        void dateFetch()
    }, [appDespatch]);

    return (

        <div className="min-h-screen bg-gray-950 text-primary-50 px-4 py-12">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
                <LoadingComponent isLoading={isLoading}>
                    <motion.aside
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        viewport={{once: true}}
                        className="lg:w-1/3 flex-shrink-0"
                    >
                        <div className="flex flex-col items-center">
                            <Image src={project.data.info.avatar_url} alt="avatar" width={120} height={120}
                                   className="rounded-full border border-primary-700"/>
                            <h2 className="text-xl font-bold mt-4 text-primary-100">{project.data.info.name}</h2>
                            <p className="text-gray-400 text-sm text-center mt-2 px-4">{project.data.info.bio}</p>
                            <div className="flex items-center gap-4 mt-4 text-sm text-primary-300">
                                <span>{project.data.info.public_repos} proyectos</span>
                                <span>⭐ {project.data.info.followers} seguidores</span>
                            </div>
                            <div className="flex gap-3 mt-2">
                                {socials.data.socials.filter(s => s.icon !== 'mail').filter(s => s.icon !== 'blog').map(social => (
                                    <Link key={social.name} href={social.url} target={'_blank'}
                                          className="text-accent-500 hover:text-accent-300 text-sm">{social.name}</Link>
                                ))}
                                {/*<a href="#" className="text-accent-500 hover:text-accent-300 text-sm">LinkedIn</a>*/}
                                {/*<a href="#" className="text-accent-500 hover:text-accent-300 text-sm">Portafolio</a>*/}
                            </div>
                        </div>
                    </motion.aside>
                </LoadingComponent>

                <section className="flex-1">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        viewport={{once: true}}
                        className="bg-gray-900 border border-gray-700 rounded-md p-6 mb-8"
                    >
                        <LoadingComponent isLoading={isLoading}>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {Array.isArray(project.data.readme) ? project.data.readme.join('\n') : project.data.readme}
                            </ReactMarkdown>
                        </LoadingComponent>
                    </motion.div>
                    <LoadingComponent isLoading={isLoading}>
                        <div className="grid gap-6 md:grid-cols-2">
                            {project.data.pinned.map((project) => (
                                <motion.div
                                    key={project.name}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.4, ease: 'easeOut'}}
                                    className="bg-gray-900 border border-gray-700 rounded-md p-5 hover:shadow-md transition relative"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-700 rounded-t-md"/>
                                    <div>
                                        <h2 className="text-lg font-semibold text-primary-100 mb-1">{project.name}</h2>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {extractTechnologies(project.description).map((tech) => (
                                                <span key={tech}
                                                      className="bg-gray-800 border border-gray-700 text-xs px-2 py-0.5 rounded">
                        {tech}
                      </span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 text-accent-500 hover:text-accent-300 text-sm"
                                        >
                                            Ver repositorio →
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </LoadingComponent>
                </section>
            </div>
        </div>
    );
}

export default ProjectPageComponent;
