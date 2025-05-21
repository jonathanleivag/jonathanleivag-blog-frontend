import {FC} from "react";
import Link from "next/link";
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

const CardComponent: FC<CardBlogComponentProps> = ({index, post}) => {
    return (
        <motion.article
            key={index}
            variants={cardVariants}
            className={`relative overflow-hidden ${
                index === 0 ? 'md:col-span-2' : ''
            }`}
        >
            <Link href={`/blog/view/${post.slug}`} className="block">
                <div className="group">
                    <div className="relative h-64 overflow-hidden rounded-xl">
                        <motion.img
                            src={post.image}
                            alt={post.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            layoutId={post.slug}
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"/>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <span
                                className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-primary-500 rounded-full">
                                {post.category}
                            </span>

                            <h3 className="text-xl md:text-2xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                                {post.title}
                            </h3>

                            <div className="flex items-center space-x-4">
                                <div className="text-sm flex flex-col">
                                    <span className="font-medium inline-flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        {post.author.name}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                strokeWidth="2"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                d="M12 7v5l3 3"
                                            />
                                        </svg>
                                        {post.readTime} minutos
                                    </span>
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
            </Link>
        </motion.article>
    );
}

export default CardComponent;
