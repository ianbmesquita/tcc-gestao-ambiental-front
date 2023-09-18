import { RiFileEditFill } from 'react-icons/ri'
import { BsTrashFill } from 'react-icons/bs'

interface User {
    id: string;
    name: string;
    login: string;
    role: string;
    locked: boolean;
}

interface TableProps {
    headers: string[];
    users: User[];
}

export function UsersTable({ headers, users }: TableProps) {
    const tdClass = "px-6 py-3 whitespace-nowrap"
    return (
        <div className="overflow-x-auto mt-8 p-3">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        { 
                            headers.map(header => (
                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        users.map(user => (
                            <tr key={ user.id }>
                                <td className={tdClass}>{ user.name }</td>
                                <td className={tdClass}>{ user.login }</td>
                                <td className={tdClass}>{ user.role }</td>
                                <td className={tdClass}>{ user.locked ? 'Bloqueado' : 'Ativo' }</td>
                                <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                                    <span aria-label="Editar">
                                        <RiFileEditFill className="text-amber-400 mr-4" size={22} />
                                    </span>
                                    <span aria-label="Excluir">
                                        <BsTrashFill className="text-red-600 mr-4" size={22} />
                                    </span>
                                </td>
                            </tr>
                        ))  
                    }
                </tbody>
            </table>
        </div> 
    )
}