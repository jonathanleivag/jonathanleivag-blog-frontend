import {FC} from 'react';
import ProjectPageComponent from "@/components/page/project/project";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Proyectos - Blog Jonathanleivag',
    description: 'Explora mi portafolio de proyectos de desarrollo. Proyectos personales, contribuciones open source y aplicaciones web construidas con tecnologías modernas.',
    openGraph: {
        title: 'Proyectos - Blog Jonathanleivag',
        description: 'Explora mi portafolio de proyectos de desarrollo. Proyectos personales, contribuciones open source y aplicaciones web construidas con tecnologías modernas.',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Blog Jonathanleivag',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Portafolio de Proyectos'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Proyectos - Blog Jonathanleivag',
        description: 'Explora mi portafolio de proyectos de desarrollo. Proyectos personales, contribuciones open source y aplicaciones web construidas con tecnologías modernas.'
    },
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1
    },
    alternates: {
        canonical: '/proyectos'
    },
    keywords: [
        'portafolio',
        'proyectos desarrollo',
        'GitHub',
        'desarrollo web',
        'aplicaciones web',
        'open source',
        'full stack'
    ],
    authors: [
        {
            name: 'Jonathan Leiva',
            url: 'https://github.com/jonathanleivag'
        }
    ],
    category: 'Portfolio',
    creator: 'Jonathan Leiva',
    publisher: 'Jonathan Leiva',
    verification: {
        other: {
            'github-profile': 'jonathanleivag'
        }
    }
}

const Project: FC = () => {
    return <ProjectPageComponent/>
};

export default Project;
