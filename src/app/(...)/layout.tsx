import {FC} from "react";
import {ChipComponentProps} from "@/type";
import HeaderComponent from "@/components/shared/header/header.component";
import FooterComponent from "@/components/shared/footer.component";

const LayoutHome:FC<ChipComponentProps> = ({children}) => {
    return <>
        <HeaderComponent/>
        {children}
        <FooterComponent />
    </>
}

export default LayoutHome;
