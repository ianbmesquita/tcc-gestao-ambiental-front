import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

import Layout from '@/components/layout/layout'

import api2 from '@/pages/api/api2'
import styles from '../styles/CadastroUsuarios.module.css'

export default function CadastroUsuario() {
    const inputClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none mb-3 w-full lg:w-11/12"
    const selectBoxClass = "border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mb-3 w-full lg:w-11/12"
    const buttonClass = "bg-emerald-950 transition duration-200 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold w-full lg:w-48"

    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [status, setStatus] = useState('')
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [estado, setEstado] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [risco, setRisco] = useState('')
    
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


    async function handleNewBarragem(event: React.FormEvent) {
        event.preventDefault();

        const token = localStorage.getItem('token')

        const data = {
            nome,
            status,
            tipo,
            municipio,
            estado,
            risco,
            // latitude,
            // longitude
        }

        await api2.post("api/v1/barragens", data, {
            headers:{
                Authorization:  'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Barragem cadastrada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    
                  router.push("/barragens")
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    } 
    
    return (
        <div>
            <Layout>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 mt-14 lg:mt-10 text-center lg:text-left">
                    <span className={styles.text}>Cadastro de Barragem</span> 
                </div>
                <div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3" onSubmit={handleNewBarragem}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Nome:</label>
                            <input className={inputClass} type="text" name="nome" placeholder="Nome completo" onChange={e=>setNome(e.target.value)}/>
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
                                <option value="BAIXO">Baixo</option>
                                <option value="MEDIO">Médio</option>
                                <option value="ALTO">Alto</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold">Estado:</label>
                            <select className={selectBoxClass} name="estado" onChange={e=>setEstado(e.target.value)}>
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
                            <input className={inputClass} type="text" name="municipio" placeholder="Município" onChange={e=>setMunicipio(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Latitude:</label>
                            <input className={inputClass} type="text" name="latitude" placeholder="Latitude" onChange={e=>setLatitude(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Longitude:</label>
                            <input className={inputClass} type="text" name="longitude" placeholder="Longitude" onChange={e=>setLongitude(e.target.value)}/>
                        </div>

                        <div className="md:col-span-2">
                            <button className={buttonClass}>
                                <span className="flex flex-row items-center justify-center">
                                    <AiOutlinePlusCircle className="mr-1" size={20} />
                                    Adicionar
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>  
        </div> 
    )
}