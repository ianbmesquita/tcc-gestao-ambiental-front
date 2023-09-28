import api2 from '@/pages/api/api2';
import { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import Swal from 'sweetalert2';

interface FormData {
    nome: string;
    fabricante: string;
    tipo: string;
    idBarragem: string;
}

interface Barragem {
    id: number;
    nome: string;
}

interface TipoSensor {
    valor: string;
    tipo: string;
}

interface InfoPage {
    tiposSensores: TipoSensor[];
    barragens: Barragem[];
}

interface SensorFormProps {
    handleOnSubmitFunction: (data: FormData) => void;
    sensorFormData: FormData;
}

export function SensorForm({ handleOnSubmitFunction, sensorFormData }: SensorFormProps) {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 w-full lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const [formData, setFormData] = useState<FormData>(sensorFormData);
    
    const [infoPage, setInfoPage] = useState<InfoPage>({
        tiposSensores: [],
        barragens: []
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleOnSubmitFunction(formData);
    };

    async function fetchSensorDataPage(token: string | null) {
        await api2.get("api/v1/sensores/info", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setInfoPage(response.data)
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao carregar a tela',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetchSensorDataPage(token)
    }, []);

    return (
        <div>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="nome" placeholder="Nome do sensor" onChange={handleInputChange}/>
                        </div>

                        <div>
                            <label htmlFor="fabricante" className="block text-gray-700 font-semibold">Fabricante:</label>
                            <input className={inputClass} type="text" name="fabricante" placeholder="Fabricante do sensor" onChange={handleInputChange}/>
                        </div>

                        <div>
                            <label htmlFor="tipo" className="block text-gray-700 font-semibold">Tipo:</label>
                            <select className={selectBoxClass} name="tipo" onChange={handleSelectChange}>
                                <option>Selecione</option>
                                { 
                                    infoPage.tiposSensores.map(tipoSensor => {
                                        return (
                                            <option key={tipoSensor.valor} value={tipoSensor.valor}>
                                                {tipoSensor.tipo}
                                            </option>
                                        )
                                    }) 
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="idBarragem" className="block text-gray-700 font-semibold">Barragem:</label>
                            <select className={selectBoxClass} name="idBarragem" onChange={handleSelectChange}>
                                <option>Selecione</option>
                                { 
                                    infoPage.barragens.map(barragem => {
                                        return (
                                            <option key={barragem.id} value={barragem.id}>
                                                {barragem.nome}
                                            </option>
                                        )
                                    }) 
                                }
                            </select>
                        </div>
                        <br />
                        <div className="md:col-span-2">
                            <button className={buttonClass}>
                                <span className="flex flex-row items-center justify-center">
                                    <AiOutlineSave className="mr-1" size={20} />
                                    Salvar
                                </span>
                            </button>
                        </div>
            </form>
        </div>
    )
}