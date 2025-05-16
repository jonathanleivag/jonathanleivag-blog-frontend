import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import LayoutDashboardComponent from "@/components/dashboard/layoutDashboard.component";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Dashboard | Blog Jonathanleivag'
}

const DashboardLayout: FC<ChildrenComponentProps> = ({children}) => {
    return <LayoutDashboardComponent> {children} </LayoutDashboardComponent>
}

export default DashboardLayout;
