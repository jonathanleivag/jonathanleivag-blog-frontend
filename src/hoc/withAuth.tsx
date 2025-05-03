'use client';

import {ComponentType, JSX, useEffect} from 'react';
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {useRouter} from 'next/navigation';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
    return function AuthenticatedComponent(props: JSX.IntrinsicAttributes & P) {
        const router = useRouter()
        useEffect(() => {
            const logoutFetch = async () => {
                try {
                    const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_BACKEND_URL)}/auth/logout`,{
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data = await response.json();
                    console.log(data)
                    router.replace('/login')
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message)
                    }
                }
            }
           const fetchData = async () => {
               const token = document.cookie
                 .split('; ')
                 .find(row => row.startsWith('token='))
                 ?.split('=')[1];
               if (!token) {
                   await logoutFetch();
                 router.replace('/login');
                 return;
               }

               const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_BACKEND_URL)}/auth/revalidate`,{
                   method: 'GET',
                   credentials: 'include',
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': `Bearer ${token}`
                   }
               })
               if (!response.ok) {
                   await logoutFetch();
                    router.replace('/login')
               }
           }
            void fetchData()

        }, [router]);

        return <WrappedComponent {...props} />;
    };
}
