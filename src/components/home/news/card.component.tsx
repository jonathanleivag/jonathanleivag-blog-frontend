import Image from "next/image";
import {motion} from "framer-motion";
import {FC} from "react";
import {CardComponentProps} from "@/type";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.3
        }
    }
};

const CardComponent: FC<CardComponentProps> = ({news, index}) => {
    return <motion.article
        variants={cardVariants}
        whileHover="hover"
        className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
        <div className="relative h-48 overflow-hidden">
            <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
                priority={index === 0}
            />
            <span className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm z-10">
                  {news.category}
                </span>
        </div>

        <div className="p-6">
            <time className="text-gray-500 text-sm">
                {new Date(news.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </time>

            <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                {news.title}
            </h3>

            <p className="text-gray-600 mb-4">
                {news.summary}
            </p>

            <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary-500 hover:text-primary-700 font-medium transition-colors duration-300"
            >
                Leer más →
            </motion.button>
        </div>
    </motion.article>
}

export default CardComponent;
