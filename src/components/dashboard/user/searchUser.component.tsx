import {FC} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {SearchComponentProps} from "@/type";

const SearchUserComponent:FC<SearchComponentProps> = ({inputValue, setInputValue}) => {
    return  <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     placeholder-gray-400 text-gray-900"
            placeholder="Buscar por nombre"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    </div>
}

export default SearchUserComponent;
