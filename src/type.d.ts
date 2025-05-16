import {Dispatch, ReactNode, SetStateAction, SVGProps} from 'react'
import {SVGMotionProps} from 'framer-motion'
import {FormikErrors, FormikValues} from 'formik'

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

export interface Author {
    name: string;
    avatar: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    author: Author;
    image: string;
    tags: string[];
}

export interface CardBlogComponentProps {
    post: BlogPost;
    index: number;
}


export interface Project {
    id: number
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    link: string;
    url: string
}

export interface CardProjectComponentProps {
    project: Project;
}

export interface CardNewsPageComponentProps {
    news: Gnews;
}

export interface NewsState {
    news: Gnews[]
}


export interface Gnews {
    type_of: "article";
    id: number;
    title: string;
    description: string;
    readable_publish_date: string;
    slug: string;
    path: string;
    url: string;
    comments_count: number;
    public_reactions_count: number;
    collection_id: null;
    published_timestamp: Date;
    language: Language | null;
    subforem_id: null;
    positive_reactions_count: number;
    cover_image: null | string;
    social_image: string;
    canonical_url: string;
    created_at: Date;
    edited_at: Date | null;
    crossposted_at: null;
    published_at: Date;
    last_comment_at: Date;
    reading_time_minutes: number;
    tag_list: string[];
    tags: string;
    user: User;
    organization?: Organization;
    flare_tag?: FlareTag;
}

export interface FlareTag {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
}

export type Language = "es" | "en";

export interface Organization {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
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
    trend?: string
}

export interface FormModalComponentProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export interface FormModalComponentInitialValue {
    name: string;
    description: string;
    isActive: boolean | string;
}

