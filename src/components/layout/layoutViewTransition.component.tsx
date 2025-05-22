'use client'

import {FC, useEffect} from "react";
import {ChildrenComponentProps} from "@/type";

const LayoutViewTransitionComponent: FC<ChildrenComponentProps> = ({children}) => {

    useEffect(() => {
        if (typeof document !== 'undefined' && 'startViewTransition' in document) {
            document.documentElement.dataset.viewTransition = 'enabled';
        }
    }, []);

    return <>{children}</>
}

export default LayoutViewTransitionComponent;
