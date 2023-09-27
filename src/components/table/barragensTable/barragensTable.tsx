import { RiFileEditFill } from 'react-icons/ri'
import { BsTrashFill } from 'react-icons/bs'

interface Barragem {
    id: number;
    nome: string;
    tipo: string;
    municipio: string;
    estado: string;
    risco: string;
    status: string;
    latitude: string;
    longitude: string;
}

interface TableProps {
    headers: string[];
    barragens: Barragem[];
    onDelete: (id: number) => void
}

export function BarragensTable({ headers, barragens, onDelete }: TableProps) {
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
                        barragens.map(barragem => (
                            <tr key={ barragem.id }>
                                <td className={tdClass}>{ barragem.id }</td>
                                <td className={tdClass}>{ barragem.status.toUpperCase() }</td>
                                <td className={tdClass}>{ barragem.nome }</td>
                                <td className={tdClass}>{ barragem.tipo }</td>
                                <td className={tdClass}>{ barragem.municipio }</td>
                                <td className={tdClass}>{ barragem.estado }</td>
                                <td className={tdClass}>{ barragem.risco }</td>
                                <td className={tdClass}>{ barragem.latitude }</td>
                                <td className={tdClass}>{ barragem.longitude }</td>
                                <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                                    <span aria-label="Editar">
                                        <RiFileEditFill className="text-amber-400 mr-4" size={22} />
                                    </span>
                                    
                                    <span aria-label="Excluir">
                                        <BsTrashFill className="text-red-600 mr-4" size={22} onClick={() => onDelete(barragem.id)} />
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