import {ENV} from '@/enum'

export const getEnv = (key: ENV): string => {
   switch (key) {
       case "BACKEND_URL":
           if (!process.env.BACKEND_URL) throw new Error('BACKEND_URL not found')
           return process.env.BACKEND_URL
       case "NEXT_PUBLIC_BACKEND_URL":
           if (!process.env.NEXT_PUBLIC_BACKEND_URL) throw new Error('NEXT_PUBLIC_BACKEND_URL not found')
           return process.env.NEXT_PUBLIC_BACKEND_URL
       default:
           return ''
   }
}
