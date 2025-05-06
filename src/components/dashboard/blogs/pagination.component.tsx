import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {FC} from "react";
import {PaginationProps} from "@/type";

const Pagination:FC<PaginationProps> = ({items, currentPage, handlePageChange}) => {
    if (items.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(items.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-50 cursor-pointer'
                }`}
            >
                <ChevronLeftIcon className="h-5 w-5"/>
            </button>

            <div className="flex items-center space-x-1">
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-sm cursor-pointer"
                        >
                            1
                        </button>
                        {startPage > 2 && (
                            <span className="px-2 text-gray-500">...</span>
                        )}
                    </>
                )}

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                            currentPage === number
                                ? 'bg-primary-600 text-white'
                                : 'border bg-white hover:bg-gray-50'
                        }`}
                    >
                        {number}
                    </button>
                ))}

                {endPage < items.totalPages && (
                    <>
                        {endPage < items.totalPages - 1 && (
                            <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                            onClick={() => handlePageChange(items.totalPages)}
                            className="px-3 py-1 rounded-lg cursor-pointer border bg-white hover:bg-gray-50 text-sm"
                        >
                            {items.totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === items.totalPages}
                className={`p-2 rounded-lg  border ${
                    currentPage === items.totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-50 cursor-pointer'
                }`}
            >
                <ChevronRightIcon className="h-5 w-5"/>
            </button>
        </div>
    );
};

export default Pagination;
