import {FC} from "react";
import {motion} from "framer-motion";
import {useAppSelector} from "@/lib/redux/hooks";
import {CategoriesBlogComponentProps} from "@/type";

const CategoriesBlogComponent:FC<CategoriesBlogComponentProps> = ({selectedCategory, setSelectedCategory}) => {
    const categories = useAppSelector(state => state.category.categories)

    return  <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-6"
    >
        {['Todos', ...categories.docs.map(item => item.name)].map((cat, index) => (
            <button
                key={index}
                onClick={() => setSelectedCategory(cat === 'Todos' ? null : cat)}
                className={`px-4 py-1 rounded-full text-sm border ${
                    selectedCategory === cat || (cat === 'Todos' && selectedCategory === null)
                        ? 'bg-primary-700 text-white border-primary-700'
                        : 'text-primary-100 border-primary-700 hover:bg-primary-800'
                }`}
            >
                {cat}
            </button>
        ))}
    </motion.div>
}

export default CategoriesBlogComponent;
