import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {FC} from "react";
import {LimitSelectorProps} from "@/type";

const limitOptions = [5, 10, 25, 50];

const LimitSelector: FC<LimitSelectorProps> = ({setShowLimitSelector, showLimitSelector, postsPerPage, handleLimitChange}) => (
    <div className="relative">
        <button
            onClick={() => setShowLimitSelector(!showLimitSelector)}
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
        >
            <span>{postsPerPage} por página</span>
            <ChevronDownIcon className="h-4 w-4"/>
        </button>

        {showLimitSelector && (
            <>
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLimitSelector(false)}
                />

                <div className="absolute right-0 mt-1 w-36 rounded-lg bg-white shadow-lg border z-20">
                    <div className="py-1">
                        {limitOptions.map((limit) => (
                            <button
                                key={limit}
                                onClick={() => handleLimitChange(limit)}
                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50
                    ${postsPerPage === limit ? 'bg-gray-50 text-primary-600' : 'text-gray-700'}
                  `}
                            >
                                {limit} por página
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
);

export default LimitSelector;
