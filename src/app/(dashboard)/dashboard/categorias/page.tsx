'use client'
import {FC, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Category, Pagination, StatItem} from "@/type";
import StatCard from "@/components/dashboard/categories/card.component";
import ModalComponent from "@/components/shared/modal.component";
import FormModalComponent from "@/components/dashboard/categories/formModal.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataCategory, setSelected} from "@/lib/redux/features/category/category.slice";
import {EyeIcon, FolderIcon, MagnifyingGlassIcon, NewspaperIcon, XMarkIcon} from "@heroicons/react/24/outline";
import TableComponent from "@/components/dashboard/categories/table.component";


const CategoryDashboardPage: FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isActiveFilter, setIsActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [limit, setLimit] = useState<string>('5');
    const [stats, setStats] = useState<StatItem[]>([])
    const categories = useAppSelector(state => state.category.categories)
    const appDispatch = useAppDispatch()

    useEffect(() => {
        setStats([
            {
                title: 'Total Blogs por pagina',
                value: categories.docs.reduce((acc, category) => acc + category.blogs.length, 0),
                icon: <NewspaperIcon className="w-full h-full" />,
                bgColor: 'bg-primary-50',
                textColor: 'text-primary-600',
            },
            {
                title: 'Total Categorías por página',
                value: categories.docs.length,
                icon: <FolderIcon className="w-full h-full" />,
                bgColor: 'bg-accent-50',
                textColor: 'text-accent-600',
            },{
                title: 'Total Categorías',
                value: categories.totalDocs,
                icon: <FolderIcon className="w-full h-full" />,
                bgColor: 'bg-accent-50',
                textColor: 'text-accent-600',
            },
            {
                title: 'Vistas de Blogs por página',
                value: categories.docs.reduce((acc, category) => {
                    return acc + category.blogs.reduce((sum, blog) => sum + blog.views, 0);
                }, 0),
                icon: <EyeIcon className="w-full h-full" />,
                bgColor: 'bg-accent-100',
                textColor: 'text-accent-700',
            }
        ])
    }, [categories]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const query = new URLSearchParams();
                if (isActiveFilter === "active") query.set('isActive','true')
                if(isActiveFilter === 'inactive') query.set('isActive', 'false')
                if(isActiveFilter === 'all') query.delete('isActive')
                if (search === '') query.delete('search')
                else query.set('search', search)
                
                query.set('page', currentPage.toString())
                query.set('limit', limit);


                const response = await fetch(`/api/category?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data: Pagination<Category> = await response.json()
                appDispatch(initialDataCategory(data))
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                }
            }
        }
        void dataFetch()
    }, [appDispatch, currentPage, isActiveFilter, search, limit]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setSearch(inputValue);
      }, 500);

      return () => clearTimeout(timeout);
    }, [inputValue]);

    useEffect(() => {
        setCurrentPage(1);
    }, [limit, isActiveFilter, search]);

    const handlerEdit = (category: Category) => {
        appDispatch(setSelected(category))
        setShowModal(true)
    }

    return (
        <motion.div
            className="p-6 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard de Categorías</h1>
                <p className="text-gray-500 mt-1">Resumen de estadísticas generales del sistema</p>
            </div>

            <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex gap-4 w-full sm:w-auto">
                      <div className="relative w-full sm:w-64">
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
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Nueva Categoría
                    </button>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                   <TableComponent categories={categories.docs} handlerEdit={handlerEdit} />
                    {categories.totalPages > 1 && (
                      <div className="flex justify-center mt-6">
                        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          {Array.from({ length: categories.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 border text-sm font-medium ${
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
                  </div>
                </div>
            </div>
        {showModal && (
                <ModalComponent>
                    <FormModalComponent setShowModal={setShowModal}/>
                </ModalComponent>
        )}
        </motion.div>
    );
};

export default CategoryDashboardPage;
