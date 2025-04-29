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

export interface CardNewsComponentProps {
    news: NewsItem;
    index: number;
}

export interface  Author {
    name: string;
    avatar: string;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    author: Author;
    image: string;
    tags: string[];
}

export interface  CardBlogComponentProps {
    post: BlogPost;
    index: number;
}




