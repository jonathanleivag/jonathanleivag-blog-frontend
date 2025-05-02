'use client'
import {FC} from "react";
import {
    ChartBarIcon,
    ClockIcon,
    EyeIcon,
    FireIcon,
    FolderIcon,
    NewspaperIcon,
    StarIcon,
    UsersIcon
} from "@heroicons/react/24/outline";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    bgColor: string;
    textColor: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, bgColor, textColor, trend }) => {
    return (
        <div className={`${bgColor} rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm ${textColor}`}>{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-2 ${trend.isPositive ? 'text-accent-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {trend.value}% vs mes anterior
                        </p>
                    )}
                </div>
                <div className={`${textColor} h-12 w-12`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

interface RecentActivityProps {
    type: string;
    title: string;
    time: string;
    status: 'published' | 'draft' | 'review';
}

const RecentActivity: FC<RecentActivityProps> = ({ type, title, time, status }) => {
    const statusColors = {
        published: 'bg-accent-100 text-accent-700',
        draft: 'bg-gray-100 text-gray-700',
        review: 'bg-primary-100 text-primary-700'
    };

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-primary-50">
                    <NewspaperIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                    <p className="font-medium text-gray-900">{title}</p>
                    <p className="text-sm text-gray-500">{type}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs ${statusColors[status]}`}>
                    {status}
                </span>
                <span className="text-sm text-gray-500">{time}</span>
            </div>
        </div>
    );
};

const DashboardPage: FC = () => {
    const stats = [
        {
            title: "Total Blogs",
            value: 150,
            icon: <NewspaperIcon />,
            bgColor: "bg-primary-50",
            textColor: "text-primary-600",
            trend: { value: 12, isPositive: true }
        },
        {
            title: "Categorías",
            value: 24,
            icon: <FolderIcon />,
            bgColor: "bg-accent-50",
            textColor: "text-accent-600"
        },
        {
            title: "Usuarios",
            value: 1240,
            icon: <UsersIcon />,
            bgColor: "bg-primary-100",
            textColor: "text-primary-700",
            trend: { value: 8, isPositive: true }
        },
        {
            title: "Vistas Totales",
            value: "45.6K",
            icon: <EyeIcon />,
            bgColor: "bg-accent-100",
            textColor: "text-accent-700",
            trend: { value: 15, isPositive: true }
        },
        {
            title: "Promedio Lecturas",
            value: "3.2K",
            icon: <ChartBarIcon />,
            bgColor: "bg-primary-50",
            textColor: "text-primary-600"
        },
        {
            title: "Tiempo Promedio",
            value: "4:30 min",
            icon: <ClockIcon />,
            bgColor: "bg-accent-50",
            textColor: "text-accent-600"
        },
        {
            title: "Blog Destacado",
            value: "4.8 ★",
            icon: <StarIcon />,
            bgColor: "bg-primary-100",
            textColor: "text-primary-700"
        },
        {
            title: "Tendencias",
            value: "React.js",
            icon: <FireIcon />,
            bgColor: "bg-accent-100",
            textColor: "text-accent-700"
        }
    ];

    const recentActivity = [
        {
            type: "Nuevo Blog",
            title: "Introducción a Next.js 13",
            time: "Hace 2h",
            status: 'published' as const
        },
        {
            type: "Actualización",
            title: "Guía de TypeScript",
            time: "Hace 5h",
            status: 'draft' as const
        },
        {
            type: "Nuevo Blog",
            title: "React Server Components",
            time: "Hace 8h",
            status: 'review' as const
        }
    ];

    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleDateString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        {...stat}
                    />
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Ver todo
                    </button>
                </div>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <RecentActivity key={index} {...activity} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
