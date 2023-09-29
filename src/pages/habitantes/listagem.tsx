import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../../styles/CadastroUsuarios.module.css'
import { HabitantesTable } from '@/components/table/habitantesTable'

export default function ListagemHabitantes() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-2 w-full"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()
    
    const tableHeaders = ["Id", "Nome", "Telefone", "Email", "Barragem", "Município", "Estado", "Ações"]

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [idBarragem, setIdBarragem] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [estado, setEstado] = useState('')
    const [habitantes, setHabitantes] = useState([])
    const [mostrarFiltros, setMostrarFiltros] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        fetchHabitanteData(token)
    }, []);

    function handleRedirectAddPage() {
        router.push("/habitantes/cadastro")
    }

    function handleRedirectEditPage(id: number) {
        router.push({
            pathname: "/habitantes/edicao",
            query: { id }
        })
    }

    const fetchHabitanteData = async (token: string | null) => {
        api2.get("api/v1/habitantes", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setHabitantes(response.data);
        })
        .catch(error => {
            setHabitantes([])
        });
    }

    async function handleSearchHabitante(event: React.FormEvent) {1
        event.preventDefault();

        const data = {
            nome,
            telefone,
            email,
            idBarragem,
            municipio,
            estado
        }

        const token = localStorage.getItem('token')

        await api2.post("api/v1/habitantes", data, {            
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setHabitantes(response.data);
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao buscar os habitantes cadastrados',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    }

    const handleDeleteHabitante = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir este habitante?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
    
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token')
    
                const response = await api2.delete(`api/v1/habitantes/${id}`, {
                    headers:{
                        Authorization:  'Bearer ' + token
                    }
                });
        
                if (response.status === 204) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Habitante excluído com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
    
                    fetchHabitanteData(token);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu erro ao excluir o habitante',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
          }
    }

    const toggleShowFilters = () => {
        setMostrarFiltros(!mostrarFiltros)
    }

    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Habitantes</span> 
                </div>
                <div className="pl-3 cursor-pointer text-emerald-900 underline font-semibold" onClick={toggleShowFilters}> { mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros' }</div>
                { mostrarFiltros && (
                    <div>
                        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleSearchHabitante}>
                            <div>
                                <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome:</label>
                                <input className={inputClass} type="text" name="nome" placeholder="Nome do habitante" onChange={e=>setNome(e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="nascimento" className="block text-gray-700 font-semibold">Telefone:</label>
                                <input className={inputClass} type="text" name="telefone" placeholder="Telefone do habitante" onChange={e=>setTelefone(e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                                <input className={inputClass} type="email" name="email" placeholder="Email do habitante" onChange={e=>setEmail(e.target.value)}/>
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
                                <label htmlFor="municipio" className="block text-gray-700 font-semibold">Municipio:</label>
                                <input className={inputClass} type="municipio" name="email" placeholder="Nome do município" onChange={e=>setMunicipio(e.target.value)}/>
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
                )}
                
                <HabitantesTable 
                    headers={ tableHeaders } 
                    habitantes={ habitantes } 
                    onDelete={ handleDeleteHabitante }
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