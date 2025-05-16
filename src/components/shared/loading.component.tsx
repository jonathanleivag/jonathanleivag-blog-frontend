import {FC} from "react";
import {LoadingComponentProps} from "@/type";

const LoadingComponent:FC<LoadingComponentProps> = ({children, isLoading}) => {
    return <>
        {isLoading ? (
            <div className="p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        ) : (
            <>
                {children}
            </>
        )}
    </>
}

export default LoadingComponent;
