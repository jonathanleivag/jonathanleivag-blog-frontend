import {FC} from "react";
import {ModalBlogProps} from "@/type";
import {motion} from "framer-motion";
import {CalendarDaysIcon, TagIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "@/lib/redux/hooks";
import {selectBlog} from "@/lib/redux/features/category/category.slice";

const ModalBlog: FC<ModalBlogProps> = ({blogs, setShowModalBlog}) => {
    const appDispatch = useAppDispatch()

    const handlerOnClose = () => {
        setShowModalBlog(false)
        appDispatch(selectBlog(undefined))
    }

    const ButtonClose:FC = () => {
        return <div className='w-full flex flex-row justify-end items-center'>
            <button
                onClick={handlerOnClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
            >
                <XMarkIcon className="w-6 h-6 text-gray-500"/>
            </button>
        </div>
    }

    if (blogs.length === 0) {
        return (
            <div className="w-full p-8 text-center relative">
                <ButtonClose />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-6"
                >
                    <p className="text-gray-500 text-lg">
                        No hay blogs disponibles
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        Los blogs relacionados aparecerán aquí
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[600px] relative">
            <div className="pb-4 border-b flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Lista de Blogs
                    </h2>
                    <p className="text-sm text-gray-500">
                        Total: {blogs.length} blogs
                    </p>
                </div>
                <ButtonClose />
            </div>

            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                <div className="space-y-4 py-4">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {blog.description}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    blog.published
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {blog.published ? 'Publicado' : 'Oculto'}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <CalendarDaysIcon className="w-4 h-4" />
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TagIcon className="w-4 h-4" />
                                    <span>{blog.tags?.length || 0} etiquetas</span>
                                </div>
                            </div>
                            {/*TODO: ver detalles Blog*/}
                            <div className="mt-4 flex gap-2">
                                <button className="px-3 py-1 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                                    Ver detalles
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ModalBlog;
