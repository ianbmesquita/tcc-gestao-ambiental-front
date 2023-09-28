import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'
import { SensoresTable } from '@/components/table/sensoresTable'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'

export default function ListagemSensores() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-2 w-full"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()
    
    const tableHeaders = ["Id", "Nome", "Fabricante", "Tipo", "Ações"]

    const [nome, setNome] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [tipo, setTipo] = useState('')
    const [idBarragem, setIdBarragem] = useState('')
    const [sensores, setSensores] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        fetchSensorData(token)
    }, []);

    function handleRedirectAddPage() {
        router.push("/sensores/cadastro")
    }

    function handleRedirectEditPage(id: number) {
        router.push({
            pathname: "/sensores/edicao",
            query: { id }
        })
    }

    const fetchSensorData = async (token: string | null) => {
        api2.get("api/v1/sensores", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setSensores(response.data);
        })
        .catch(error => {
            setSensores([])
        });
    }

    async function handleSearchSensor(event: React.FormEvent) {1
        event.preventDefault();

        const data = {
            idBarragem,
            nome,
            fabricante,
            tipo
        }

        const token = localStorage.getItem('token')

        await api2.post("api/v1/sensores", data, {
            params: {
                idBarragem,
                nome,
                fabricante,
                tipo
            },            
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setSensores(response.data);
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao buscar os sensores cadastrados',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    }

    const handleDeleteSensor = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir este sensor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
    
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token')
    
                const response = await api2.delete(`api/v1/sensores/${id}`, {
                    headers:{
                        Authorization:  'Bearer ' + token
                    }
                });
        
                if (response.status === 204) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Sensor excluído com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
    
                    fetchSensorData(token);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu erro ao excluir o sensor',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
          }
    }

    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Sensores</span> 
                </div>
                <div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleSearchSensor}>
                        <div>
                            <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="nome" placeholder="Nome do sensor" onChange={e=>setNome(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="fabricante" className="block text-gray-700 font-semibold">Fabricante:</label>
                            <input className={inputClass} type="text" name="fabricante" placeholder="Fabricante do sensor" onChange={e=>setFabricante(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-gray-700 font-semibold">Tipo:</label>
                            <select className={selectBoxClass} name="status" onChange={e=>setTipo(e.target.value)}>
                                <option>Selecione</option>
                                <option value="SENSOR_DE_PRESSAO">Sensor de Pressão</option>
                                <option value="SENSOR_DE_DESLIZAMENTO">Sensor de Deslizamento</option>
                                <option value="SENSOR_DE_NIVEL_DE_AGUA">Sensor de Nível de Água</option>
                                <option value="SENSOR_DE_DEFORMACAO">Sensor de Deformação</option>
                                <option value="SENSOR_DE_TEMPERATURA">Sensor de Temperatura</option>
                                <option value="SENSOR_DE_VIBRACAO">Sensor de Vibração</option>
                                <option value="SENSOR_DE_GEOLOCALIZACAO">Sensor de Geolocalização</option>
                                <option value="SENSOR_DE_GASES">Sensor de Gases</option>
                                <option value="SENSOR_DE_RADAR">Sensor de Radar</option>
                                <option value="OUTRO">Outro</option>
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
                <SensoresTable 
                    headers={ tableHeaders } 
                    sensores={ sensores } 
                    onDelete={ handleDeleteSensor }
                    onEdit={ handleRedirectEditPage } 
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