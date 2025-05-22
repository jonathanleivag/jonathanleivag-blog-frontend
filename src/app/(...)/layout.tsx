import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import HeaderComponent from "@/components/shared/header/header.component";
import FooterComponent from "@/components/shared/footer.component";
import LayoutViewTransitionComponent from "@/components/layout/layoutViewTransition.component";

const LayoutHome: FC<ChildrenComponentProps> = ({children}) => {
    return <>
        <HeaderComponent/>
        <main className='pt-16'>
            <LayoutViewTransitionComponent>
                {children}
            </LayoutViewTransitionComponent>
        </main>
        <FooterComponent/>
    </>
}

export default LayoutHome;
