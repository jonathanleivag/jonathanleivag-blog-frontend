'use client'

import {FC, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Blog} from "@/type";
import FormBlogComponent from "@/components/dashboard/blogs/form/formBlog.component";
import LoadingScreen from "@/components/dashboard/blogs/view/loadingBlog.component";
import ErrorBlogComponent from "@/components/dashboard/blogs/view/errorBlog.component";

const EditPageComponent:FC = () => {
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<Blog>()
    const [error, setError] = useState<string | string[]>('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/view/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data: Blog = await response.json()

                if (data.message !== undefined) {
                    setError(data.message)
                }

                setIsLoading(false);
                setData(data)
            } catch (e) {
                if(e instanceof Error) {
                    console.error(e.message)
                    setError(e.message)
                    setIsLoading(false);
                }
            }
        }

        void fetchData()
    }, [slug]);

    if (isLoading) return <LoadingScreen />

    if (error !== '') return <ErrorBlogComponent error={error} />


    return <FormBlogComponent blog={data} />
}

export default EditPageComponent;
