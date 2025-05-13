'use client'
import {FC, useState} from "react";
import ViewBlogComponent from "@/components/shared/viewBlog.component";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import {Blog} from "@/type";
import Image from 'next/image'
import {useBodyClass} from "@/hooks/useBodyClass";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import Link from 'next/link';

const BlogViewPage:FC = () => {
    const isLogin = useIsLoggedIn()
    const [data, setData] = useState<Blog>()
    useBodyClass('bg-white');

    return (
    <section className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-[70%]'>
            <ViewBlogComponent isLogin={isLogin} data={data} setData={setData}/>
        </div>
        <div className='w-full md:w-[30%] flex flex-row justify-center'>
            {data !== undefined && (
                <div className=" w-[90%] bg-white rounded-xl shadow-md  overflow-hidden max-w-sm mx-auto my-5">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ">
                            <Image
                                src={data.user.avatar}
                                alt="Avatar"
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="px-6 py-4 text-center">
                        <h2 className="text-xl font-bold text-gray-900">Jonathan Leiva</h2>
                        <Link
                            href={data.user.webSite}
                            target={'_blank'}
                            className="mt-3 w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition text-center block"
                        >
                            Seguir
                        </Link>
                        <p className="mt-4 text-gray-700 text-sm">
                            {data.user.description}
                        </p>
                        <div className="mt-4 text-left text-sm text-gray-800">
                            <p><span className="font-bold">UBICACIÓN</span><br />{data.user.location}</p>
                            <p className="mt-2"><span className="font-bold">STACK</span><br />{data?.tags.join(',')}</p>
                            <p className="mt-2"><span className="font-bold">INICIÉ</span><br />{format(data.user.start, "d 'de' MMMM yyyy", { locale: es })}</p>
                        </div>
                    </div>
                    <Link
                        href={data.user.webSite}
                        target={'_blank'}
                        className="block hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="bg-gray-50 text-left px-6 py-3 text-sm border-t border-gray-200">
                            Más de <span className="font-semibold text-blue-600">{data.user.name}</span>
                            <div className="mt-1 text-gray-700">{data?.title}</div>
                        </div>
                    </Link>

                </div>
            )}

        </div>
    </section>)
}

export default BlogViewPage;
