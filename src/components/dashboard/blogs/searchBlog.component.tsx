import {FC} from "react";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {SearchBlogComponentProps} from "@/type";

const SearchBlogComponent:FC<SearchBlogComponentProps> = ({searchQuery, setSearchQuery}) => {
    return  <div className="relative">
        <input
            type="text"
            className="block w-full px-4 pr-12 py-2.5 border border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder-gray-400 text-sm transition-colors"
            placeholder="Buscar publicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {searchQuery ? (
                <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                >
                    <XMarkIcon className="h-5 w-5"/>
                </button>
            ) : (
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
            )}
        </div>
    </div>
}

export default SearchBlogComponent;
