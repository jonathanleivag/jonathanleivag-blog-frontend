'use client'

import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import {AnimatePresence} from "framer-motion";

const AnimatePresenceLayout: FC<ChildrenComponentProps> = ({children}) => {
    return <AnimatePresence mode={'wait'}>{children}</AnimatePresence>
}

export default AnimatePresenceLayout;
