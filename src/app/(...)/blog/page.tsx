import BlogPageComponent from "@/components/page/blog/blogPage.component";
import {FC} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Blogs | Blog Jonathanleivag',
    description: 'Explora artículos sobre desarrollo web, programación y tecnología',
    openGraph: {
        title: 'Blogs | Blog Jonathanleivag',
        description: 'Explora artículos sobre desarrollo web, programación y tecnología',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Blog Jonathanleivag'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blogs | Blog Jonathanleivag',
        description: 'Explora artículos sobre desarrollo web, programación y tecnología'
    },
    robots: {
        index: true,
        follow: true
    }
}

const Blog: FC = () => {
    return <BlogPageComponent/>
};

export default Blog;
