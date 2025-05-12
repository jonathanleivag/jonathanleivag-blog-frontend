'use client'

import {FC, ReactNode, useEffect, useState} from "react";
import RecentActivity from "@/components/dashboard/recentActivity.component";
import {AuditLog, Pagination, StatusType} from "@/type";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {addAuditLog, initialDataAuditLogs} from "@/lib/redux/features/dashboard/dashboard.slice";
import LoadingComponent from "@/components/shared/loading.component";
import {format} from "date-fns";
import {FolderIcon, NewspaperIcon, UserGroupIcon, UserIcon} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const TableDashboardComponent:FC = () => {
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(5)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false) // nuevo estado para el botón
    const appDispatch = useAppDispatch()
    const auditLog = useAppSelector(state => state.dashboard.auditLog)

    useEffect(() => {
        const dataFetch = async () => {
            try {
                if(page === 1) setLoading(true);
                else setLoadingMore(true);

                const query = new URLSearchParams();
                query.set('page', page.toString())
                query.set('limit', limit.toString())

                const response = await fetch(`/api/dashboard/audit-log?${query.toString()}`,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data: Pagination<AuditLog> = await response.json();

                if (data.message === undefined) {
                    setLoading(false)
                    setLoadingMore(false) // desactivar loading del botón
                    if (page === 1) {
                        appDispatch(initialDataAuditLogs(data))
                    } else {
                        appDispatch(addAuditLog(data))
                    }
                } else {
                    if(page === 1) setLoading(false)
                    setLoadingMore(false)
                    toast.error(data.message)
                    console.error(data.message)
                }
            } catch (e) {
                if (e instanceof Error) {
                    if(page === 1) setLoading(false)
                    setLoadingMore(false) // desactivar loading en caso de error
                    console.error(e.message)
                    toast.error(e.message)
                }
            }
        }
        void dataFetch()
    }, [appDispatch, limit, page]);

    const getStatus = (activity: AuditLog): StatusType => {
        if (activity.blog) {
            return activity.blog.published ? 'Blog Publicado' : 'Blog en Borrador';
        }

        if (activity.category) {
            return activity.category.isActive ? 'Categoría activa' : 'Categoría no activa';
        }

        if (activity.user) {
            if (activity.action.toLowerCase().includes('logged')) {
                return 'Login';
            }
            return activity.user.isActive ? 'Usuario activo' : 'Usuario no activo';
        }

        return 'Blog en Borrador';
    };

    const getIcon = (activity: AuditLog): ReactNode => {
        if (activity.blog) {
            return <NewspaperIcon className="h-5 w-5 bg-primary-50" />
        }

        if (activity.category) {
            return  <FolderIcon className="h-5 w-5 bg-accent-50" />;
        }

        if (activity.user) {
           return <UserIcon className="h-5 w-5 bg-primary-100" />
        }

        return <UserGroupIcon className="h-5 w-5 bg-primary-100" />
    };

    const getBgColor = (activity: AuditLog): string => {
        if (activity.blog) {
            return 'bg-primary-50'
        }

        if (activity.category) {
            return  'bg-accent-50'
        }

        if (activity.user) {
            return 'bg-primary-100'
        }

        return 'bg-primary-100'
    };

    return (
        <div className="space-y-4">
            <LoadingComponent isLoading={loading}>
                {auditLog.docs.map((activity, index) => (
                    <RecentActivity
                        key={index}
                        type={activity.entityType}
                        icon={getIcon(activity)}
                        bgColor={getBgColor(activity)}
                        title={activity.action}
                        time={format(activity.createdAt, 'dd/MM/yyyy HH:mm')}
                        status={getStatus(activity)}
                    />
                ))}
            </LoadingComponent>
            {auditLog.nextPage && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setPage(old => old+1)}
                        disabled={loadingMore}
                        className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            loadingMore ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                        }`}
                    >
                        {loadingMore ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                            </span>
                        ) : (
                            'Ver más'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default TableDashboardComponent;
