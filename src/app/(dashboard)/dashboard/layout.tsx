'use client'
import {FC, ReactNode, useState} from "react";
import {ChildrenComponentProps} from "@/type";
import {withAuth} from "@/hoc/withAuth";
import Link from "next/link";
import {
    ArrowRightEndOnRectangleIcon,
    FolderIcon,
    HomeIcon,
    NewspaperIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import {usePathname} from "next/navigation";
import {Toaster} from "react-hot-toast";

interface NavItem {
    name: string;
    href: string;
    icon: ReactNode;
}

const DashboardLayout: FC<ChildrenComponentProps> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const pathname = usePathname();


    const navigation: NavItem[] = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <HomeIcon className="w-6 h-6" />
        },
        {
            name: "Categorías",
            href: "/dashboard/categorias",
            icon: <FolderIcon className="w-6 h-6" />
        },
        {
            name: "Blog",
            href: "/dashboard/blog",
            icon: <NewspaperIcon className="w-6 h-6" />
        },
        {
            name: "Usuarios",
            href: "/dashboard/users",
            icon: <UsersIcon className="w-6 h-6" />
        }
    ];

    const isActiveLink = (href: string): boolean => {
        if (href === '/dashboard') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };


    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <div className="min-h-screen bg-gray-50">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <aside className={`
                fixed top-0 left-0 h-screen
                transform transition-transform duration-300 ease-in-out z-50
                w-64 bg-primary-900 text-gray-50 flex flex-col
                md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                    <div className="p-6 flex justify-between items-center border-b border-primary-800">
                        <h1 className="text-xl font-bold">Mi Blog</h1>
                        <button
                            className="md:hidden text-gray-50 hover:text-gray-200"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                        <div className="px-4 py-4 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors  ${isActiveLink(item.href)
                                        ? 'bg-primary-800 text-white font-medium shadow-sm'
                                        : 'text-gray-200 hover:bg-primary-800/70 hover:text-white'
                                    }
`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                <span className={`
                                    ${isActiveLink(item.href)
                                    ? 'text-accent-400'
                                    : 'text-gray-200'
                                }
                                `}
                                >{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <div className="p-4 border-t border-primary-800">
                        <button
                            onClick={() => {/* Aquí tu lógica de cierre de sesión */
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors text-gray-200"
                        >
                            <ArrowRightEndOnRectangleIcon className="w-6 h-6"/>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </aside>
                <main className={`
                transition-all duration-300 ease-in-out
                md:ml-64
            `}>
                    <div className="bg-primary-900 text-white md:hidden">
                        <div className="flex items-center justify-between p-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 hover:bg-primary-800 rounded-lg"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            <span className="text-lg font-semibold">Mi Blog</span>
                        </div>
                    </div>
                    <section className="w-full flex flex-row justify-center items-center">
                        <div className="p-4 w-full md:w-[90%] md:p-8 md:my-10 md:rounded-2xl  md:shadow-lg">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default withAuth(DashboardLayout);
