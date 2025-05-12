import {useEffect} from 'react';

export const useBodyClass = (className: string) => {
  useEffect(() => {
    const originalClasses = document.body.className;
    document.body.className = className;
    return () => {
      document.body.className = originalClasses;
    };
  }, [className]);
};
