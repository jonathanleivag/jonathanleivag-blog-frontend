import {FC} from "react";
import {TableComponentProps} from "@/type";
import {motion} from "framer-motion";
import {PencilIcon} from "@heroicons/react/24/outline";

const TableComponent:FC<TableComponentProps> = ({categories, handlerEdit}) => {
    return  <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Posts</th>
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
            >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900"> {category.blogs.length} </td>
                <td className={`px-6 py-4 text-sm ${category.isActive ? 'text-gray-900': 'text-red-500'} `}> {category.isActive ? 'Activo': 'No activo'} </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-2">
                        <button onClick={() => handlerEdit(category)} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors cursor-pointer">
                            <PencilIcon className="w-4 h-4" />
                            Editar
                        </button>
                    </div>
                </td>
            </motion.tr>
        ))}
        </tbody>
    </table>
}

export default TableComponent;
