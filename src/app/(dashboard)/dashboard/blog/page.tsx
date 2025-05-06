'use client'

import {FC, useEffect, useState} from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PencilSquareIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import {AnimatePresence, motion} from "framer-motion";
import StatCard from "@/components/shared/card.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {Blog as BlogType, Pagination, StatItem} from "@/type";
import {initialDataBlog} from "@/lib/redux/features/blog/blog.slice";

type PostStatus = 'all' | 'published' | 'draft' | 'popular';

const Blog: FC = () => {
  const [activeFilter, setActiveFilter] = useState<PostStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [showLimitSelector, setShowLimitSelector] = useState(false);
  const blogs = useAppSelector(state => state.blog.blogs)
  const [stats, setStats] = useState<StatItem[]>([])
  const appDispatch = useAppDispatch()

  const limitOptions = [5, 10, 25, 50];

  const handleCreateBlog = () => {
    console.log("Crear nuevo blog");
  };


  useEffect(() => {
    setStats([
      {
        title: 'Total Blogs',
        value: blogs.totalPages,
        icon: <NewspaperIcon className="w-full h-full" />,
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-600',
      },
      {
        title: 'Total Blogs por página',
        value: blogs.docs.length,
        icon: <NewspaperIcon className="w-full h-full" />,
        bgColor: "bg-blue-50",
        textColor: 'text-blue-600',
      },
      {
        title: 'Vistas de Blogs por página',
        value: blogs.docs.reduce((sum, blog) => sum + blog.views, 0),
        icon: <EyeIcon className="w-full h-full" />,
        bgColor: 'bg-accent-100',
        textColor: 'text-accent-700',
      },
      {
        title:"No publicado por pagina",
        value:blogs.docs.filter(post => !post.published).length,
        icon:  <PencilSquareIcon className="w-full h-full" />,
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600"
      }
    ])
  }, [blogs]);

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

  const Pagination = () => {
    if (blogs.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(blogs.totalPages, startPage + maxVisiblePages - 1);

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
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5"/>
        </button>

        <div className="flex items-center space-x-1">
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-sm"
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
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === number
                  ? 'bg-primary-600 text-white'
                  : 'border bg-white hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < blogs.totalPages && (
            <>
              {endPage < blogs.totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(blogs.totalPages)}
                className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-sm"
              >
                {blogs.totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === blogs.totalPages}
          className={`p-2 rounded-lg border ${
            currentPage === blogs.totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ChevronRightIcon className="h-5 w-5"/>
        </button>
      </div>
    );
  };

  const LimitSelector = () => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard del Blog</h1>
        </div>
      </div>

      <div className="px-4 -mt-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(item => (
              <StatCard
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
              />
          ))}
        </div>
      </div>

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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder-gray-400 text-sm transition-colors"
                  placeholder="Buscar publicaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-2 w-full">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`min-w-0 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center
                      ${activeFilter === 'all'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <span className="truncate">Todos</span>
                </button>
                <button
                  onClick={() => setActiveFilter('published')}
                  className={`min-w-0 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center
                      ${activeFilter === 'published'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <span className="truncate">Publicados</span>
                </button>
                <button
                  onClick={() => setActiveFilter('draft')}
                  className={`min-w-0 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center
                      ${activeFilter === 'draft'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <span className="truncate">Borradores</span>
                </button>
                <button
                  onClick={() => setActiveFilter('popular')}
                  className={`min-w-0 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center
                      ${activeFilter === 'popular'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <span className="truncate">Destacados ⭐</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
              <AnimatePresence mode="wait">
                {blogs.docs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.2}}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base font-medium text-gray-900">
                            {blog.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {blog.category.name}
                            </span>
                            {blog.popular && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                                Destacado ⭐
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {blog.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          blog.published
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {blog.published ? 'Publicado' : 'Borrador'}
                        </span>
                        <button className="text-gray-400 hover:text-gray-500">
                          <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                      </div>
                    </div>
                  </motion.div>
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
                <LimitSelector/>
              </div>
              <Pagination/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
