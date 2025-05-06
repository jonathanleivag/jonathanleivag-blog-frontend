import {FC} from "react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {motion} from "framer-motion";
import {TableBlogComponentProps} from "@/type";

const TableBlogComponent:FC<TableBlogComponentProps> = ({blog}) => {
    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        transition={{duration: 0.2}}
        className="p-6 hover:bg-gray-50 transition-colors"
    >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base font-medium text-gray-900">
                        {blog.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {blog.category.name}
                            </span>
                        {blog.popular && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                                Destacado ⭐
                              </span>
                        )}
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {blog.description}
                </p>
            </div>
            <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            blog.published
                                ? 'bg-green-50 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                          {blog.published ? 'Publicado' : 'Borrador'}
                        </span>
                <button className="text-gray-400 hover:text-gray-500 cursor-pointer">
                    <PencilSquareIcon className="h-5 w-5"/>
                </button>
            </div>
        </div>
    </motion.div>
}

export default TableBlogComponent;
