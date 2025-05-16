import {Blog} from "@/type";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export const getBlogBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}/api/blog/view/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Blog = await response.json()
        return data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
        }
    }
}

export const getBlogAll = async () => {
    try {
        const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}/api/blog/total`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Blog[] = await response.json()
        if (!data) return []
        return data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return []
        }
        return []
    }
}
