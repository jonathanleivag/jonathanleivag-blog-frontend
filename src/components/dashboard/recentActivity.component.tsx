import {RecentActivityProps, StatusType} from "@/type";
import {FC} from "react";


const RecentActivity: FC<RecentActivityProps> = ({ type, title, time, status, icon, bgColor } ) => {
    const statusColors: Record<StatusType, string> = {
        'Blog Publicado': 'bg-accent-100 text-accent-700',
        'Usuario activo': 'bg-accent-100 text-accent-700',
        'Categoría activa': 'bg-accent-100 text-accent-700',
        'Blog en Borrador': 'bg-gray-100 text-gray-700',
        'Usuario no activo': 'bg-gray-100 text-gray-700',
        'Categoría no activa': 'bg-gray-100 text-gray-700',
        'Login': 'bg-primary-100 text-primary-700'
    };

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${bgColor}`}>
                    {icon}
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

export default RecentActivity;
