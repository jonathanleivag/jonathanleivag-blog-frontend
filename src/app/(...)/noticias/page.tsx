import {FC} from "react";
import NewsPageComponent from "@/components/page/noticia/NewsPage.component";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Noticias de Desarrollo | Blog Jonathanleivag',
    description: 'Mantente actualizado con las últimas noticias y artículos de la comunidad dev.to. Encuentra contenido sobre desarrollo web, programación, tecnología y más.',
    openGraph: {
        title: 'Noticias de Desarrollo | Blog Jonathanleivag',
        description: 'Mantente actualizado con las últimas noticias y artículos de la comunidad dev.to. Encuentra contenido sobre desarrollo web, programación, tecnología y más.',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Blog Jonathanleivag',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Noticias de Desarrollo'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Noticias de Desarrollo | Blog Jonathanleivag',
        description: 'Mantente actualizado con las últimas noticias y artículos de la comunidad dev.to. Encuentra contenido sobre desarrollo web, programación, tecnología y más.'
    },
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
    },
    alternates: {
        canonical: '/noticias'
    },
    keywords: [
        'dev.to',
        'noticias desarrollo',
        'programación',
        'desarrollo web',
        'tecnología',
        'artículos técnicos'
    ]
}

const News: FC = () => {
    return <NewsPageComponent/>
};

export default News;
