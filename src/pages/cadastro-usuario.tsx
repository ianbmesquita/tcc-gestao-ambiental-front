import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api from '@/pages/api/api'
import styles from '../styles/CadastroUsuarios.module.css'

export default function CadastroUsuario() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 w-full lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold mt-5 w-full lg:w-1/12 ml-auto"

    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (!token) {
            router.push("/login")
        } else {
            setAuthChecked(true)
        }
    }, []);

    if (!authChecked) {
        return null;
    }


    async function handleNewUser(event: React.FormEvent) {
        event.preventDefault();

        const token = localStorage.getItem('token')

        const data = {
            name,
            login,
            password,
            role
        }

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

              router.push("/usuarios")
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu erro ao cadastrar usuário',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    } 
    
    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Cadastro de Usuário</span> 
                </div>
                <div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3" onSubmit={handleNewUser}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="name" placeholder="Nome completo" onChange={e=>setName(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="login" className="block text-gray-700 font-semibold">Login:</label>
                            <input className={inputClass} type="text" name="login" placeholder="E-mail" onChange={e=>setLogin(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold">Senha:</label>
                            <input className={inputClass} type="password" name="password" placeholder="Senha" onChange={e=>setPassword(e.target.value)}/>
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
                            <button className={buttonClass}>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </Layout>  
        </div> 
    )
}