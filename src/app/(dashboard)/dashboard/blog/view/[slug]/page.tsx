'use client'

import {FC, useState} from "react";
import ViewBlogComponent from "@/components/shared/viewBlog.component";
import {Blog} from "@/type";

const SlugPage: FC = () => {
   const [data, setData] = useState<Blog>()
   return <ViewBlogComponent isLogin={true} data={data} setData={setData} />
};

export default SlugPage;
