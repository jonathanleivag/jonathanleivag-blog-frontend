'use client'

import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {useRouter, useSearchParams} from "next/navigation";
import {changeCategory, changePage, changeSearch, initialDataTotalBlog} from "@/lib/redux/features/blog/blog.slice";
import {Blog as BlogInterface, Category, Pagination} from "@/type";
import toast from "react-hot-toast";
import {initialDataCategory} from "@/lib/redux/features/category/category.slice";
import {motion} from "framer-motion";
import CategoriesBlogComponent from "@/components/blog/categoriesBlog.component";
import CardBlogComponent from "@/components/blog/card.component";
import PaginationComponent from "@/components/shared/pagination.component";


const BlogPageComponent: FC = () => {
    const appDispatch = useAppDispatch()

    const blogs = useAppSelector(state => state.blog.totalBlog)
    const page = useAppSelector(state => state.blog.page)
    const category = useAppSelector(state => state.blog.category)
    const search = useAppSelector(state => state.blog.search)

    const [selectedCategory, setSelectedCategory] = useState<string | null>(category);
    const [searchTerm, setSearchTerm] = useState(search);
    const [showLimitSelector, setShowLimitSelector] = useState(false);
    const [currentPage, setCurrentPage] = useState(page);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        appDispatch(changePage(currentPage))
        appDispatch(changeCategory(selectedCategory))
        appDispatch(changeSearch(debouncedSearchTerm))
    }, [appDispatch, currentPage, debouncedSearchTerm, selectedCategory]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = new URLSearchParams();
                query.set('page', currentPage.toString())
                query.set('limit', postsPerPage.toString())
                query.set('published', 'true')

                if (debouncedSearchTerm === '') query.delete('search')
                else query.set('search', debouncedSearchTerm)

                if (selectedCategory !== null) query.set('category', selectedCategory)

                const response = await fetch(`/api/blog?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data: Pagination<BlogInterface> = await response.json()

                if (data.message !== undefined) {
                    toast.error(data.message)
                } else {
                    appDispatch(initialDataTotalBlog(data))
                }
            } catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message)
                    console.error(e.message)
                }
            }
        }
        void fetchData()
    }, [appDispatch, currentPage, postsPerPage, debouncedSearchTerm, router, searchParams, selectedCategory]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const query = new URLSearchParams();
                query.set('isActive', 'true')
                query.set('page', '1')
                query.set('limit', '10')

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
    }, [appDispatch]);

    return (
        <section className="min-h-screen bg-gray-950 text-primary-50 px-4 py-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-4xl font-bold text-primary-100 font-serif drop-shadow"
                >
                    Blog
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.1}}
                    className="text-gray-400 mt-2 mb-6"
                >
                    Ideas, tutoriales y reflexiones del mundo tech
                </motion.p>
                <CategoriesBlogComponent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <motion.input
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-2/3 px-4 py-2 rounded-lg bg-gray-800 text-primary-50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.docs.map((post) => (
                    <CardBlogComponent key={post._id} post={post}/>
                ))}
            </div>
            <div className="flex justify-center mt-12 gap-2">
                <PaginationComponent
                    items={blogs}
                    setShowLimitSelector={setShowLimitSelector}
                    showLimitSelector={showLimitSelector}
                    setPostsPerPage={setPostsPerPage}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    selectLimi={false}
                />
            </div>
        </section>
    );
}

export default BlogPageComponent;
