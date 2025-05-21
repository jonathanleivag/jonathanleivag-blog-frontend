import {FC} from "react";
import BlogViewPageComponent from "@/components/page/blog/view/slug/blogViewPage.component";
import {getBlogBySlug} from "@/lib/fetchData/blog";
import {getBlogSlugProps} from "@/type";
import Script from 'next/script'
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import ErrorBlogComponent from "@/components/dashboard/blogs/view/errorBlog.component";

export async function generateMetadata({params}: getBlogSlugProps) {
    const {slug} = await params;
    const data = await getBlogBySlug(slug);

    const siteUrl = getEnv(ENV.NEXT_PUBLIC_SITE_URL);
    const fullUrl = `${siteUrl}/blog/${slug}`;

    if (!data) {
        return {
            title: 'Blog no encontrado | Blog Jonathanleivag',
            description: 'Lo sentimos, el blog que buscas no está disponible.',
            openGraph: {
                title: 'Blog no encontrado | Blog Jonathanleivag',
                description: 'Lo sentimos, el blog que buscas no está disponible.',
                type: 'website',
                url: fullUrl,
                images: [
                    {
                        url: `${siteUrl}/default-og-image.jpg`, // asegúrate de tener una imagen por defecto
                        width: 1200,
                        height: 630,
                        alt: 'Blog no encontrado',
                    },
                ],
            },
            robots: {
                index: false,
                follow: true,
            },
            alternates: {
                canonical: fullUrl,
            },
        };
    }

    return {
        title: `${data.title} | Blog Jonathanleivag`,
        description: `Lee sobre ${data.title} en el blog de Jonathan Leiva | ${data.description}`,
        keywords: data.tags?.join(', '),
        openGraph: {
            title: data.title,
            description: `Lee sobre ${data.title} en el blog de Jonathan Leiva | ${data.description}`,
            type: 'article',
            url: fullUrl,
            images: [
                {
                    url: data.image.startsWith('http') ? data.image : `${siteUrl}${data.image}`,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: `Lee sobre ${data.title} en el blog de Jonathan Leiva | ${data.description}`,
            images: [data.image.startsWith('http') ? data.image : `${siteUrl}${data.image}`],
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: fullUrl,
        },
    };
}


const BlogViewPage: FC<getBlogSlugProps> = async ({params}) => {
    const {slug} = await params
    const data = await getBlogBySlug(slug)

    if (data?.message !== undefined) return <ErrorBlogComponent error={data.message}/>


    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data?.title,
        "author": {
            "@type": "Person",
            "name": data?.user.name
        },
        "datePublished": data?.createdAt,
        "description": data?.description,
        "image": data?.image
    }

    return <>
        <Script
            id="schema-blog"
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}}
        />

        <BlogViewPageComponent blog={data!}/>
    </>
}

export default BlogViewPage;
