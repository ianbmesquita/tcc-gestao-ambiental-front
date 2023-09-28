import { RiFileEditFill } from 'react-icons/ri'
import { BsTrashFill } from 'react-icons/bs'

interface Sensor {
    id: number;
    nome: string;
    tipo: string;
    fabricante: string;
}

interface TableProps {
    headers: string[];
    sensores: Sensor[];
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export function SensoresTable({ headers, sensores, onDelete, onEdit }: TableProps) {
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
                        sensores.map(sensor => (
                            <tr key={ sensor.id }>
                                <td className={tdClass}>{ sensor.id }</td>
                                <td className={tdClass}>{ sensor.nome }</td>
                                <td className={tdClass}>{ sensor.fabricante }</td>
                                <td className={tdClass}>{ sensor.tipo }</td>
                                <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                                    <span aria-label="Editar">
                                        <RiFileEditFill className="text-amber-400 mr-4" size={22} onClick={() => onEdit(sensor.id)} />
                                    </span>
                                    
                                    <span aria-label="Excluir">
                                        <BsTrashFill className="text-red-600 mr-4" size={22} onClick={() => onDelete(sensor.id)} />
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