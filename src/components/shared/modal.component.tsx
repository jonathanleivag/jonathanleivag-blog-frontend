import {FC} from "react";
import {ChildrenComponentProps} from "@/type";

const ModalComponent:FC<ChildrenComponentProps> = ({children}) => {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
            {children}
        </div>
    </div>
}

export default ModalComponent;
