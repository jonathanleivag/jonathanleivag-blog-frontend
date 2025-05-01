import HeroComponent from "@/components/home/hero.component";
import NewsComponent from "@/components/home/news/news.component";
import BlogComponent from "@/components/home/blog/blog.component";
import ProjectComponent from "@/components/home/proyect/project.component";
import ContactComponent from "@/components/home/contact.component";

export default function Home() {
    return (
        <>
            <HeroComponent/>
            <NewsComponent />
            <BlogComponent />
            <ProjectComponent/>
            <ContactComponent />
        </>
    );
}
