import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export const useRevalidateToken = () => {
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        const revalidate = async () => {
            try {
                const res = await fetch('/api/revalidate');
                const data = await res.json();

                if (!data.ok) {
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
