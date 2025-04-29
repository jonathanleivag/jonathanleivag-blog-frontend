import {FC} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {CardBlogComponentProps} from "@/type";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const CardComponent:FC<CardBlogComponentProps> = ({index, post}) => {
    return <motion.article
        key={index}
        variants={cardVariants}
        className={`relative overflow-hidden ${
            index === 0 ? 'md:col-span-2' : ''
        }`}
    >
        <div className="group cursor-pointer">
            <div className="relative h-64 overflow-hidden rounded-xl">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-primary-500 rounded-full">
                        {post.category}
                      </span>

                    <h3 className="text-xl md:text-2xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                        {post.title}
                    </h3>

                    <div className="flex items-center space-x-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-sm">
                            <span className="block font-medium">{post.author.name}</span>
                            <span className="text-gray-300">{post.readTime}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                        {post.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="text-xs px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm"
                            >
                            {tag}
                          </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.article>
}

export default CardComponent;
