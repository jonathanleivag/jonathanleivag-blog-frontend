import {FC} from "react";
import {PaginateComponentProps} from "@/type";

const PaginateComponent:FC<PaginateComponentProps> = ({categories, setCurrentPage, currentPage}) => {
    return <>
        {categories.totalPages > 1 && (
            <div className="flex justify-center mt-6  py-3">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {Array.from({ length: categories.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border text-sm font-medium cursor-pointer ${
                                currentPage === page
                                    ? 'bg-primary-600 text-white border-primary-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </nav>
            </div>
        )}
    </>
}

export default PaginateComponent;
