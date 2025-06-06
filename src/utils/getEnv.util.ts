import {ENV} from '@/enum'

export const getEnv = (key: ENV): string => {
    switch (key) {
        case "BACKEND_URL":
            if (!process.env.BACKEND_URL) throw new Error('BACKEND_URL not found')
            return process.env.BACKEND_URL
        case "NEXT_PUBLIC_BACKEND_URL":
            if (!process.env.NEXT_PUBLIC_BACKEND_URL) throw new Error('NEXT_PUBLIC_BACKEND_URL not found')
            return process.env.NEXT_PUBLIC_BACKEND_URL
        case "APP_ENV":
            if (!process.env.APP_ENV) throw new Error('APP_ENV not found')
            return process.env.APP_ENV
        case "SAMESITE":
            if (!process.env.SAMESITE) throw new Error('SAMESITE not found')
            return process.env.SAMESITE
        case "NEXT_PUBLIC_TINY_API_KEY":
            if (!process.env.NEXT_PUBLIC_TINY_API_KEY) throw new Error('NEXT_PUBLIC_TINY_API_KEY not found')
            return process.env.NEXT_PUBLIC_TINY_API_KEY
        case "NEXT_PUBLIC_UPLOADPRESET":
            if (!process.env.NEXT_PUBLIC_UPLOADPRESET) throw new Error('NEXT_PUBLIC_UPLOADPRESET not found')
            return process.env.NEXT_PUBLIC_UPLOADPRESET
        case "BACKEND_URL_WEB":
            if (!process.env.BACKEND_URL_WEB) throw new Error('BACKEND_URL_WEB not found')
            return process.env.BACKEND_URL_WEB
        case "NEXT_PUBLIC_SITE_URL":
            if (!process.env.NEXT_PUBLIC_SITE_URL) throw new Error('NEXT_PUBLIC_SITE_URL not found')
            return process.env.NEXT_PUBLIC_SITE_URL
        default:
            return ''
    }
}
