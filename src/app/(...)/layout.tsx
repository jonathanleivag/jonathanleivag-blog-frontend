import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import HeaderComponent from "@/components/shared/header/header.component";
import FooterComponent from "@/components/shared/footer.component";
import AnimatePresenceLayout from "@/components/layouts/animatePresence.layout";

const LayoutHome: FC<ChildrenComponentProps> = ({children}) => {
    return <>
        <HeaderComponent/>
        <main className='pt-16'>
            <AnimatePresenceLayout>{children}</AnimatePresenceLayout>
        </main>
        <FooterComponent/>
    </>
}

export default LayoutHome;
