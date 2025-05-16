import {FC} from "react";
import {format} from "date-fns";
import {ChildrenComponentProps} from "@/type";

const LastUpdateComponent:FC<ChildrenComponentProps> = ({children}) => {
    return <div className="flex flex-col sm:flex-row justify-between items-center">
        {children}
        <div className="text-sm text-gray-500">
            Última actualización: {format(new Date(), 'dd/MM/yyyy HH:mm')}
        </div>
    </div>
}

export default LastUpdateComponent;
