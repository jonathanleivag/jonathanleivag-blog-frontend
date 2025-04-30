'use client';

import {FC} from "react";
import {motion} from "framer-motion";
import {NewsItem} from "@/type";
import CardNewsComponent from "@/components/news/cardNews.component";


const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Nueva tecnología revoluciona la industria",
    description: "Una innovación tecnológica está transformando la manera en que trabajamos...",
    date: "2024-03-20",
    category: "Tecnología",
    imageUrl: "/hero-image.webp",
    summary: ""
  },
  {
    id: 2,
    title: "Avances en Inteligencia Artificial",
    description: "Los últimos desarrollos en IA están cambiando el panorama digital...",
    date: "2024-03-19",
    category: "IA",
    imageUrl: "/hero-image.webp",
    summary: ""
  },
  {
    id: 3,
    title: "El futuro del desarrollo web",
    description: "Nuevas tendencias que definirán el desarrollo web en los próximos años...",
    date: "2024-03-18",
    category: "Desarrollo",
    imageUrl: "/hero-image.webp",
    summary: ""
  }
];

const News: FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-primary-50">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b bg-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-primary-700 py-10"
      >
        <div className="container mx-auto px-4 text-left">
          <h1 className="text-5xl font-black text-primary-100 tracking-tight font-serif drop-shadow-md">
            Tecno<span className="text-accent-500">Noticias</span>
          </h1>
          <p className="text-gray-400 text-lg mt-2 italic">
            Actualidad, innovación y futuro tecnológico
          </p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 ">
        <div className="flex-1">
          <section className="my-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-4 text-primary-100"
            >
              Destacado
            </motion.h2>
            <CardNewsComponent news={mockNews[0]} />
          </section>

          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-4 text-primary-100"
            >
              Más Noticias
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {mockNews.slice(1).map((news) => (
                <CardNewsComponent key={news.id} news={news} />
              ))}
            </div>
          </section>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3 my-10"
        >
          <section className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary-100">Últimas noticias</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              {mockNews.map((item) => (
                <li key={item.id} className="hover:underline">{item.title}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Categorías populares</h3>
            <div className="flex flex-wrap gap-2">
              {['Tecnología', 'IA', 'Desarrollo'].map((cat) => (
                <span key={cat} className="bg-primary-700 text-white px-3 py-1 rounded-full text-sm hover:bg-primary-600 transition-colors">{cat}</span>
              ))}
            </div>
          </section>
        </motion.aside>
      </div>
    </div>
  );
};

export default News;
