'use client'
import {FC, useEffect, useState} from "react";
import {FunnelIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {Pagination, RolesValue, StatItem, User} from "@/type";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataUser} from "@/lib/redux/features/user/user.slice";
import SearchUserComponent from "@/components/dashboard/user/searchUser.component";
import RoleUserComponent from "@/components/dashboard/user/roleUser.component";
import TableUserComponent from "@/components/dashboard/user/tableUser.component";
import StatCard from "@/components/shared/card.component";
import toast from "react-hot-toast";
import {format} from "date-fns";


const Users: FC = () => {
  const [selectedRole, setSelectedRole] = useState<RolesValue>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stats, setStats] = useState<StatItem[]>([])
  const appDispatch = useAppDispatch()
  const users = useAppSelector(state => state.user.users)


  useEffect(() => {
    if (users.totalDocs > 0) {
      setStats([
        {
          title: "Total Usuarios",
          value: users.totalDocs || 0,
          icon: <UserGroupIcon />,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        }
      ])
    }
  }, [users]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    const dataFetch = async () => {
     try {
       setIsLoading(true)
       const query = new URLSearchParams();
       if (selectedRole === 'ALL') query.delete('role')
       else query.set('role', selectedRole)

       if (searchQuery) query.set('search', searchQuery)

       const response = await fetch(`/api/user?${query.toString()}`, {
         headers:{
           'Content-Type': 'application/json',
         }
       })
       const data: Pagination<User> = await response.json()

       if (data.message === undefined) {
         appDispatch(initialDataUser(data))
       } else {
         toast.error(data.message)
       }

       setIsLoading(false)
     } catch (e) {
       if (e instanceof Error) {
         setIsLoading(false)
         toast.error(e.message)
       }
     }
    }
    void dataFetch()
  }, [appDispatch, searchQuery, selectedRole]);

  return (
    <div className="p-6">
        <div className="px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center my-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <div className="text-sm text-gray-500">
            Última actualización: {format(new Date(), 'dd/MM/yyyy HH:mm')}
          </div>
        {/*<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">*/}
        {/*  Añadir Usuario*/}
        {/*</button>*/}
      </div>

      <div className="mb-6 space-y-4">
        <SearchUserComponent inputValue={inputValue} setInputValue={setInputValue} />
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center text-gray-700">
            <FunnelIcon className="h-5 w-5 mr-2" />
            <span>Filtrar por rol:</span>
          </div>
         <RoleUserComponent selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map(stat => (
            <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {users.totalDocs === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-lg">
          <p className="text-gray-500 text-lg">
            No se encontraron usuarios que coincidan con tu búsqueda
          </p>
        </div>
      )}

      {users.totalDocs > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                  {/*  Último Acceso*/}
                  {/*</th>*/}
                  {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                  {/*  Acciones*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                 <TableUserComponent isLoading={isLoading} users={users.docs} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
