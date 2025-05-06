import {FC} from "react";
import {ButtonFilterComponentProps} from "@/type";

const ButtonFilterComponent: FC<ButtonFilterComponentProps> = ({item, setActiveFilter, activeFilter}) => {
    return  <button
        key={item.selection}
        onClick={() => setActiveFilter(item.selection)}
        className={`min-w-0 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center
                      ${activeFilter === item.selection
            ? 'bg-primary-600 text-white shadow-sm'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
    >
        <span className="truncate">{item.title}</span>
    </button>
}

export default ButtonFilterComponent;
