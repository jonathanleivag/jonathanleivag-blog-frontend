import {FC} from "react";
import {Blog, TableComponentProps} from "@/type";
import {motion} from "framer-motion";
import {PencilIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "@/lib/redux/hooks";
import {selectBlog} from "@/lib/redux/features/category/category.slice";
import {BookOpenIcon} from "@heroicons/react/24/solid";

const TableComponent:FC<TableComponentProps> = ({categories, handlerEdit, setShowModalBlog}) => {
  const appDispatch = useAppDispatch()

    const handlerSelectBlog = (blogs: Blog[]) => {
      appDispatch(selectBlog(blogs))
        setShowModalBlog(true)
    }

    if (categories.length === 0) {
        return (
            <div className="w-full p-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-6"
                >
                    <p className="text-gray-500 text-lg">
                        No hay categorías disponibles
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        Las categorías que agregues aparecerán aquí
                    </p>
                </motion.div>
            </div>
        );
    }

    return  <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Blogs</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {categories.map((category, index) => (
            <motion.tr
                key={category._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-200 select-none"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900"> {category.blogs.length} </td>
                <td className={`px-6 py-4 text-sm ${category.isActive ? 'text-gray-900': 'text-red-500'} `}> {category.isActive ? 'Activo': 'No activo'} </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlerEdit(category)}
                            className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors cursor-pointer"
                        >
                            <PencilIcon className="w-4 h-4" />
                            Editar
                        </button>
                        <button
                            onClick={() => handlerSelectBlog(category.blogs)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                            title="Ver blogs de esta categoría"
                        >
                            <BookOpenIcon className="w-4 h-4" />
                            Blogs
                        </button>
                    </div>
                </td>
            </motion.tr>
        ))}
        </tbody>
    </table>
}

export default TableComponent;
