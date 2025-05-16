'use client'

import {FC, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ActiveFilter, Category, Pagination, StatItem} from "@/type";
import StatCard from "@/components/shared/card.component";
import ModalComponent from "@/components/shared/modal.component";
import FormModalComponent from "@/components/dashboard/categories/formModal.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataCategory, setSelected} from "@/lib/redux/features/category/category.slice";
import {EyeIcon, FolderIcon, NewspaperIcon} from "@heroicons/react/24/outline";
import TableComponent from "@/components/dashboard/categories/table.component";
import SearchComponent from "@/components/dashboard/categories/search.component";
import ModalBlog from "@/components/dashboard/categories/modalBlog.component";
import PaginationComponent from "@/components/shared/pagination.component";
import SelectComponent from "@/components/dashboard/categories/select.component";
import LoadingComponent from "@/components/shared/loading.component";
import LastUpdateComponent from "@/components/shared/lastUpdate.component";


const CategoryDashboardPage: FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalBlog, setShowModalBlog] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isActiveFilter, setIsActiveFilter] = useState<ActiveFilter>('all');
    const [limit, setLimit] = useState<number>(5);
    const [stats, setStats] = useState<StatItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const categories = useAppSelector(state => state.category.categories)
    const blogs = useAppSelector(state => state.category.selectBlog )
    const [showLimitSelector, setShowLimitSelector] = useState(false);
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
                setIsLoading(true)
                const query = new URLSearchParams();
                if (isActiveFilter === "active") query.set('isActive','true')
                if(isActiveFilter === 'inactive') query.set('isActive', 'false')
                if(isActiveFilter === 'all') query.delete('isActive')
                if (search === '') query.delete('search')
                else query.set('search', search)

                query.set('page', currentPage.toString())
                query.set('limit', limit.toString());


                const response = await fetch(`/api/category?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data: Pagination<Category> = await response.json()
                appDispatch(initialDataCategory(data))
                setIsLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                    setIsLoading(false)
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
            <LastUpdateComponent>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard de Categorías</h1>
            </LastUpdateComponent>
            <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex gap-4 w-full sm:w-auto">
                      <SearchComponent inputValue={inputValue} setInputValue={setInputValue} />
                      <SelectComponent isActiveFilter={isActiveFilter} setIsActiveFilter={setIsActiveFilter} />
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Nueva Categoría
                    </button>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                      <LoadingComponent isLoading={isLoading}>
                          <TableComponent categories={categories.docs} handlerEdit={handlerEdit} setShowModalBlog={setShowModalBlog}/>
                      </LoadingComponent>
                  </div>
                  <PaginationComponent items={categories} currentPage={currentPage}  postsPerPage={limit} showLimitSelector={showLimitSelector} setShowLimitSelector={setShowLimitSelector}  setCurrentPage={setCurrentPage} setPostsPerPage={setLimit}  />
                </div>
            </div>
        {showModal && (
                <ModalComponent>
                    <FormModalComponent setShowModal={setShowModal}/>
                </ModalComponent>
        )}
            {
                showModalBlog && blogs !== undefined && (
                    <ModalComponent>
                      <ModalBlog setShowModalBlog={setShowModalBlog} blogs={blogs} />
                    </ModalComponent>
                )
            }
        </motion.div>
    );
};

export default CategoryDashboardPage;
