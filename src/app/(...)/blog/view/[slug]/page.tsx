'use client'
import {FC} from "react";
import ViewBlogComponent from "@/components/shared/viewBlog.component";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import {useBodyClass} from "@/hooks/useBodyClass";

const BlogViewPage:FC = () => {
    const isLogin = useIsLoggedIn()
    useBodyClass('bg-white');


    return <ViewBlogComponent isLogin={isLogin} />
}

export default BlogViewPage;
