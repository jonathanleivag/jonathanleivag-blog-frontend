import {Dispatch, ReactNode, SetStateAction, SVGProps} from "react";
import {SVGMotionProps} from "framer-motion";

export type IconProps = SVGProps<SVGSVGElement>;

export type PathProps = SVGMotionProps<SVGPathElement>;

export interface MenuButtonComponentProps {
    isMenuOpen: boolean;
}

export interface NavbarMobilComponentProps extends MenuButtonComponentProps {
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}


export interface CardNewsComponentProps {
    news: Gnews;
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


export  interface Project {
    id: number
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    link: string;
}

export interface  CardProjectComponentProps {
    project: Project;
}

export interface  CardNewsPageComponentProps {
    news: Gnews;
}

export interface NewsState {
    news: Gnews[]
}


export interface Gnews {
    type_of:                  "article";
    id:                       number;
    title:                    string;
    description:              string;
    readable_publish_date:    string;
    slug:                     string;
    path:                     string;
    url:                      string;
    comments_count:           number;
    public_reactions_count:   number;
    collection_id:            null;
    published_timestamp:      Date;
    language:                 Language | null;
    subforem_id:              null;
    positive_reactions_count: number;
    cover_image:              null | string;
    social_image:             string;
    canonical_url:            string;
    created_at:               Date;
    edited_at:                Date | null;
    crossposted_at:           null;
    published_at:             Date;
    last_comment_at:          Date;
    reading_time_minutes:     number;
    tag_list:                 string[];
    tags:                     string;
    user:                     User;
    organization?:            Organization;
    flare_tag?:               FlareTag;
}

export interface FlareTag {
    name:           string;
    bg_color_hex:   string;
    text_color_hex: string;
}

export type Language = "es" | "en";

export interface Organization {
    name:             string;
    username:         string;
    slug:             string;
    profile_image:    string;
    profile_image_90: string;
}

export interface User {
    name:             string;
    username:         string;
    twitter_username: null | string;
    github_username:  null | string;
    user_id:          number;
    website_url:      null | string;
    profile_image:    string;
    profile_image_90: string;
}

export interface ChildrenComponentProps {
    children: ReactNode;
}


export interface LoginFormInitialValue {
    email: string;
    password: string;
}

export interface StatItem {
    title: string;
    value: number | string;
    icon: ReactNode;
    bgColor: string;
    textColor: string;
}

export interface  FormModalComponentProps  {
    setShowModal:  Dispatch<SetStateAction<boolean>>
}

export interface  FormModalComponentInitialValue  {
    name:        string;
    description: string;
    isActive:    boolean | string;
}

export interface Category extends ErrorMessageComponentProps{
    _id:         string;
    name:        string;
    description: string;
    isActive:    boolean;
    deletedAt:   null;
    createdAt:   Date;
    updatedAt:   Date;
    blogs:       Blog[];
}

export interface Blog {
    _id:         string;
    title:       string;
    content:     string;
    description: string;
    image:       string;
    published:   boolean;
    slug:        string;
    tags:        string[];
    views:       number;
    readingTime: number;
    popular:     boolean;
    user:        User;
    category:    string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface User {
    _id:       string;
    name:      string;
    email:     string;
    phone:     string;
    role:      string;
    isActive:  boolean;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
}

export interface  ErrorMessageComponentProps {
    message?: string;
    status?: number;
}

export interface CategoryState {
    categories: Pagination<Category>;
    selected: Category | null
    selectBlog: Blog[] | undefined
}

export interface  TableComponentProps {
    categories: Category[]
    handlerEdit: (category: Category) => void;
}

export interface  SearchComponentProps {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
}

export type ActiveFilter = 'all' | 'active' | 'inactive';

export interface  SelectComponentProps{
    isActiveFilter: ActiveFilter
    setIsActiveFilter: Dispatch<SetStateAction<ActiveFilter>>
    limit: string
    setLimit: Dispatch<SetStateAction<string>>
}

export interface PaginateComponentProps {
    categories: Pagination<Category>
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export interface Pagination<T> {
    docs:          T[];
    totalDocs:     number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      null;
    nextPage:      null;
}

export interface Blog {
    _id:         string;
    title:       string;
    content:     string;
    description: string;
    image:       string;
    published:   boolean;
    slug:        string;
    tags:        string[];
    views:       number;
    readingTime: number;
    popular:     boolean;
    user:        User;
    category:    string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface User {
    _id:       string;
    name:      string;
    email:     string;
    phone:     string;
    role:      string;
    isActive:  boolean;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
}

