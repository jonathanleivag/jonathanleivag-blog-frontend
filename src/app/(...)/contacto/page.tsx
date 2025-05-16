import {FC} from 'react';
import ContactComponent from "@/components/shared/contact.component";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Contacto - Blog Jonathanleivag',
    description: 'Ponte en contacto conmigo. Respondo consultas, propuestas de colaboración y comentarios sobre desarrollo web y tecnología.',
    openGraph: {
        title: 'Contacto - Blog Jonathanleivag',
        description: 'Ponte en contacto conmigo. Respondo consultas, propuestas de colaboración y comentarios sobre desarrollo web y tecnología.',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Blog Jonathanleivag'
    },
    twitter: {
        card: 'summary',
        title: 'Contacto - Blog Jonathanleivag',
        description: 'Ponte en contacto conmigo. Respondo consultas, propuestas de colaboración y comentarios sobre desarrollo web y tecnología.'
    },
    robots: {
        index: true,
        follow: true
    },
    alternates: {
        canonical: '/contacto'
    }
}

const Contact: FC = () => {
    return <ContactComponent/>;
};

export default Contact;
