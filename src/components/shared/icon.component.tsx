import {FC} from "react";
import {IconComponentProps} from "@/type";

const IconComponent:FC<IconComponentProps> = ({icon}) => {
    return  <svg width='24' height='24' aria-hidden="true" className="fill-current">
        <use href={`/assets/sprite.svg#${icon}`} />
    </svg>
}

export default IconComponent;
