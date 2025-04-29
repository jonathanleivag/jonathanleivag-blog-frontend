import {FC} from "react";
import {motion} from "framer-motion";
import CardComponent from "@/components/home/blog/card.component";
import {BlogPost} from "@/type";

const dummyPosts: BlogPost[] = [
    {
        id: 1,
        title: "La Evolución del Desarrollo Web Moderno",
        excerpt: "Un análisis profundo de las últimas tendencias y tecnologías que están definiendo el futuro del desarrollo web...",
        category: "Desarrollo Web",
        readTime: "5 min lectura",
        date: "2024-03-20",
        author: {
            name: "Ana García",
            avatar: "/hero-image.webp"
        },
        image: "/hero-image.webp",
        tags: ["Web", "Tendencias", "Desarrollo"]
    },
    {
        id: 2,
        title: "Mejores Prácticas en React 2024",
        excerpt: "Descubre las técnicas más efectivas para desarrollar aplicaciones React modernas y escalables...",
        category: "React",
        readTime: "7 min lectura",
        date: "2024-03-18",
        author: {
            name: "Carlos Ruiz",
            avatar: "/hero-image.webp"
        },
        image: "/hero-image.webp",
        tags: ["React", "JavaScript", "Frontend"]
    },
    {
        id: 3,
        title: "Optimización de Rendimiento Web",
        excerpt: "Guía completa para mejorar el rendimiento de tus aplicaciones web utilizando las últimas técnicas...",
        category: "Performance",
        readTime: "6 min lectura",
        date: "2024-03-15",
        author: {
            name: "Laura Martínez",
            avatar: "/hero-image.webp"
        },
        image: "/hero-image.webp",
        tags: ["Performance", "Web", "Optimización"]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const CardSectionComponent:FC = () => {
    return  <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="md:w-full grid grid-cols-1 md:grid-cols-2 gap-6"
    >
        {dummyPosts.map((post, index) => (
            <CardComponent key={post.id} index={index}  post={post} />
        ))}
    </motion.div>
}

export default CardSectionComponent;
