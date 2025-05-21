import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import getTokenFromCookie from "@/utils/getTokenFromCookie";

export const useRevalidateToken = () => {
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        const revalidate = async () => {
            try {
                const token = getTokenFromCookie();
                const response = await fetch(`${getEnv(ENV.NEXT_PUBLIC_BACKEND_URL)}/auth/revalidate`, {
                    method: 'GET',
                    headers: {Authorization: `Bearer ${token}`},
                    credentials: 'include'
                });

                const data = await response.json();

                if (!data.token) {
                    const res = await fetch(`${getEnv(ENV.NEXT_PUBLIC_BACKEND_URL)}/auth/logout`, {
                        method: 'GET',
                        credentials: 'include'
                    })
                    await res.json();
                    router.replace('/login');
                } else {
                    setIsValidated(true);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                }
                router.replace('/login');
            }
        };

        void revalidate();
    }, [router]);

    return [isValidated]
};
