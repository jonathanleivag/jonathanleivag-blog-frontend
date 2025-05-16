import {ReactNode} from "react";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import {Toaster} from "react-hot-toast";
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Blog de Jonathan',
    description: 'Explora artículos sobre programación, tecnología y más.',
    keywords: ['programación', 'tecnología', 'javascript', 'desarrollo web', 'react', 'next.js'],
    authors: [{name: 'Jonathan Leiva', url: 'https://blog.jonathanleivag.cl'}],
    metadataBase: new URL('https://blog.jonathanleivag.cl'),
    openGraph: {
        title: 'Blog de Jonathan',
        description: 'Explora artículos sobre programación, tecnología y más.',
        url: 'https://blog.jonathanleivag.cl',
        siteName: 'Blog de Jonathan',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Blog de Jonathan - Programación y Tecnología',
            }
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog de Jonathan',
        description: 'Explora artículos sobre programación, tecnología y más.',
        creator: '@jonathanleivag',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
};


export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <StoreProvider>
            <Toaster position="top-right" toastOptions={{duration: 3000}}/>
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
