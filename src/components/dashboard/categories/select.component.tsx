import {FC} from "react";
import {SelectComponentProps} from "@/type";

const SelectComponent:FC<SelectComponentProps> = ({isActiveFilter, setIsActiveFilter, limit, setLimit}) => {
    return <>
        <select
            value={isActiveFilter}
            onChange={(e) => setIsActiveFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="inactive">Inactivas</option>
        </select>
        <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
            <option value="5">5 / página</option>
            <option value="10">10 / página</option>
            <option value="20">20 / página</option>
            <option value="50">50 / página</option>
        </select>
    </>
}

export default SelectComponent;
