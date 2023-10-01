import api2 from '@/pages/api/api2';
import { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import Swal from 'sweetalert2';

interface Endereco {
    cep: string;
    logradouro: string;
    numero?: string;
    bairro: string;
    municipio: string;
    estado: string;
}

interface FormData {
    nome: string;
    nascimento: string;
    telefone: string;
    email: string;
    idBarragem: string;
    endereco: Endereco;
}

interface Barragem {
    id: number;
    nome: string;
}

interface Estado {
    id: number;
    sigla: string;
    nome: string;
}

interface InfoPage {
    barragens: Barragem[];
    estados: Estado[];
}

interface HabitanteFormProps {
    handleOnSubmitFunction: (data: FormData) => void;
    habitanteFormData: FormData;
}

export function HabitanteForm({ handleOnSubmitFunction, habitanteFormData }: HabitanteFormProps) {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 w-full lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const [formData, setFormData] = useState<FormData>(habitanteFormData);

    const [nome, setNome] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [idBarragem, setIdBarragem] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [estado, setEstado] = useState('')
    
    const [infoPage, setInfoPage] = useState<InfoPage>({
        barragens: [],
        estados: []
    })

    const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCep(value)
        
        if (value.length === 8) {
            console.log(value)
            await api2.get(`api/v1/localidade/cep/${value}`)
            .then(response => {
                if (response.status === 200) {
                    const localidade = response.data
                    
                    setCep(localidade.cep.replace('-', ''))
                    setLogradouro(localidade.logradouro)
                    setBairro(localidade.bairro)
                    setMunicipio(localidade.cidade)
                    setEstado(localidade.uf)
                }
            })
            .catch(error => console.log(error))
        }
    }


    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const habitante : FormData = {
            nome,
            nascimento,
            telefone,
            email,
            idBarragem,
            endereco: {
                cep,
                logradouro,
                numero,
                bairro,
                municipio,
                estado
            }
        }


        handleOnSubmitFunction(habitante)
    };

    async function fetchHabitanteDataPage(token: string | null) {
        await api2.get("api/v1/habitantes/info")
        .then(response => {
            if (response.status === 200) {
                console.log(response.data)
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
        fetchHabitanteDataPage(token)
    }, []);

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="my-4">
                    <span className="text-emerald-800 text-lg font-semibold">Informações pessoais</span>
                    <hr className="border-gray-400 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                    <div>
                        <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome:</label>
                        <input className={inputClass} type="text" name="nome" placeholder="Nome do habitante" 
                            onChange={e=>setNome(e.target.value)}
                            value={nome}    
                        />
                    </div>

                    <div>
                        <label htmlFor="nascimento" className="block text-gray-700 font-semibold">Nascimento:</label>
                        <input className={inputClass} type="date" name="nascimento" placeholder="Data de nascimento" 
                            onChange={e=>setNascimento(e.target.value)}
                            value={nascimento}    
                        />
                    </div>

                    <div>
                        <label htmlFor="telefone" className="block text-gray-700 font-semibold">Telefone:</label>
                        <input className={inputClass} type="text" name="telefone" placeholder="Telefone do habitante" 
                            onChange={e=>setTelefone(e.target.value)}
                            value={telefone}    
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                        <input className={inputClass} type="email" name="email" placeholder="Email do habitante" 
                            onChange={e=>setEmail(e.target.value)}
                            value={email}    
                        />
                    </div>

                    <div>
                        <label htmlFor="barragem" className="block text-gray-700 font-semibold">Barragem próxima:</label>
                        <select className={selectBoxClass} name="barragem" onChange={e=>setIdBarragem(e.target.value)}>
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
                </div>
                
                <div className="my-4">
                    <span className="text-emerald-800 text-lg font-semibold">Informações de endereço</span>
                    <hr className="border-gray-400 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                    <div>
                        <label htmlFor="cep" className="block text-gray-700 font-semibold">CEP:</label>
                        <input className={inputClass} type="text" name="cep" placeholder="CEP do endereço" 
                            onChange={handleCEPChange}
                            value={cep} 
                        />
                    </div>

                    <div>
                        <label htmlFor="logradouro" className="block text-gray-700 font-semibold">Logradouro:</label>
                        <input className={inputClass} type="text" name="logradouro" placeholder="Logradouro do endereço" 
                            onChange={e=>setLogradouro(e.target.value)}
                            value={logradouro} 
                        />
                    </div>

                    <div>
                        <label htmlFor="numero" className="block text-gray-700 font-semibold">Número:</label>
                        <input className={inputClass} type="text" name="numero" placeholder="Número do endereço"
                            onChange={e=>setNumero(e.target.value)}
                            value={numero}
                        />
                    </div>

                    <div>
                        <label htmlFor="complemento" className="block text-gray-700 font-semibold">Complemento:</label>
                        <input className={inputClass} type="text" name="numero" placeholder="Complemento do endereço"
                            onChange={e=>setComplemento(e.target.value)}
                            value={complemento}
                        />
                    </div>

                    <div>
                        <label htmlFor="bairro" className="block text-gray-700 font-semibold">Bairro:</label>
                        <input className={inputClass} type="text" name="bairro" placeholder="Nome do bairro" 
                            onChange={e=>setBairro(e.target.value)}
                            value={bairro} 
                        />
                    </div>

                    <div>
                        <label htmlFor="municipio" className="block text-gray-700 font-semibold">Municipio:</label>
                        <input className={inputClass} type="text" name="municipio" placeholder="Nome do município" 
                            onChange={e=>setMunicipio(e.target.value)}
                            value={municipio} 
                        />
                    </div>

                    <div>
                        <label htmlFor="estado" className="block text-gray-700 font-semibold">Estado:</label>
                        <select className={selectBoxClass} name="estado" onChange={e=>setEstado(e.target.value)}>
                            <option>Selecione</option>
                            { 
                                infoPage.estados.map(estado => {
                                    return (
                                        <option key={estado.sigla} value={estado.sigla}>
                                            {estado.nome}
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
                </div>
            </form>
        </div>
    )
}