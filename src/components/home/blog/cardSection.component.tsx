'use client'
import {FC, useEffect} from "react";
import {motion} from "framer-motion";
import CardComponent from "@/components/home/blog/card.component";
import {Blog, Pagination} from "@/type";
import toast from "react-hot-toast";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataBlog} from "@/lib/redux/features/blog/blog.slice";
import {format} from "date-fns";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const CardSectionComponent:FC = () => {

    const appDisptatch = useAppDispatch()
    const blogs = useAppSelector(state => state.blog.blogs)

    useEffect(() => {
        const fetchData = async () =>  {
            try {
                const query = new URLSearchParams();
                query.set('page', '1')
                query.set('limit', '3')
                query.set('published', 'true')
                query.set('popular', 'true')
                const response = await fetch(`/api/blog?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data: Pagination<Blog> = await response.json()
                console.log({data})
                if (data.message === undefined) {
                    appDisptatch(initialDataBlog(data))
                } else {
                    console.error(data.message)
                    toast.error(data.message)
                }

            }   catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message)
                }
            }
        }

        void fetchData()
    }, [appDisptatch]);

    return  <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="md:w-full grid grid-cols-1 md:grid-cols-2 gap-6 "
    >
        {blogs.docs.map((post, index) => (
            <CardComponent key={post._id} index={index}  post={{
                id: post._id,
                slug: post.slug,
                title: post.title,
                excerpt: post.description,
                category: post.category.name,
                readTime: post.readingTime.toString(),
                date: format(post.createdAt, 'dd/MM/yyyy'),
                author:{
                    name: post.user.name,
                    avatar: ''
                },
                image: post.image,
                tags: post.tags
            }} />
        ))}
    </motion.div>
}

export default CardSectionComponent;
