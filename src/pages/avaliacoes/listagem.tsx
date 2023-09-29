import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { AvaliacoesTable } from '@/components/table/avaliacoesTable'

export default function ListagemAvaliacoes() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-2 w-full"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()
    
    const tableHeaders = ["Id", "Data/Hora", "Risco", "Grau", "Barragem", "Municipio", "Estado"]

    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [risco, setRisco] = useState('')
    const [grau, setGrau] = useState('')
    const [idBarragem, setIdBarragem] = useState('')
    const [estado, setEstado] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [avaliacoes, setAvaliacoes] = useState([])
    const [mostrarFiltros, setMostrarFiltros] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        fetchAvaliacaoData(token)
    }, []);

    function handleRedirectAddPage() {
        router.push("/avaliacoes/cadastro")
    }

    function handleRedirectEditPage(id: number) {
        router.push({
            pathname: "/avaliacoes/edicao",
            query: { id }
        })
    }

    const fetchAvaliacaoData = async (token: string | null) => {
        api2.get("api/v1/incidentes", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setAvaliacoes(response.data);
        })
        .catch(error => {
            setAvaliacoes([])
        });
    }

    async function handleSearchAvaliacao(event: React.FormEvent) {1
        event.preventDefault();

        const data = {
            dataInicio,
            dataFim,
            risco,
            grau,
            idBarragem,
            estado,
            municipio
        }

        const token = localStorage.getItem('token')

        await api2.get("api/v1/incidentes", {
            params: data,            
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setAvaliacoes(response.data);
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao buscar as avaliações cadastradas',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    }

    const toggleShowFilters = () => {
        setMostrarFiltros(!mostrarFiltros)
    }

    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Avaliações</span> 
                </div>
                <div className="pl-3 cursor-pointer text-emerald-900 underline font-semibold" onClick={toggleShowFilters}> { mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros' }</div>
                
                { mostrarFiltros && (
                    <div>
                        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleSearchAvaliacao}>
                            <div>
                                <label htmlFor="dataInicio" className="block text-gray-700 font-semibold">Data início:</label>
                                <input className={inputClass} type="date" name="dataInicio" placeholder="Data inicial" onChange={e=>setDataInicio(e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="dataFim" className="block text-gray-700 font-semibold">Data fim:</label>
                                <input className={inputClass} type="date" name="dataFim" placeholder="Data final" onChange={e=>setDataFim(e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="risco" className="block text-gray-700 font-semibold">Risco:</label>
                                <select className={selectBoxClass} name="risco" onChange={e=>setRisco(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="SENSOR_DE_PRESSAO">Sensor de Pressão</option>
                                    <option value="SENSOR_DE_DESLIZAMENTO">Sensor de Deslizamento</option>
                                    <option value="SENSOR_DE_NIVEL_DE_AGUA">Sensor de Nível de Água</option>
                                    <option value="OUTRO">Outro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="grau" className="block text-gray-700 font-semibold">Grau:</label>
                                <select className={selectBoxClass} name="grau" onChange={e=>setGrau(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="CONCRETO">Concreto</option>
                                    <option value="ENROCAMENTO">Enrocamento</option>
                                    <option value="ATERRO">Aterro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="barragem" className="block text-gray-700 font-semibold">Barragem:</label>
                                <select className={selectBoxClass} name="barragem" onChange={e=>setIdBarragem(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="CONCRETO">Concreto</option>
                                    <option value="ENROCAMENTO">Enrocamento</option>
                                    <option value="ATERRO">Aterro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="estado" className="block text-gray-700 font-semibold">Estado:</label>
                                <select className={selectBoxClass} name="estado" onChange={e=>setEstado(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="CONCRETO">Concreto</option>
                                    <option value="ENROCAMENTO">Enrocamento</option>
                                    <option value="ATERRO">Aterro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="municipio" className="block text-gray-700 font-semibold">Município:</label>
                                <select className={selectBoxClass} name="municipio" onChange={e=>setMunicipio(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="CONCRETO">Concreto</option>
                                    <option value="ENROCAMENTO">Enrocamento</option>
                                    <option value="ATERRO">Aterro</option>
                                </select>
                            </div>

                            <br />
                            
                            <div className="md:col-span-2">
                                <button className={buttonClass}>
                                    <span className="flex flex-row items-center justify-center">
                                        <BiSearchAlt className="mr-1" size={20} />
                                        Consultar
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                ) }
                
                <AvaliacoesTable 
                    headers={ tableHeaders } 
                    avaliacoes={ avaliacoes } 
                />
                <hr className="mt-3 mb-2" />
                <div className="flex flex-row justify-start p-3">
                    <button className={buttonClass} onClick={handleRedirectAddPage}>
                        <span className="flex flex-row items-center justify-center">
                            <AiOutlinePlusCircle className="mr-1" size={20} />
                            Adicionar
                        </span>
                    </button>
                </div>
            </Layout>
        </div>
    )
}