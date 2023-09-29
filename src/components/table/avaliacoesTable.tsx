interface Barragem {
    nome: string;
    municipio: string;
    estado: string;
}

interface Avaliacao {
    id: number;
    dataHora: string;
    tipo: string;
    grauRisco: string;
    barragem: Barragem;
}

interface TableProps {
    headers: string[];
    avaliacoes: Avaliacao[];
}

export function AvaliacoesTable({ headers, avaliacoes }: TableProps) {
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
                        avaliacoes.map(avaliacao => (
                            <tr key={ avaliacao.id }>
                                <td className={tdClass}>{ avaliacao.id }</td>
                                <td className={tdClass}>{ avaliacao.dataHora }</td>
                                <td className={tdClass}>{ avaliacao.tipo }</td>
                                <td className={tdClass}>{ avaliacao.grauRisco }</td>
                                <td className={tdClass}>{ avaliacao.barragem.nome }</td>
                                <td className={tdClass}>{ avaliacao.barragem.estado }</td>
                                <td className={tdClass}>{ avaliacao.barragem.municipio }</td>
                            </tr>
                        ))  
                    }
                </tbody>
            </table>
        </div> 
    )
}