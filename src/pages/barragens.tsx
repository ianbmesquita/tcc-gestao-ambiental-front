import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'
import { BarragensTable } from '@/components/table/barragensTable'

import api2 from '@/pages/api/api2'
import styles from '../styles/CadastroUsuarios.module.css'

export default function ListagemBarragens() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-2 w-full"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()
    
    const tableHeaders = ["Id", "Status", "Nome", "Tipo", "Município", "Estado", "Risco", "Latitude", "Longitude", "Ações"]

    const [status, setStatus] = useState('')
    const [name, setName] = useState('')
    const [tipo, setTipo] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [estado, setEstado] = useState('')
    const [risco, setRisco] = useState('')
    const [barragens, setBarragens] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        fetchBarragemData(token)
    }, []);

    function handleRedirectAddPage() {
        router.push("/barragem/cadastro")
    }

    function handleRedirectEditPage(id: number) {
        router.push({
            pathname: "/barragem/edicao",
            query: { id }
        })
    }

    const fetchBarragemData = async (token: string | null) => {
        api2.get("api/v1/barragens", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setBarragens(response.data);
        })
        .catch(error => {
            setBarragens([])
        });
    }

    async function handleSearchBarragem(event: React.FormEvent) {1
        event.preventDefault();

        const data = {
            status,
            name,
            tipo,
            municipio,
            estado,
            risco
        }

        const token = localStorage.getItem('token')

        await api2.post("api/v1/barragens", data, {
            params: {
                status,
                name,
                tipo,
                municipio,
                estado,
                risco
            },            
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setBarragens(response.data);
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao buscar as barragens cadastradas',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    }

    const handleDeleteBarragem = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir esta barragem?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
    
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token')
    
                const response = await api2.delete(`api/v1/barragens/${id}`, {
                    headers:{
                        Authorization:  'Bearer ' + token
                    }
                });
        
                if (response.status === 204) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Barragem excluído com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
    
                    fetchBarragemData(token);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu erro ao excluir a barragem',
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
                    <span className={styles.text}>Barragens</span> 
                </div>
                <div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleSearchBarragem}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="name" placeholder="Nome completo" onChange={e=>setName(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="login" className="block text-gray-700 font-semibold">Status:</label>
                            <select className={selectBoxClass} name="status" onChange={e=>setStatus(e.target.value)}>
                                <option>Selecione</option>
                                <option value="NORMAL">Normal</option>
                                <option value="ATENCAO">Atenção</option>
                                <option value="CRITICO">Crítico</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold">Tipo:</label>
                            <select className={selectBoxClass} name="tipo" onChange={e=>setTipo(e.target.value)}>
                                <option>Selecione</option>
                                <option value="CONCRETO">Concreto</option>
                                <option value="ENROCAMENTO">Enrocamento</option>
                                <option value="ATERRO">Aterro</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold">Risco:</label>
                            <select className={selectBoxClass} name="risco" onChange={e=>setRisco(e.target.value)}>
                                <option>Selecione</option>
                                <option value="BAIXO">Concreto</option>
                                <option value="MEDIO">Enrocamento</option>
                                <option value="ALTO">Aterro</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold">Estado:</label>
                            <select className={selectBoxClass} name="estado" onChange={e=>setEstado(e.target.value)}>
                                <option>Selecione</option>
                                <option value="AM">AM</option>
                                <option value="DF">DF</option>
                                <option value="MG">MG</option>
                                <option value="RJ">RJ</option>
                                <option value="SP">SP</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Município:</label>
                            <input className={inputClass} type="text" name="municipio" placeholder="Município" onChange={e=>setMunicipio(e.target.value)}/>
                        </div>

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
                <BarragensTable 
                    headers={ tableHeaders } 
                    barragens={ barragens } 
                    onDelete={ handleDeleteBarragem }
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