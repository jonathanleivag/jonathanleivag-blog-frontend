"use client"

import {FC} from "react";
import {motion} from "framer-motion";
import {NewsItem} from "@/type";
import CardComponent from "@/components/home/news/card.component";
import TitleComponent from "@/components/home/news/title.component";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const dummyNews: NewsItem[] = [
  {
    id: 1,
    title: "Las últimas tendencias en desarrollo web 2024",
    date: "2024-03-20",
    summary: "Descubre las tecnologías más importantes que están definiendo el desarrollo web este año.",
    imageUrl: "/hero-image.webp",
    category: "Desarrollo Web",
    description: ""
  },
  {
    id: 2,
    title: "Inteligencia Artificial en la Programación: ¿Aliada o Amenaza?",
    date: "2024-04-15",
    summary: "Exploramos cómo la inteligencia artificial está cambiando la forma en que los desarrolladores crean software, desde asistentes de código hasta generación automática de aplicaciones.",
    imageUrl: "/hero-image.webp",
    category: "Tecnología",
    description: ""
  },
  {
    id: 3,
    title: "Next.js 15: Todas las novedades que debes conocer",
    date: "2024-05-05",
    summary: "Un recorrido por las nuevas funcionalidades de Next.js 15, incluyendo Server Actions, mejoras en el rendimiento y la integración total con Turbo pack.",
    imageUrl: "/hero-image.webp",
    category: "Frameworks",
    description: ""
  },
];

const NewsComponent: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
       <TitleComponent />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dummyNews.map((news, index) => (
            <CardComponent key={news.id}  news={news} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsComponent;
