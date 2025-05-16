import {MetadataRoute} from "next";
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/*', '/login'],
        },
        sitemap: `${getEnv(ENV.NEXT_PUBLIC_SITE_URL)}/sitemap.xml`,
    }
}
