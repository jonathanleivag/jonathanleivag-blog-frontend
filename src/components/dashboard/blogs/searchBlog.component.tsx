import {FC} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {SearchBlogComponentProps} from "@/type";

const SearchBlogComponent:FC<SearchBlogComponentProps> = ({searchQuery, setSearchQuery}) => {
    return  <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
        </div>
        <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder-gray-400 text-sm transition-colors"
            placeholder="Buscar publicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
}

export default SearchBlogComponent;
