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

export interface NewsItem {
    id: number
    title: string;
    date: string;
    summary: string;
    imageUrl: string;
    category: string;
}

export interface CardComponentProps {
    news: NewsItem;
    index: number;
}


