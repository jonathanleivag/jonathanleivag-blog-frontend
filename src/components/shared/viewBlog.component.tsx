'use client'
import {FC, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {Blog, ViewBlogComponentProps} from "@/type";
import LoadingScreen from "@/components/dashboard/blogs/view/loadingBlog.component";
import ErrorBlogComponent from "@/components/dashboard/blogs/view/errorBlog.component";
import {
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentIcon,
    PencilSquareIcon,
    TagIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

const ViewBlogComponent:FC<ViewBlogComponentProps> = ({isLogin}) => {
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<Blog>()
    const [error, setError] = useState<string | string[]>('')
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/view/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data: Blog = await response.json()

                if (data.message !== undefined) {
                    setError(data.message)
                }

                setIsLoading(false);
                setData(data)
            } catch (e) {
                if(e instanceof Error) {
                    console.error(e.message)
                    setError(e.message)
                    setIsLoading(false);
                }
            }
        }

        void fetchData()
    }, [slug]);

    if (isLoading) return <LoadingScreen />

    if (error !== '') return <ErrorBlogComponent error={error} />

    return (
        <>
            {data !== undefined && (
                <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                    <div className="space-y-4 mb-8">
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                            <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
                                {data.category.name}
                            </span>
                            {data.published ? (
                                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircleIcon className="h-4 w-4"/>
                                    <span>Publicado</span>
                                </span>
                            ) : (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                                    <DocumentIcon className="h-4 w-4"/>
                                    <span>Borrador</span>
                                </span>
                            )}
                            {data.popular && (
                                <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full flex items-center gap-1">
                                    <span>Destacado</span>
                                    <span className="text-amber-500">⭐</span>
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4"/>
                                {new Date(data.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4"/>
                                {data.readingTime} min de lectura
                            </span>
                            <span className="flex items-center gap-1">
                                <UserIcon className="h-4 w-4"/>
                                {data.user.name}
                            </span>
                            {isLogin && (
                                <button
                                    onClick={() => router.push(`/dashboard/blog/editar/${slug}`)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                                    title="Editar blog"
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                    <span>Editar</span>
                                </button>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900">
                            {data.title}
                        </h1>

                        <p className="text-xl text-gray-600">
                            {data.description}
                        </p>
                    </div>

                    <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
                        <Image
                            src={data.image}
                            alt="Título del Blog"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <div dangerouslySetInnerHTML={{ __html: data.content }} />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <div className="flex items-center gap-2 flex-wrap">
                            <TagIcon className="h-5 w-5 text-gray-600"/>
                            {data.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                            {tag}
                        </span>
                            ))}
                        </div>
                    </div>
                    {/*TODO: Ver el tema de las redes*/}
                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold mb-4">Compartir artículo</h3>
                        <div className="flex gap-4">
                            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 cursor-pointer">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </button>
                            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 cursor-pointer">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </button>
                            <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 cursor-pointer">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            )}

        </>
    );
}

export default ViewBlogComponent;
