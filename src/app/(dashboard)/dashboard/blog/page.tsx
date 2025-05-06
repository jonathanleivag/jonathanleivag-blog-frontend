'use client'

import {FC, useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {AnimatePresence} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {Blog as BlogType, ButtonFilter, Pagination, PostStatus} from "@/type";
import {initialDataBlog} from "@/lib/redux/features/blog/blog.slice";
import PaginationComponent from "@/components/dashboard/blogs/pagination.component";
import LimitSelector from "@/components/dashboard/blogs/limit.component";
import CardBlogComponent from "@/components/dashboard/blogs/cardBlog.component";
import TableComponent from "@/components/dashboard/blogs/tableBlog.component";
import ButtonBlogFilterComponent from "@/components/dashboard/blogs/buttonBlogFilter.component";
import SearchBlogComponent from "@/components/dashboard/blogs/searchBlog.component";

const Blog: FC = () => {
  const [activeFilter, setActiveFilter] = useState<PostStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [showLimitSelector, setShowLimitSelector] = useState(false);
  const blogs = useAppSelector(state => state.blog.blogs)
  const appDispatch = useAppDispatch()

  const buttonFilter: ButtonFilter[] = [
    {
      selection: 'all',
      title: 'Todos 📋',
    },
    {
      selection: 'published',
      title: 'Publicados ✅',
    },
    {
      selection: 'draft',
      title: 'Borradores 📝',
    },
    {
      selection: 'popular',
      title: 'Destacados ⭐',
    }
  ]


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams();

        if (debouncedSearchQuery === '') query.delete('search')
        else query.set('search', debouncedSearchQuery)

        if(activeFilter === 'all') query.delete('published')
        if(activeFilter === 'published') query.set('published', 'true')
        if(activeFilter === 'draft') query.set('published', 'false')
        if(activeFilter === 'popular') {
          query.delete('published')
          query.set('popular', 'true')
        }

        query.set('page', currentPage.toString())
        query.set('limit', postsPerPage.toString())

        const response = await fetch(`/api/blog?${query.toString()}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data: Pagination<BlogType> = await response.json()
        appDispatch(initialDataBlog(data))
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
      }
    }
    void fetchData()
  }, [appDispatch, debouncedSearchQuery, currentPage, postsPerPage, activeFilter]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleLimitChange = (limit: number) => {
    setPostsPerPage(limit);
    setCurrentPage(1);
    setShowLimitSelector(false);
  };

  const handleCreateBlog = () => {
    console.log("Crear nuevo blog");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard del Blog</h1>
        </div>
      </div>
      <CardBlogComponent blogs={blogs} />
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <h2 className="text-lg font-medium text-gray-900 w-full sm:w-auto">Publicaciones Recientes</h2>
              <button
                onClick={handleCreateBlog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-primary-600 text-white font-medium text-sm
                         hover:bg-primary-700 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                         shadow-sm"
              >
                <PlusIcon className="h-5 w-5"/>
                <span>Crear Blog</span>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <SearchBlogComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <div className="grid grid-cols-4 gap-2 w-full">
                {buttonFilter.map(item => (
                   <ButtonBlogFilterComponent key={item.selection} item={item} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
              <AnimatePresence mode="wait">
                {blogs.docs.map((blog) => (
                  <TableComponent key={blog._id} blog={blog} />
                ))}
              </AnimatePresence>
              {blogs.totalDocs === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No se encontraron publicaciones que coincidan con tu búsqueda.
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  Mostrando {blogs.docs.length}  de {blogs.totalDocs}
                </span>
                <LimitSelector setShowLimitSelector={setShowLimitSelector} handleLimitChange={handleLimitChange} showLimitSelector={showLimitSelector} postsPerPage={postsPerPage} />
              </div>
              <PaginationComponent handlePageChange={handlePageChange} currentPage={currentPage} items={blogs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
