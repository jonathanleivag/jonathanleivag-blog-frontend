import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export const useRevalidateToken = () => {
    const router = useRouter();

    useEffect(() => {
        const revalidate = async () => {
            try {
                const res = await fetch('/api/revalidate');
                const data = await res.json();

                if (!data.ok) {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error al revalidar token:', error);
                router.push('/login');
            }
        };

        void revalidate();
    }, [router]);
};
