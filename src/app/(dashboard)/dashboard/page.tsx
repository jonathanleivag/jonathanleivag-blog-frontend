'use client'
import {FC} from "react";
import {NewspaperIcon} from "@heroicons/react/24/outline";
import CardDashboardComponent from "@/components/dashboard/card.component";

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
           <CardDashboardComponent />
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
