'use client'
import {FC} from "react";
import {ChildrenComponentProps} from "@/type";
import {withAuth} from "@/hoc/withAuth";

const DashboardLayout: FC<ChildrenComponentProps> = ({children}) => {
    return <>{children}</>
}

export default withAuth(DashboardLayout);
