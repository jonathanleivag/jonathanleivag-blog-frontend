import {Dispatch, SetStateAction, SVGProps} from "react";
import {SVGMotionProps} from "framer-motion";

export type IconProps = SVGProps<SVGSVGElement>;

export type PathProps = SVGMotionProps<SVGPathElement>;

export interface MenuButtonComponentProps {
    isMenuOpen: boolean;
}

export interface NavbarMobilComponentProps extends MenuButtonComponentProps {
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}


