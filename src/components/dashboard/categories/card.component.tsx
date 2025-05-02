import {StatItem} from "@/type";
import {FC} from "react";

const StatCard: FC<StatItem> = ({ title, value, icon, bgColor, textColor }) => (
    <div className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
        <div className="flex justify-between items-center">
            <div>
                <p className={`text-sm font-medium ${textColor}`}>{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-10 h-10 ${textColor}`}>
                {icon}
            </div>
        </div>
    </div>
);

export default StatCard;
