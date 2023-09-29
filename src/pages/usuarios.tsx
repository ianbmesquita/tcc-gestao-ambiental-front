import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'
import { UsersTable } from '@/components/table/usersTable/usersTable'

import api from '@/pages/api/api'
import styles from '../styles/CadastroUsuarios.module.css'

export default function ListagemUsuarios() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-2 w-full"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()
    
    const tableHeaders = ["Id", "Nome", "Login", "Role", "Status", "Ações"]

    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [role, setRole] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        fetchUserData(token)
    }, []);
    
    async function handleNewUser(event: React.FormEvent) {
        event.preventDefault();

        const data = {
            name,
            login,
            role
        }

        const token = localStorage.getItem('token')

        const response = await api.post("api/v1/users", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        
        if (response.status === 201) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário cadastrado com sucesso',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar usuário',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }

    function handleRedirectAddPage() {
        router.push("/cadastro-usuario")
    }

    const fetchUserData = async (token: string | null) => {
        api.get("api/v1/users", {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            setUsers(response.data);
        });
    }

    const handleDeleteUser = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você realmente deseja excluir este usuário?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
    
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token')
    
                const response = await api.delete(`api/v1/users/${id}`, {
                    headers:{
                        Authorization:  'Bearer ' + token
                    }
                });
        
                if (response.status === 204) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário excluído com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
    
                    fetchUserData(token);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu erro ao excluir usuário',
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
                    <span className={styles.text}>Usuários</span> 
                </div>
                <div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleNewUser}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="name" placeholder="Nome completo" onChange={e=>setName(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="login" className="block text-gray-700 font-semibold">Login:</label>
                            <input className={inputClass} type="text" name="login" placeholder="E-mail" onChange={e=>setLogin(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold">Categoria:</label>
                            <select className={selectBoxClass} name="role" onChange={e=>setRole(e.target.value)}>
                                <option>Selecione</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="USER">Operador</option>
                                <option value="OUTSOURCED">Técnico</option>
                            </select>
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
                <UsersTable headers={ tableHeaders } users={ users } onDelete={ handleDeleteUser } />
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