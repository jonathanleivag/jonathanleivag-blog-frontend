'use client'
import {FC, useEffect, useState} from "react";
import StatCard from "@/components/shared/card.component";
import {Dashboard, StatItem} from "@/type";
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
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataDashboard} from "@/lib/redux/features/dashboard/dashboard.slice";

const CardDashboardComponent:FC = ()=> {
    const [stats, setStats] = useState<StatItem[]>([])
    const appDispatch = useAppDispatch()
    const dashboard = useAppSelector(state => state.dashboard.dashboard)

    useEffect(() => {
        setStats([
            {
                title: "Total Blogs",
                value: dashboard.totalBlogs,
                icon: <NewspaperIcon />,
                bgColor: "bg-primary-50",
                textColor: "text-primary-600",
            },
            {
                title: "Categorías",
                value: dashboard.totalCategories,
                icon: <FolderIcon />,
                bgColor: "bg-accent-50",
                textColor: "text-accent-600"
            },
            {
                title: "Usuarios",
                value: dashboard.totalUsers,
                icon: <UsersIcon />,
                bgColor: "bg-primary-100",
                textColor: "text-primary-700",
            },
            {
                title: "Vistas Totales",
                value: dashboard.views,
                icon: <EyeIcon />,
                bgColor: "bg-accent-100",
                textColor: "text-accent-700",
            },
            {
                title: "Promedio Lecturas",
                value: dashboard.averageReadings,
                icon: <ChartBarIcon />,
                bgColor: "bg-primary-50",
                textColor: "text-primary-600"
            },
            {
                title: "Tiempo Promedio",
                value: dashboard.averageTime,
                icon: <ClockIcon />,
                bgColor: "bg-accent-50",
                textColor: "text-accent-600"
            },
            {
                title: "Blog Destacado",
                value: dashboard.featuredBlog,
                icon: <StarIcon />,
                bgColor: "bg-primary-100",
                textColor: "text-primary-700"
            },
            {
                title: "Tendencias",
                value: dashboard.tendencies.title === '' ? 'Sin vistas':`${(dashboard?.tendencies?.title || '').slice(0, 10)}${(dashboard?.tendencies?.title?.length || 0) > 10 ? '...' : ''}`,
                icon: <FireIcon />,
                bgColor: "bg-accent-100",
                textColor: "text-accent-700",
                trend: `%${dashboard.tendencies.percentage.toString()} ${dashboard.tendencies.trend}`
            }
        ])
    }, [dashboard]);

    useEffect(() => {
        const dataFetch = async () => {
            const response = await fetch('/api/dashboard',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data: Dashboard = await response.json()
            appDispatch(initialDataDashboard(data))
        }
        void dataFetch()
    }, [appDispatch]);

    return  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
        ))}
    </div>
}

export default CardDashboardComponent;
