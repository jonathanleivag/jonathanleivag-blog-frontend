import {FC, useEffect, useState} from "react";
import {Field} from "formik";
import {Category, Pagination} from "@/type";
import {addCategorySelect} from "@/lib/redux/features/category/category.slice";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";

const SelectCategories: FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit] = useState<number>(5);
    const [isLoading, setIsLoading] = useState(false);
    const categories = useAppSelector(state => state.category.categories);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategories = async (page: number) => {
            setIsLoading(true);
            try {
                const query = new URLSearchParams();
                query.set('isActive', 'true');
                query.set('page', page.toString());
                query.set('limit', limit.toString());

                const response = await fetch(`/api/category?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data: Pagination<Category> = await response.json();
                appDispatch(addCategorySelect(data));
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        void fetchCategories(currentPage);
    }, [appDispatch, currentPage, limit]);

    const handleScroll = (e: React.UIEvent<HTMLSelectElement>) => {
        const select = e.currentTarget;
        if (
            select.scrollTop + select.clientHeight >= select.scrollHeight - 1 &&
            !isLoading &&
            categories.hasNextPage
        ) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="relative">
            <Field
                as="select"
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                onScroll={handleScroll}
                size={5}
                style={{ maxHeight: '200px' }}
            >
                <option value="">Selecciona una categoría</option>
                {categories.docs.map(category => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
                {isLoading && (
                    <option disabled>Cargando más categorías...</option>
                )}
                {!categories.hasNextPage && (
                    <option disabled>No hay más categorías</option>
                )}
            </Field>
            {isLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default SelectCategories;