export interface Category extends ErrorMessageComponentProps {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
    blogs: Blog[];
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    description: string;
    location: string;
    start: string;
    webSite: string;
    avatar: string;
    isActive: boolean;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ErrorMessageComponentProps {
    message?: string;
    status?: number;
}

export interface CategoryState {
    categories: Pagination<Category>;
    selected: Category | null
    selectBlog: Blog[] | undefined
}

export type Trend = '↑ aumento' | '↓ disminución' | '→ estable';


export interface Tendencies {
    trend: Trend;
    percentage: number;
    title: string
}

export interface Dashboard {
    totalBlogs: number;
    totalBlogsPublished: number;
    totalBlogsDraft: number;
    totalCategories: number;
    totalCategoriesPublished: number;
    totalCategoriesDraft: number;
    totalUsers: number;
    totalUserAdmin: number;
    totalUserUser: number;
    views: string;
    averageReadings: number;
    averageTime: number;
    featuredBlog: number;
    tendencies: Tendencies;
}

export interface DashboardState {
    dashboard: Dashboard
    auditLog: Pagination<AuditLog>
}

export interface BlogState {
    blogs: Pagination<Blog>;
    page: number;
    category: string | null
    search: string
}

export interface UserState {
    users: Pagination<User>
}

export interface TableComponentProps {
    categories: Category[]
    handlerEdit: (category: Category) => void;
    setShowModalBlog: Dispatch<SetStateAction<boolean>>
}

export interface SearchComponentProps {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
}

export type ActiveFilter = 'all' | 'active' | 'inactive';

export interface SelectComponentProps {
    isActiveFilter: ActiveFilter
    setIsActiveFilter: Dispatch<SetStateAction<ActiveFilter>>
}

export interface PaginateComponentProps {
    categories: Pagination<Category>
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export interface Pagination<T> extends ErrorMessageComponentProps {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
}

export interface Blog extends ErrorMessageComponentProps {
    _id: string;
    title: string;
    content: string;
    description: string;
    image: string;
    published: boolean;
    slug: string;
    tags: string[];
    views: number;
    readingTime: number;
    popular: boolean;
    user: User;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
}


export interface ModalBlogProps {
    blogs: Blog[]
    setShowModalBlog: Dispatch<SetStateAction<boolean>>
}

export interface RevalidateResponse extends ErrorMessageComponentProps {
    token: string;
    user: User;
}

export type SAMESITE = boolean | 'lax' | 'strict' | 'none' | undefined;

export interface NavItem {
    name: string;
    href: string;
    icon: ReactNode;
}


export interface PaginationProps {
    items: Pagination
    setCurrentPage: Dispatch<SetStateAction<number>>
    currentPage: number
    setShowLimitSelector: Dispatch<SetStateAction<boolean>>
    showLimitSelector: boolean
    postsPerPage: number
    setPostsPerPage: Dispatch<SetStateAction<number>>
    selectLimi?: boolean
}


export interface TableBlogComponentProps {
    blog: Blog
}

export type PostStatus = 'all' | 'published' | 'draft' | 'popular';

export interface ButtonFilter {
    selection: PostStatus
    title: string
}

export interface ButtonFilterComponentProps {
    item: ButtonFilter
    activeFilter: PostStatus
    setActiveFilter: Dispatch<SetStateAction<PostStatus>>
}

export interface SearchBlogComponentProps {
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
}

export interface LoadingComponentProps extends ChildrenComponentProps {
    isLoading: boolean
}

export interface BlogFormValues {
    title: string;
    description: string;
    content: string;
    slug: string;
    category: string;
    image: string;
    isPopular: boolean;
    isPublished: boolean;
    tags: string;
    readingTime: number;
}

export interface EditorComponentProps {
    values: FormikValues
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>
}

export interface UploadImageComponentProps {
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>
    values: FormikValues
}

export interface ErrorBlogComponentProps {
    error: string | string[]
}

export interface FormBlogComponentProps {
    blog?: Blog
}

export type RolesValue = 'ADMIN' | 'USER' | 'ALL';

export interface Roles {
    name: string;
    value: RolesValue;
}


export interface RoleUserComponentProps {
    setSelectedRole: Dispatch<SetStateAction<RolesValue>>
    selectedRole: RolesValue
}


export interface TableUserComponentProps {
    isLoading: boolean
    users: User[]
}


export interface RecentActivityProps {
    type: string;
    title: string;
    time: string;
    status: StatusType;
    icon: ReactNode;
    bgColor: string
}

export interface AuditLog {
    _id: string;
    action: string;
    userCreator: User;
    user?: User;
    category?: Category;
    entityType: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    blog?: Blog;
}

export type StatusType = 'Blog Publicado' | 'Usuario activo' | 'Categoría activa' | 'Blog en Borrador' |
    'Usuario no activo' | 'Categoría no activa' | 'Login';

export interface ViewBlogComponentProps {
    isLogin: boolean
    data: Blog | undefined
}

export interface CardBlogPageComponentProps {
    post: Blog
}

export interface CategoriesBlogComponentProps {
    setSelectedCategory: Dispatch<SetStateAction<string | null>>
    selectedCategory: string | null
}

export interface ProjectState {
    project: ProjectWeb
}

export interface SocialState {
    socials: SocialData
}

export interface ProjectWeb {
    status: number;
    statusText: string;
    error: null;
    data: Data;
}

export interface Data {
    pinned: Pinned[];
    readme: string;
    info: Info;
}

export interface Info {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: null;
    email: null;
    hireable: null;
    bio: string;
    twitter_username: string;
    notification_email: null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: Plan;
}

export interface Plan {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
}

export interface Pinned {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
}


export interface SocialData {
    data: DataSocial;
    error: null;
    status: number;
    statusText: string;
}

export interface DataSocial {
    _id: string;
    socials: Social[];
}

export interface Social {
    name: string;
    icon: string;
    url: string;
}

export type IconName = 'youtube' | 'linkedin' | 'github' | 'instagram' | 'x' | 'web'

export interface IconComponentProps {
    icon: IconName;
}


export interface HeroResponse {
    blogs: number;
    readers: number;
}

export interface InitialValuesContact {
    name: string;
    email: string;
    content: string;
}

export interface getBlogSlugProps {
    params: { slug: string }
}

export interface BlogViewPageComponentProps {
    blog: Blog;
}
