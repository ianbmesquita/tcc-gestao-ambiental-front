import { RiFileEditFill } from 'react-icons/ri'
import { BsTrashFill } from 'react-icons/bs'

interface Habitante {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    barragem_proxima: string;
    endereco: {
        municipio: string;
        estado: string;
    }
}

interface TableProps {
    headers: string[];
    habitantes: Habitante[];
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export function HabitantesTable({ headers, habitantes, onDelete, onEdit }: TableProps) {
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
                        habitantes.map(habitante => (
                            <tr key={ habitante.id }>
                                <td className={tdClass}>{ habitante.id }</td>
                                <td className={tdClass}>{ habitante.nome }</td>
                                <td className={tdClass}>{ habitante.telefone }</td>
                                <td className={tdClass}>{ habitante.email }</td>
                                <td className={tdClass}>{ habitante.barragem_proxima }</td>
                                <td className={tdClass}>{ habitante.endereco.municipio }</td>
                                <td className={tdClass}>{ habitante.endereco.estado }</td>
                                <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                                    <span aria-label="Editar">
                                        <RiFileEditFill className="text-amber-400 mr-4" size={22} onClick={() => onEdit(habitante.id)} />
                                    </span>
                                    
                                    <span aria-label="Excluir">
                                        <BsTrashFill className="text-red-600 mr-4" size={22} onClick={() => onDelete(habitante.id)} />
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