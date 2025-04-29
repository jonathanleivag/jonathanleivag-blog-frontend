import HeroComponent from "@/components/home/hero.component";
import NewsComponent from "@/components/home/news/news.component";
import BlogComponent from "@/components/home/blog/blog.component";

export default function Home() {
    return (
        <>
            <HeroComponent/>
            <NewsComponent />
            <BlogComponent />
        </>
    );
}
