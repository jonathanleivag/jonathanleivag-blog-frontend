import {FC} from "react";
import LoadingComponent from "@/components/shared/loading.component";
import {UserIcon} from "@heroicons/react/24/outline";
import {TableUserComponentProps} from "@/type";

const TableUserComponent:FC<TableUserComponentProps> = ({isLoading, users}) => {
    return  <LoadingComponent isLoading={isLoading}>
        <>
            {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <UserIcon className="h-6 w-6 text-primary-600"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                        {user.role}
                      </span>
                    </td>
                    {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                    {/*    {user.isActive}*/}
                    {/*</td>*/}
                    {/*<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">*/}
                    {/*    <button className="text-primary-600 hover:text-primary-900 mr-3">*/}
                    {/*        <PencilSquareIcon className="h-5 w-5"/>*/}
                    {/*    </button>*/}
                    {/*    <button className="text-red-600 hover:text-red-900">*/}
                    {/*        <TrashIcon className="h-5 w-5"/>*/}
                    {/*    </button>*/}
                    {/*</td>*/}
                </tr>
            ))}
        </>
    </LoadingComponent>
}

export default TableUserComponent;
