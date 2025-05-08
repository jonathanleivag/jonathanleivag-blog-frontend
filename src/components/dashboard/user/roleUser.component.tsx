import {FC} from "react";
import {Roles, RoleUserComponentProps} from "@/type";

const RoleUserComponent:FC<RoleUserComponentProps> = ({selectedRole, setSelectedRole}) => {
    const roles :Roles[] = [
        {
            name: 'Todos',
            value: 'ALL'
        },
        {
            name: 'Administrador',
            value: 'ADMIN'
        },
        {
            name: 'Usuarios',
            value: 'USER'
        }
    ]

    return  <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
            <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${selectedRole === role.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </button>
        ))}
    </div>
}

export default RoleUserComponent;
