import {FC} from "react";
import ViewBlogComponent from "@/components/shared/viewBlog.component";
import {getBlogSlugProps} from "@/type";
import {getBlogBySlug} from "@/lib/fetchData/blog";
import ErrorBlogComponent from "@/components/dashboard/blogs/view/errorBlog.component";

const SlugPage: FC<getBlogSlugProps> = async ({params}) => {
    const {slug} = await params
    const data = await getBlogBySlug(slug)

    if (data?.message !== undefined) return <ErrorBlogComponent error={data.message}/>

    return <ViewBlogComponent isLogin={true} data={data}/>
};

export default SlugPage;
