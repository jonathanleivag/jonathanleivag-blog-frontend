import {FC} from "react";
import Link from "next/link"; // Importamos Link
import {motion} from "framer-motion";
import {CardBlogPageComponentProps} from "@/type";

const CardBlogComponent: FC<CardBlogPageComponentProps> = ({post}) => {
    return (
        <Link href={`/blog/view/${post.slug}`} className="block">
            <motion.article
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, ease: "easeOut"}}
                whileHover={{scale: 1.02}}
                className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
            >
                <motion.img
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                    whileHover={{scale: 1.05}}
                    layoutId={post.slug}
                />
                <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex gap-2 mb-4">
                          <span
                              className="inline-block bg-primary-700 text-white text-xs px-2 py-1 rounded-full uppercase tracking-widest">
                            {post.category.name}
                          </span>
                            {post.popular && (
                                <span
                                    className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full uppercase tracking-widest">
                                  Popular
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-primary-100 mb-2">{post.title}</h2>
                        <p className="text-gray-300 text-sm mb-4">{post.description}</p>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

export default CardBlogComponent;
