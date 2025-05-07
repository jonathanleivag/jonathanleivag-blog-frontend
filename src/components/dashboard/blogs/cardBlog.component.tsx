import {FC, useEffect, useState} from "react";
import StatCard from "@/components/shared/card.component";
import {EyeIcon, NewspaperIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {BlogState, StatItem} from "@/type";


const CardBlogComponent:FC<BlogState> = ({blogs}) => {
    const [stats, setStats] = useState<StatItem[]>([])

    useEffect(() => {
        setStats([
            {
                title: 'Total Blogs',
                value: blogs.totalDocs,
                icon: <NewspaperIcon className="w-full h-full" />,
                bgColor: 'bg-primary-50',
                textColor: 'text-primary-600',
            },
            {
                title: 'Total Blogs por página',
                value: blogs.docs.length,
                icon: <NewspaperIcon className="w-full h-full" />,
                bgColor: "bg-blue-50",
                textColor: 'text-blue-600',
            },
            {
                title: 'Vistas de Blogs por página',
                value: blogs.docs.reduce((sum, blog) => sum + blog.views, 0),
                icon: <EyeIcon className="w-full h-full" />,
                bgColor: 'bg-accent-100',
                textColor: 'text-accent-700',
            },
            {
                title:"No publicado por pagina",
                value:blogs.docs.filter(post => !post.published).length,
                icon:  <PencilSquareIcon className="w-full h-full" />,
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-600"
            }
        ])
    }, [blogs]);

    return <div className="px-4 -mt-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(item => (
                <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    bgColor={item.bgColor}
                    textColor={item.textColor}
                />
            ))}
        </div>
    </div>
}

export default CardBlogComponent;
