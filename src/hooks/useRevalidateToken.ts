import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export const useRevalidateToken = () => {
    const router = useRouter();

    useEffect(() => {
        const revalidate = async () => {
            try {
                const res = await fetch('/api/revalidate', {
                    method: 'GET',
                });
                console.log({res})
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const contentType = res.headers.get('content-type');

                if (contentType?.includes('application/json')) {
                    const data = await res.json();

                    if (!data.ok) {
                        router.push('/login');
                    }
                } else {
                    // No hay JSON, asumir token inválido o error inesperado
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
