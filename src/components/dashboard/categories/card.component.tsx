import {StatItem} from "@/type";
import {FC, useEffect, useState} from "react";
import {motion} from "framer-motion";

const StatCard: FC<StatItem> = ({ title, value, icon, bgColor, textColor }) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        let start = 0;
        const end = Number(value);
        const duration = 1000;
        const increment = end / (duration / 16);
        const animate = () => {
            start += increment;
            if (start < end) {
                setCount(Math.floor(start));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        animate();
    }, [value]);

    return (
        <div className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105`}>
            <div className="flex justify-between items-center">
                <div>
                    <p className={`text-sm font-medium ${textColor}`}>{title}</p>
                    <motion.p
                        className="text-3xl font-bold text-gray-900 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {count}
                    </motion.p>
                </div>
                <div className={`w-10 h-10 ${textColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
