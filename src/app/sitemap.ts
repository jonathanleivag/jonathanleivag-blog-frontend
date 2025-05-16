import {MetadataRoute} from 'next'
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {Blog} from "@/type";
import {getBlogAll} from "@/lib/fetchData/blog";

export const revalidate = 604800

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data: Blog[] = await getBlogAll()

    const blogEntries: MetadataRoute.Sitemap = data.map((blog) => ({
        url: `${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}/blog/view/${blog.slug}`,
        lastModified: blog.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [
        {
            url: `${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...blogEntries
    ]
}
