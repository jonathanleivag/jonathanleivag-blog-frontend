import {FC} from "react";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {SearchComponentProps} from "@/type";

const SearchComponent:FC<SearchComponentProps> = ({inputValue, setInputValue}) => {
    return <div className="relative w-full sm:w-64">
        <input
            type="text"
            placeholder="Buscar categorías..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {inputValue ? (
            <button
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 cursor-pointer"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        ) : (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                            <MagnifyingGlassIcon className="h-5 w-5" />
                          </span>
        )}
    </div>
}

export default SearchComponent;
