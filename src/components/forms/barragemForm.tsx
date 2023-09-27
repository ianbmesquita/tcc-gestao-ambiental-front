import { useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'

interface FormData {
    nome: string;
    status: string;
    tipo: string;
    municipio: string;
    estado: string;
    latitude: string;
    longitude: string;
    risco: string;
}

interface BarragemFormProps {
    handleOnSubmitFunction: (data: FormData) => void;
    barragemFormData: FormData;
}

export function BarragemForm({ handleOnSubmitFunction, barragemFormData }: BarragemFormProps) {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 w-full lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"
    
    console.log("FD: ", barragemFormData)

    const [formData, setFormData] = useState<FormData>(barragemFormData);

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

    return (
        <div>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome:</label>
                    <input className={inputClass} type="text" name="nome" placeholder="Nome completo" 
                        onChange={handleInputChange}
                        value={formData.nome}
                    />
                </div>

                <div>
                    <label htmlFor="login" className="block text-gray-700 font-semibold">Status:</label>
                    <select className={selectBoxClass} name="status" onChange={handleSelectChange}>
                        <option>Selecione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="ATENCAO">Atenção</option>
                        <option value="CRITICO">Crítico</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="role" className="block text-gray-700 font-semibold">Tipo:</label>
                    <select className={selectBoxClass} name="tipo" onChange={handleSelectChange}>
                        <option>Selecione</option>
                        <option value="CONCRETO">Concreto</option>
                        <option value="ENROCAMENTO">Enrocamento</option>
                        <option value="ATERRO">Aterro</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="role" className="block text-gray-700 font-semibold">Risco:</label>
                    <select className={selectBoxClass} name="risco" onChange={handleSelectChange}>
                        <option>Selecione</option>
                        <option value="BAIXO">Baixo</option>
                        <option value="MEDIO">Médio</option>
                        <option value="ALTO">Alto</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="role" className="block text-gray-700 font-semibold">Estado:</label>
                    <select className={selectBoxClass} name="estado" onChange={handleSelectChange}>
                        <option>Selecione</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                        <option value="EX">Estrangeiro</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Município:</label>
                    <input className={inputClass} type="text" name="municipio" placeholder="Município" 
                        onChange={handleInputChange}
                        value={formData.municipio}
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Latitude:</label>
                    <input className={inputClass} type="text" name="latitude" placeholder="Latitude" 
                        onChange={handleInputChange}
                        value={formData.latitude}
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Longitude:</label>
                    <input className={inputClass} type="text" name="longitude" placeholder="Longitude"
                        onChange={handleInputChange}
                        value={formData.longitude}
                    />                    
                </div>

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