import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {FC} from "react";
import {PaginationProps} from "@/type";

const Pagination:FC<PaginationProps> = ({items, setCurrentPage, currentPage, setShowLimitSelector, postsPerPage, showLimitSelector, setPostsPerPage, selectLimi= true }) => {
    const limitOptions = [5, 10, 25, 50];
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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleLimitChange = (limit: number) => {
        setPostsPerPage(limit);
        setCurrentPage(1);
        setShowLimitSelector(false);
    };

    return (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">

                {selectLimi && (
                    <>
                        <span>
                            Mostrando {items.docs.length}  de {items.totalDocs}
                        </span>
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

                                    <div className="absolute right-0 mt-1 w-36 max-w-[calc(100vw-2rem)] overflow-auto rounded-lg bg-white shadow-lg border z-20">
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
                    </>
                )}

            </div>
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
        </div>
    );
};

export default Pagination;
