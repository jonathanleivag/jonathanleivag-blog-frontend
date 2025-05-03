import {useEffect} from 'react';

const useScrollLock = () => {
    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.right = '0';
        document.body.style.left = '0';
        document.body.style.width = '100%';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.right = '';
            document.body.style.left = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
            window.scrollTo(0, scrollY);
        };
    }, []);
};

export default useScrollLock;
