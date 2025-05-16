import {FC} from "react";
import {CardNewsPageComponentProps} from "@/type";
import Image from "next/image";
import {motion} from "framer-motion";

const CardNewsComponent:FC<CardNewsPageComponentProps> = ({news}) => {
    return <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 border border-gray-700 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
            <Image
                src={news.social_image}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
            />
            <div className="absolute top-3 left-3">
        <span className="bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs uppercase tracking-wide">
          {news.tags}
        </span>
            </div>
        </div>
        <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
            <div>
                <h2 className="text-2xl font-serif font-bold leading-tight mb-2 text-white">
                    {news.title}
                </h2>
                <p className="text-gray-200 text-sm mb-4">{news.description}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
        <span>
          {new Date(news.readable_publish_date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
          })}
        </span>
                <a href={news.url} target="_blank" className="text-accent-400 hover:text-accent-200 font-medium">
                    Leer artículo completo →
                </a>
            </div>
        </div>
    </motion.article>
}

export default CardNewsComponent;
