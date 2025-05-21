import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import HeaderComponent from "@/components/shared/header/header.component";
import FooterComponent from "@/components/shared/footer.component";
import {AnimatePresence} from "framer-motion";

const LayoutHome: FC<ChildrenComponentProps> = ({children}) => {
    return <>
        <HeaderComponent/>
        <main className='pt-16'>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
        </main>
        <FooterComponent/>
    </>
}

export default LayoutHome;
