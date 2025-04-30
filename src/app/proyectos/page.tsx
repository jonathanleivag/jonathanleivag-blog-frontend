'use client';
import {FC} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';

const projects = [
  {
    title: 'Portfolio Personal',
    description: 'Sitio personal para mostrar habilidades, experiencia y proyectos destacados.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    repo: 'https://github.com/jonathanleivag/portfolio'
  },
  {
    title: 'Blog de Tecnología',
    description: 'Un blog moderno sobre desarrollo web, inteligencia artificial y herramientas de desarrollo.',
    technologies: ['React', 'Framer Motion', 'Markdown'],
    repo: 'https://github.com/jonathanleivag/tech-blog'
  },
  {
    title: 'Dashboard E-commerce',
    description: 'Panel administrativo para visualizar métricas de una tienda online.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/jonathanleivag/ecommerce-dashboard'
  }
];

const Project: FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-primary-50 px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:w-1/3 flex-shrink-0"
        >
          <div className="flex flex-col items-center">
            <Image src="/hero-image.webp" alt="avatar" width={120} height={120} className="rounded-full border border-primary-700" />
            <h2 className="text-xl font-bold mt-4 text-primary-100">Jonathan Leiva Gómez</h2>
            <p className="text-gray-400 text-sm text-center mt-2 px-4">Desarrollador web con enfoque en frontend, diseño y tecnologías modernas.</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-primary-300">
              <span>{projects.length} proyectos</span>
              <span>⭐ 124 seguidores</span>
            </div>
            <div className="flex gap-3 mt-2">
              <a href="#" className="text-accent-500 hover:text-accent-300 text-sm">GitHub</a>
              <a href="#" className="text-accent-500 hover:text-accent-300 text-sm">LinkedIn</a>
              <a href="#" className="text-accent-500 hover:text-accent-300 text-sm">Portafolio</a>
            </div>
          </div>
        </motion.aside>

        {/* Main proyectos */}
        <main className="flex-1">
          {/* encabezado eliminado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-gray-700 rounded-md p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-primary-100 mb-3">README.md</h2>
            <p className="text-gray-300 text-sm mb-2">
              Hola 👋 Soy Jonathan Leiva Gómez, desarrollador web apasionado por construir interfaces atractivas,
              accesibles y funcionales. Me especializo en tecnologías como React, Next.js y Tailwind CSS.
            </p>
            <p className="text-gray-400 text-sm">
              Aquí encontrarás una selección de mis proyectos personales, pruebas de concepto y herramientas creadas con cariño para la comunidad.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-gray-900 border border-gray-700 rounded-md p-5 hover:shadow-md transition relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary-700 rounded-t-md" />
                <div>
                  <h2 className="text-lg font-semibold text-primary-100 mb-1">{project.title}</h2>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-800 border border-gray-700 text-xs px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.repo}
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
        </main>
      </div>
    </div>
  );
};

export default Project;
