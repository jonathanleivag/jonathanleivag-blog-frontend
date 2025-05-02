'use client'
import {FC, useEffect, useState} from "react";
import {Category, StatItem} from "@/type";
import StatCard from "@/components/dashboard/categories/card.component";
import ModalComponent from "@/components/shared/modal.component";
import FormModalComponent from "@/components/dashboard/categories/formModal.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataCategory} from "@/lib/redux/features/category/category.slice";
import {EyeIcon, FolderIcon, NewspaperIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";


const CategoryDashboardPage: FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const categories = useAppSelector(state => state.category.categories)
    const [stats, setStats] = useState<StatItem[]>([])

    const appDispatch = useAppDispatch()

    useEffect(() => {
        setStats([
            {
                title: 'Total Blogs',
                value: categories.reduce((acc, category) => acc + category.blogs.length, 0),
                icon: <NewspaperIcon className="w-full h-full" />,
                bgColor: 'bg-primary-50',
                textColor: 'text-primary-600',
            },
            {
                title: 'Categorías',
                value: categories.length,
                icon: <FolderIcon className="w-full h-full" />,
                bgColor: 'bg-accent-50',
                textColor: 'text-accent-600',
            },
            {
                title: 'Vistas de Blogs',
                value: categories.reduce((acc, category) => {
                    return acc + category.blogs.reduce((sum, blog) => sum + blog.views, 0);
                }, 0),
                icon: <EyeIcon className="w-full h-full" />,
                bgColor: 'bg-accent-100',
                textColor: 'text-accent-700',
            }
        ])
    }, [categories]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await fetch('/api/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data: Category[] = await response.json()
                console.log({data})
                appDispatch(initialDataCategory(data))
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                }
            }
        }
        void dataFetch()
    }, [appDispatch]);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard de Categorías</h1>
                <p className="text-gray-500 mt-1">Resumen de estadísticas generales del sistema</p>
            </div>

            <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Categorías</h2>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Nueva Categoría
                    </button>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Posts</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map(category => (
                        <tr key={category._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                          <td className="px-6 py-4 text-sm text-gray-900"> {category.blogs.length} </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex gap-2">
                              <button className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors cursor-pointer">
                                <PencilIcon className="w-4 h-4" />
                                Editar
                              </button>
                              <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer">
                                <TrashIcon className="w-4 h-4" />
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        {showModal && (
                <ModalComponent>
                    <FormModalComponent setShowModal={setShowModal} />
                </ModalComponent>
        )}
        </div>
    );
};

export default CategoryDashboardPage;
